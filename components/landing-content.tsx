"use client";

import { 
    Card, 
    CardContent, 
    CardHeader, 
    CardTitle
} from "@/components/ui/card";
import { 
    ScrollText, 
    Globe
  } from "lucide-react";
import { cn } from "@/lib/utils";

const testimonials = [
    {
        name: "Hung Nguyen",
        avatar: "H",
        title: "Software Engineer",
        description: "This is the best application I've ever created!"
    },
    {
        name: "Hung Nguyen",
        avatar: "H",
        title: "Software Engineer",
        description: "This is the best application I've ever created!"
    },
    {
        name: "Hung Nguyen",
        avatar: "H",
        title: "Software Engineer",
        description: "This is the best application I've ever created!"
    },
    {
        name: "Hung Nguyen",
        avatar: "H",
        title: "Software Engineer",
        description: "This is the best application I've ever created!"
    }
]

const features = [
    {
        name: "Generate reports with references",
        icon: ScrollText,
        color: "white",
        description: "MirrorScripts can generate research reports automatically with references."
    },
    {
        name: "Up to date data",
        icon: Globe,
        color: "white",
        description: "MirrorScripts uses updated data from the Internet"
    },
]

export const LandingContent = () => {
    return (
        <div className="px-10 pb-20">
            <h2 className="text-center text-5xl text-white font-extrabold mb-10">
                Features
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {features.map((item) => (
                    <Card key={item.description} className="bg-[#192339] border-none text-white">
                        <CardHeader className="items-center">
                            <item.icon className={cn("w-14 h-14", item.color)} />
                            <br/>
                            <CardTitle className="flex items-center justify-center text-center gap-x-2">
                                <div>
                                    <p className="text-3xl">{item.name}</p>
                                </div>
                            </CardTitle>
                            <CardContent className="pt-4 px-0 text-center">
                                {item.description}
                            </CardContent>
                        </CardHeader>
                    </Card>
                ))}
            </div>
            <br/>
            <h2 className="text-center text-4xl text-white font-extrabol mb-10">
                Testimonials
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {testimonials.map((item) => (
                    <Card key={item.description} className="bg-[#192339] border-none text-white">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-x-2">
                                <div>
                                    <p className="text-lg">{item.name}</p>
                                    <p className="text-zinc-400 text-sm">{item.title}</p>
                                </div>
                            </CardTitle>
                            <CardContent className="pt-4 px-0">
                                {item.description}
                            </CardContent>
                        </CardHeader>
                    </Card>
                ))}
            </div>
        </div>
    )
};