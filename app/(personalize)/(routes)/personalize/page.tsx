"use client";

import { useState } from "react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Form,
    FormControl,
    FormField,
    FormLabel,
    FormMessage,
    FormItem
} from "@/components/ui/form";
import { 
    schoolFormSchema, 
    workFormSchema,
    functionOptions,
    companySizeOptions,
    roleOptions,
    studentTypeOptions, 
    studyAreaOptions 
} from "./constants";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";

const PersonalizePage = () => {
    const [progress, setProgress] = useState<number>(50);
    const [selection, setSelection] = useState<string>("");
    const [step, setStep] = useState<number>(1);
    const router = useRouter();

    const handleNext = () => {
        setStep(step + 1);
        setProgress(100);
    }

    const handleSelection = (value: string) => {
        setSelection(value);
    }

    const handleSkip = () => {
        router.push("/dashboard");
    }

    const schoolForm = useForm<z.infer<typeof schoolFormSchema>>({
        resolver: zodResolver(schoolFormSchema),
        defaultValues: {
            studentType: "",
            studyArea: "",
            purpose: ""
        }
    })

    const workForm = useForm<z.infer<typeof workFormSchema>>({
        resolver: zodResolver(workFormSchema),
        defaultValues: {
            function: "",
            companySize: "",
            role: "",
            purpose: ""
        }
    })

    const isSchoolLoading = schoolForm.formState.isSubmitting;
    const isWorkLoading = workForm.formState.isSubmitting;

    const onSchoolSubmit = async (values: z.infer<typeof schoolFormSchema>) => {
        try {
            axios.post("api/saveUserSchool", values);
        } catch (error: any) {
            toast.error("Something went wrong");
        } finally {
            router.push("/dashboard");
        }
    }

    const onWorkSubmit = (values: z.infer<typeof workFormSchema>) => {
        try {
            console.log(values);
            axios.post("api/saveUserWork", values);
        } catch (error: any) {
            toast.error("Something went wrong");
        } finally {
            router.push("/dashboard");
        }
    }

    return (
        <div>
            <h1 className="font-bold text-black text-3xl py-4">Personalize your experience</h1>
            <p className="text-gray-500 text-md">Start by telling us about your need</p>
            <div className="py-5">
                <Progress value={progress} className="w-[30%]" />
            </div>
            <div>
                {step === 1 && (
                    <div>
                        <h2 className="font-bold text-black py-2">You use MirrorScripts for</h2>
                        <p className="text-gray-500 text-sm">Make a selection below</p>
                        <div className="py-5 flex">
                            <Button 
                                variant="outline" 
                                className={cn("border-gray-300 rounded-full", selection === "School" && "bg-accent text-accent-foreground")}
                                onClick={() => { handleSelection("School") }}
                            >
                                School
                            </Button>
                            <Button 
                                variant="outline"
                                className={cn("border-gray-300 rounded-full mx-2", selection === "Work" && "bg-accent text-accent-foreground")}
                                onClick={() => { handleSelection("Work") }}
                            >
                                Work
                            </Button>
                        </div>
                        <div className="py-2">
                            <Button onClick={() => { handleNext() }} variant="default" className="w-[10%]">Next</Button>
                            <Button onClick={() => { handleSkip() }}variant="ghost" className="mx-2">Skip Personalization</Button>
                        </div>
                    </div>
                )}

                {step === 2 && selection === "School" && (
                    <div>
                        <h2 className="font-bold text-black py-2">Tell us about your writing at school</h2>
                        <div className="py-5 flex">
                            <Form {...schoolForm}>
                                <form onSubmit={schoolForm.handleSubmit(onSchoolSubmit)} className="w-1/3 space-y-6">
                                    <FormField
                                        control={schoolForm.control}
                                        name="studentType"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>I am a</FormLabel>
                                                <Select disabled={isSchoolLoading} onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select an option" />
                                                    </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {studentTypeOptions.map((studentType) => (
                                                            <SelectItem key={studentType.label} value={studentType.value}>{studentType.value}</SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                                
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={schoolForm.control}
                                        name="studyArea"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>My area of study is</FormLabel>
                                                <Select disabled={isSchoolLoading} onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select an option" />
                                                    </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {studyAreaOptions.map((studyArea) => (
                                                            <SelectItem key={studyArea.label} value={studyArea.value}>{studyArea.value}</SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                                
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={schoolForm.control}
                                        name="purpose"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>You use MirrorScripts to</FormLabel>
                                                <FormControl>
                                                    <Input 
                                                        placeholder="Write your purpose here" {...field} 
                                                        disabled={isSchoolLoading}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <div className="py-2">
                                        <Button type="submit" variant="default" className="w-[10%]">Next</Button>
                                        <Button onClick={() => { handleSkip() }}variant="ghost" className="mx-2">Skip Personalization</Button>
                                    </div>
                                </form>
                            </Form>
                        </div>
                        
                    </div>
                )}

                {step === 2 && selection === "Work" && (
                    <div>
                        <h2 className="font-bold text-black py-2">Tell me about your team</h2>
                        <div className="py-5 flex">
                            <Form {...workForm}>
                                <form onSubmit={workForm.handleSubmit(onWorkSubmit)} className="w-1/2 space-y-6">
                                    <FormField
                                        control={workForm.control}
                                        name="function"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>My primary function is</FormLabel>
                                                <Select disabled={isWorkLoading} onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select an option" />
                                                    </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {functionOptions.map((option) => (
                                                            <SelectItem key={option.label} value={option.value}>{option.value}</SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                                
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={workForm.control}
                                        name="companySize"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>My company size is</FormLabel>
                                                <Select disabled={isWorkLoading} onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select an option" />
                                                    </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {companySizeOptions.map((companySize) => (
                                                            <SelectItem key={companySize.label} value={companySize.value}>{companySize.value}</SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select> 
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={workForm.control}
                                        name="role"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>My role is</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select an option" />
                                                    </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {roleOptions.map((role) => (
                                                            <SelectItem key={role.label} value={role.value}>{role.value}</SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select> 
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={workForm.control}
                                        name="purpose"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>You use MirrorScripts to</FormLabel>
                                                <FormControl>
                                                    <Input disabled={isWorkLoading} placeholder="Write your purpose here" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <div className="py-2">
                                        <Button type="submit" variant="default" className="w-[10%]">Next</Button>
                                        <Button onClick={() => { handleSkip() }}variant="ghost" className="mx-2">Skip Personalization</Button>
                                    </div>
                                </form>
                            </Form>
                            
                            
                        </div>
                        
                    </div>
                )}
                

                
            </div>
        </div>
    )
}

export default PersonalizePage;