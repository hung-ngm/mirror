"use client";

import axios from "axios";
import * as z from "zod";
import { Heading } from "@/components/heading";
import { Empty } from "@/components/empty";
import { Loader } from "@/components/loader";
import { PenSquare } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { 
    reportTypeOptions,
    formSchema 
} from "./constants";
import { useState, useEffect } from "react";
import { 
    Form, 
    FormControl, 
    FormItem,
    FormField 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { 
    Select, 
    SelectGroup,
    SelectLabel,
    SelectTrigger, 
    SelectValue,
    SelectContent, 
    SelectItem
} from "@/components/ui/select";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { useProModal } from "@/hooks/use-pro-modal";
import toast from "react-hot-toast";
import useWebsocket from "@/hooks/use-websocket";
import ReactMarkdown from "react-markdown";
import { ScrollArea } from "@/components/ui/scroll-area";

const MirrorScriptsPage = () => {
    const proModal = useProModal();
    const router = useRouter();
    const [report, setReport] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { send, close, socketRef } = useWebsocket();
    
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            task: "",
            report_type : "research_report",
            agent: "Auto Agent",
        }
    });

    useEffect(() => {
        const socket = socketRef.current;

        socket.onmessage = (event: MessageEvent) => {
            const data = JSON.parse(event.data);

            if (data.type == 'logs') {
                console.log("logs: ", data);

                if (data.output.startsWith("\nTotal run time:")) {
                    setIsLoading(false);
                    form.reset();
                  }
            } else if (data.type == 'report') {
                setReport((prevReport: string) => prevReport + data.output);
            } else if (data.type == 'path') {
                console.log("path: ", data);
            }
        }

        return () => {
            close();
        }
    }, [])

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setIsLoading(true);
            setReport('');

            // Check API limit
            const apiLimitResponse = await axios.get('/api/checkApiLimit');
            const freeTrial = apiLimitResponse.data.freeTrial;

            // Check subscription
            let isPro = false;
            if (!freeTrial) {
                const subscriptionResponse = await axios.get('/api/checkSubscription');
                isPro = subscriptionResponse.data.isPro;
            }

            // If the user has reached the API limit and does not have a valid subscription, throw an error
            if (!freeTrial && !isPro) {
                throw { response: { status: 403 } };
            }

            
            send(`start ${JSON.stringify(values)}`);

            // Increase API limit
            if (!isPro) {
                await axios.post('/api/increaseApiLimit');
            }


        } catch (error: any) {
            console.log(error);
            if (error?.response?.status === 403) {
                proModal.onOpen();
            } else {
                toast.error("Something went wrong");
            }
        } finally {
            router.refresh();
        }
    };

    return (
        <div>
            <Heading
                title="MirrorScripts - Your AI Research Assistant"
                description="Surpercharge your research writing."
                icon={PenSquare}
                iconColor="text-pink-800"
                bgColor="bg-pink-800/10"
            />
            <div className="px-4 lg:px-8">
                <div>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="
                                rounded-lg
                                border
                                w-full
                                p-4
                                px-3
                                md:px-6
                                focus-within:shadow-sm
                                grid
                                grid-cols-12
                                gap-2
                            "
                        >
                            <FormField
                                name="task"
                                render={({ field }) => (
                                    <FormItem className="col-span-12 lg:col-span-8">
                                        <FormControl className="m-0 p-0">
                                            <Input
                                                className="
                                                    border-0 
                                                    outline-none
                                                    focus-visible:ring-0 
                                                    focus-visible:ring-transparent
                                                "
                                                disabled={isLoading}
                                                placeholder="Write the detailed report on the state of generative AI Startups"
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="report_type"
                                render={({ field }) => (
                                    <FormItem className="col-span-12 lg:col-span-2">
                                        <Select
                                            disabled={isLoading}
                                            onValueChange={field.onChange}
                                            value={field.value}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue defaultValue={field.value} />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>Report Type</SelectLabel>
                                                    {reportTypeOptions.map((option) => (
                                                        <SelectItem
                                                            key={option.value}
                                                            value={option.value}
                                                        >
                                                            {option.label}
                                                        </SelectItem>
                                                    ))}
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </FormItem>
                                )}
                            />
                            <Button 
                                className="col-span-12 lg:col-span-2 w-full"
                                disabled={isLoading}
                            >
                                Generate
                            </Button>
                        </form>
                    </Form>
                </div>
                <div className="space-y-4 mt-4">
                    {isLoading && (
                        <div className="p-20">
                            <Loader />
                        </div>
                    )}
                    {!report && !isLoading && (
                        <Empty label="No report generated." />
                    )}
                    {report && (
                        <div>
                            <Card className="bg-muted">
                                <CardHeader>
                                    <CardTitle className="text-2xl font-bold">Report generated</CardTitle>
                                </CardHeader>

                                <ScrollArea className="h-[500px] text-lg text-gray-700 p-4 rounded flex items-center justify-center">
                                    <div className="prose max-w-full p-4">
                                        <ReactMarkdown>{report}</ReactMarkdown>
                                    </div>
                                </ScrollArea>
                            </Card>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
};

export default MirrorScriptsPage;
