"use client";

import axios from "axios";
import * as z from "zod";
import { ZodType } from "zod";
import { v4 as uuidv4 } from 'uuid';
import { Heading } from "@/components/heading";
import { Empty } from "@/components/empty";
import { Loader } from "@/components/loader";
import { PenSquare, Upload } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LinkifyText } from "@/components/ui/linkify-text";
import { useState, useEffect, useRef, FC } from "react";
import { 
    Form, 
    FormControl, 
    FormItem,
    FormField 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {Label} from "@/components/ui/label"
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
import remarkGfm from 'remark-gfm'
import { ScrollArea } from "@/components/ui/scroll-area";
import { usePro } from "@/hooks/use-pro";
import { getHostName }  from "@/lib/mirrorscripts";
import { XIcon as Icon } from "lucide-react";

interface MirrorScriptsPageProps {
    title: string;
    description: string;
    formSchema: ZodType<any, any, any>;
    defaultFormValues: Record<string, any>;
    icons: typeof Icon;
}

const MirrorScriptsPage: FC<MirrorScriptsPageProps> = ({ title, description, formSchema, defaultFormValues, icons }) => {
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
    const [fileUID, setFileUID] = useState<string>("default");

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: defaultFormValues,
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

    const handleFileInputChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const files = Array.from(event.target.files);
            setSelectedFiles(files);
            const fileChosen = document.getElementById('file-chosen');
            if (fileChosen) {
                fileChosen.textContent = "Uploading..."
            }
            // Send the selected files
            const formData = new FormData();
            files.forEach(file => {
                formData.append('files', file);
            })
            const protocol = window.location.protocol;
            const file_uid = uuidv4();
            setFileUID(file_uid)
            try {
                const response = await axios.post(`${protocol}//${getHostName()}/upload/${file_uid}`, formData);
                console.log(response);
                const content = files.length === 1 ? '1 file uploaded' : files.length + ' files uploaded';
                if (fileChosen) {
                    fileChosen.textContent = content
                }
            } catch (error) {
                console.log(error);
                if (fileChosen) {
                    fileChosen.textContent = "Upload files"
                } 
            }
        }
    }

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setIsLoading(true);
            setReport('');
            setLogs([]);
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

            let org_res : {
                task: string;
                report_type: string;
                agent: string;
                fileUID: string | null;
            } = JSON.parse(JSON.stringify(values));
            org_res["fileUID"] = fileUID;
            
            send(`start ${JSON.stringify(org_res)}`);

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

    const DELAY = 0; // ms
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
                title={title}
                description={description}
                icon={icons}
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
                                    <FormItem className="col-span-12 lg:col-span-7">
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
                                name=""
                                render={({ field }) => (
                                    <FormItem className="col-span-12 lg:col-span-3">
                                        <FormControl className="m-0 p-0">
                                            <div>
                                                <Input 
                                                    disabled={isLoading} 
                                                    type="file" 
                                                    onChange={handleFileInputChange} 
                                                    id="fileUpload" 
                                                    style={{ display: 'none' }} 
                                                    accept=".pdf" 
                                                    multiple
                                                />
                                                <Label htmlFor="fileUpload" > {/* Add a label that will trigger the file input when clicked */}
                                                    <div aria-disabled={isLoading} className="flex border rounded-md items-center justify-center bg-light hover:bg-secondary/90 h-10 px-4 py-2 aria-disabled:pointer-events-none aria-disabled:opacity-50" style={{ cursor: "pointer"}}>
                                                        <Upload className="justify-center"/>
                                                        <span id="file-chosen" className="flex text-sm font-medium justify-center ml-2"> Upload files</span>
                                                    </div>
                                                </Label>
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
                                    <LinkifyText>{log}</LinkifyText>
                                </div>
                            ))}
                        </ScrollArea>
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
                                        <ReactMarkdown 
                                            remarkPlugins={[remarkGfm]}
                                            components={{
                                                a(props) {
                                                  return <a target="blank" {...props} />
                                                }
                                              }}>
                                                {report}
                                        </ReactMarkdown>
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
                    {isLoading && (
                        <div className="p-20">
                            <Loader />
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
};

export default MirrorScriptsPage;
