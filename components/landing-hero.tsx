"use client";

import { useAuth } from "@clerk/nextjs";
import Link from "next/link";
import TypewriterComponent from "typewriter-effect";
import { Button } from "@/components/ui/button";

export const LandingHero = () => {
    const isSignedIn = useAuth();

    return (
        <div className="relative w-full flex flex-col gap-24 items-center text-center py-12">
            <div style={{ position: "relative" }} className="top-24 -z-0 flex flex-col gap-2 items-center justify-center pt-24 text-white font-bold py-36 text-center space-y-5">
                <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl space-y-5 font-extrabold">
                    <h1>The best AI tool for</h1>
                    <div className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                        <TypewriterComponent
                            options={{
                                strings: [
                                    "Automatic Research.",
                                    "Report Generation.",
                                    "Save Your Reports.",
                                ],
                                autoStart: true,
                                loop: true,
                            }}
                        />
                    </div>
                </div>
                <div className="text-sm md:text-xl font-light text-zinc-400">
                    Create report using AI 10x faster.
                </div>
                <div>
                    <Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
                        <Button variant="premium" className="md:text-lg p-4 md:p-6 rounded-full font-semibold">
                            Start Generating For Free
                        </Button>
                    </Link>
                </div>
                <div className="text-zinc-400 text-xs md:text-sm font-normal">
                    No credit card required.
                </div>
            </div>
            <iframe style={{ scale:"0.9"}} width="1200" height="650" src="https://www.youtube.com/embed/dH14tZrMuJE?si=easxLJmJmLIxO6RZ" title="YouTube video player" ></iframe>
        </div>
    ) 
}
