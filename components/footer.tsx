"use client";

import Link from "next/link";
import { MaxWidthWrapper } from "./max-width-wrapper";
import { cn } from "@/lib/utils";
import { Montserrat } from "next/font/google";
import Discord from "./discord";

const font = Montserrat({
  weight: "600",
  subsets: ["latin"],
});

const navigation = {
  features: [
    { name: "Generate Report", href: "#features" },
  ],
  product: [
    { name: "FAQ", href: "#" },
    { name: "Pricing", href: "#" },
  ],
  legal: [
    { name: "Privacy", href: "#" },
    { name: "Terms", href: "#" },
    { name: "Abuse", href: "#" },
  ],
};

export function Footer() {

  return (
    <footer className="z-10 py-8 backdrop-blur-lg" style={{ borderTop : '1px solid  gray'}}>
      <MaxWidthWrapper className="pt-10">
        <div className="xl:grid xl:grid-cols-5 xl:gap-8">
          <div className="space-y-8 xl:col-span-2">
            <Link href="/" className="flex items-center">
              <span className="sr-only">MirrorScripts</span>
              <h1 className={cn("text-4xl font-bold text-white", font.className)}>MirrorScripts</h1>
            </Link>
            <p className="max-w-xs text-sm text-white">
              Your one-click AI Researcher Assistant
            </p>
            <div className="flex items-center space-x-2">
              <a
                href="https://discord.gg/UuHQpZcCFw"
                target="_blank"
                rel="noreferrer"
                className="rounded-md p-2 transition-colors hover:bg-gray-600 active:bg-gray-200"
              >
                <span className="sr-only">Discord</span>
                <Discord className="h-5 w-5 text-white" />
              </a>
            </div>
          </div>
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-3 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div></div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold text-white">
                  Features
                </h3>
                <ul role="list" className="mt-4 space-y-4">
                  {navigation.features.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-sm text-white hover:underline"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold text-white">Product</h3>
                <ul role="list" className="mt-4 space-y-4">
                  {navigation.product.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-sm text-white hover:underline"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold text-white">Legal</h3>
                <ul role="list" className="mt-4 space-y-4">
                  {navigation.legal.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-sm text-white hover:underline"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-16 pt-8 sm:mt-20 lg:mt-24" style={{ borderTop : '1px solid gray' }}>
          <p className="text-sm leading-5 text-white">
            © {new Date().getFullYear()} MirrorScripts
          </p>
        </div>
      </MaxWidthWrapper>
    </footer>
  );
}