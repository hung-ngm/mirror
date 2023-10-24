"use client";

import axios from "axios";
import * as z from "zod";
import { Heading } from "@/components/heading";
import { Empty } from "@/components/empty";
import { Loader } from "@/components/loader";
import { PenSquare, Upload } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { 
    reportTypeOptions,
    formSchema 
} from "./constants";
import { useState, useEffect, useRef } from "react";
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
import { usePro } from "@/hooks/use-pro";
import { getHostName }  from "@/lib/mirrorscripts";


const MirrorScriptsPage = () => {
    const proModal = useProModal();
    const router = useRouter();
    const [report, setReport] = useState<string>('');
    const [reportChunks, setReportChunks] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { send, close, socketRef } = useWebsocket();
    const [reportLink, setReportLink] = useState<string>('#');
    const [logs, setLogs] = useState<string[]>([]);
    const { isPro, setIsPro } = usePro();
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const endOfLogsRef = useRef<HTMLDivElement | null>(null);
    const endOfReportRef = useRef<HTMLDivElement | null>(null);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            task: "",
            report_type : "research_report",
            agent: "Auto Agent",
        }
    });

    const reportRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const socket = socketRef.current;

        socket.onmessage = async (event: MessageEvent) => {
            const data = JSON.parse(event.data);

            if (data.type == 'logs') {
                setLogs(prevLogs => [...prevLogs, data.output])
                if (data.output.startsWith("\nTotal run time:")) {
                    setIsLoading(false);
                    form.reset();
                }
            } else if (data.type == 'report') {
                setReportChunks((prevReportChunks: string[]) => [...prevReportChunks, data.output])
            } else if (data.type == 'path') {
                console.log("path: ", data);
                setReportLink(data.output);

                // Autosave report
                try {
                    const response = await axios.post("/api/saveReport", {
                        reportUrl: data.output
                    })

                    // Increase the API limit if the report is generated successfully
                    if (!isPro) {
                        await axios.post('/api/increaseApiLimit');
                    }

                } catch (error: any) {
                    console.log(error);
                }  finally {
                    router.refresh();
                }
            }
        }

        return () => {
            close();
        }
    }, [])

    useEffect(() => {
        endOfLogsRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [logs]);
    
    useEffect(() => {
        endOfReportRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [report]);

    const handleFileInputChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const files = Array.from(event.target.files);
            setSelectedFiles(files);
            const fileChosen = document.getElementById('file-chosen');
            const content = files.length + ' files upload'
            if (fileChosen) {
                fileChosen.textContent = content
            }
        }
    }

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setIsLoading(true);
            setReport('');

            // Send the selected files
            const formData = new FormData();
            selectedFiles.forEach(file => {
                formData.append('files', file);
            })
            await axios.post(`http://${getHostName()}/upload`, formData);

            // Check API limit
            const apiLimitResponse = await axios.get('/api/checkApiLimit');
            const freeTrial = apiLimitResponse.data.freeTrial;

            // Check subscription
            
            if (!freeTrial) {
                const subscriptionResponse = await axios.get('/api/checkSubscription');
                const isProResult = subscriptionResponse.data.isPro;
                setIsPro(isProResult);
            }

            // If the user has reached the API limit and does not have a valid subscription, throw an error
            if (!freeTrial && !isPro) {
                throw { response: { status: 403 } };
            }

            
            send(`start ${JSON.stringify(values)}`);

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

    const copyToClipboard = async () => {
        try {
            if (reportRef.current) {
                await navigator.clipboard.writeText(reportRef.current.innerText);
                toast.success("Copied to clipboard");
            }
            
        } catch (error) {
            toast.error("Failed to copy text to clipboard");
        }
    };

    const [currentIndex, setCurrentIndex] = useState(0);

    const DELAY = 700 // ms
    useEffect(() => {
        if (currentIndex >= reportChunks.length) {
            return;
        }
        const interval = setInterval(() => {
            const chunk = reportChunks[currentIndex];
            setReport((prevReport) => prevReport + chunk);
            const nextIndex = currentIndex+1;
            setCurrentIndex(nextIndex);
            if (nextIndex == reportChunks.length) {
                clearInterval(interval);
            }
        }, DELAY);

        return () => clearInterval(interval);
    }, [reportChunks, currentIndex]);

    useEffect(() => {
        if (!isLoading) {
            setSelectedFiles([]);
        }
    }, [isLoading]);

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
                                    <FormItem className="col-span-12 lg:col-span-6">
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
                            <FormField
                                name=""
                                render={({ field }) => (
                                    <FormItem className="col-span-12 lg:col-span-2">
                                        <FormControl className="m-0 p-0">
                                            <div>
                                                <input type="file" onChange={handleFileInputChange} id="fileUpload" style={{ display: 'none' }} accept=".pdf" multiple/>
                                                <label htmlFor="fileUpload" > {/* Add a label that will trigger the file input when clicked */}
                                                    <div className="grid border grid-cols-3 rounded-md items-center justify-center bg-light hover:bg-secondary/90 h-10 px-4 py-2" style={{ cursor: "pointer"}}>
                                                        <Upload className="lg:col-span-1 justify-center color-white"/>
                                                        <span id="file-chosen" className="lg:col-span-2 text-sm font-medium justify-center text-center"> Upload Files</span>
                                                    </div>
                                                </label>
                                            </div>
                                        </FormControl>
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
                    {logs.length > 0 && (
                        <ScrollArea className="overflow-y-scroll scroll-smooth h-[500px] text-lg text-gray-700 p-4 rounded flex items-center justify-center">
                            {logs.map((log, idx) => (
                                <div
                                    key={idx}
                                    className="
                                        rounded-lg
                                        border
                                        p-4
                                        my-4
                                        bg-gray-300
                                    "
                                >
                                    {log}
                                </div>
                            ))}
                            <div ref={endOfLogsRef}></div>
                        </ScrollArea>
                    )}
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
                                    <div className="prose max-w-full p-4" ref={reportRef}>
                                        <ReactMarkdown>{report}</ReactMarkdown>
                                        <div ref={endOfReportRef}></div>
                                    </div>
                                </ScrollArea>
                            </Card>
                            {!isLoading && (
                                <div className="float-right mr-14 mt-4 space-x-2">
                                    <Button variant="premium" onClick={() => copyToClipboard()}>Copy to clipboard</Button>
                                    <a href={reportLink} target="_blank">
                                        <Button variant="premium">Download as PDF</Button>
                                    </a>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
};

export default MirrorScriptsPage;
