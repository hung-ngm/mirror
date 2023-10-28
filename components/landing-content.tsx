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
        name: "ChuckleMaster42",
        avatar: "H",
        title: "Researcher",
        description: "I used to dread writing research reports, but thanks to this website, I now look forward to them as if they were a stand-up comedy show. Who knew data analysis could be this entertaining? I'm thinking of submitting my next report to the Pulitzer Prize for Humor!" 
    },
    {
        name: "Dr. Gigglesworth",
        avatar: "H",
        title: "Researcher",
        description: "I've spent years studying, but I've never had more fun with research than I have on this website. I laughed so hard, my data points almost fell off the scatter plot! This site turned my thesis into a comedy special, and my academic advisor is my new favorite comedian."
    },
    {
        name: "ResearchRioter",
        avatar: "H",
        title: "Researcher",
        description: "Finally, a website that makes writing research reports so enjoyable that I forgot I was supposed to be working! I laughed so much, my coffee came out of my nose and that's some high-quality data visualization right there. 10/10, would procrastinate again." 
    },
    {
        name: "HilarityScientist",
        avatar: "H",
        title: "Scientist",
        description: "I thought my research days were doomed to be a never-ending snooze-fest until I stumbled upon this gem. Not only did it help me create a killer report, but it also made me laugh so hard that even my pet parrot started quoting my research findings. I now conduct experiments just to get the punchlines!"
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
        <div id="features" className="px-10 pb-20">
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