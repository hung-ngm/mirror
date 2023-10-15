"use client";

import Link from "next/link";
import { MaxWidthWrapper } from "./max-width-wrapper";

const navigation = {
  features: [
    { name: "Blog", href: "#" },
    { name: "Changelog", href: "#" },
    { name: "Customer Stories", href: "#" },
    { name: "Help Center", href: "#" },
    { name: "Pricing", href: "#" },
  ],
  product: [
    { name: "Blog", href: "#" },
    { name: "Changelog", href: "#" },
    { name: "Customer Stories", href: "#" },
    { name: "Help Center", href: "#" },
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
    <footer className="z-10 border-t border-gray-200 py-8 backdrop-blur-lg">
      <MaxWidthWrapper className="pt-10">
        <div className="xl:grid xl:grid-cols-5 xl:gap-8">
          <div className="space-y-8 xl:col-span-2">
            <p className="max-w-xs text-sm text-white">
              Giving modern marketing teams superpowers with short links that
              stand out.
            </p>
            <div className="flex items-center space-x-2">
              <a
                href="https://twitter.com/dubdotco"
                target="_blank"
                rel="noreferrer"
                className="group rounded-md p-2 transition-colors hover:bg-gray-100 active:bg-gray-200"
              >
                <span className="sr-only">Twitter</span>
                <h3 className="text-white">A</h3>
                {/*<Twitter className="h-5 w-5 text-gray-600" />*/}
              </a>
              <div className="h-8 border-l border-gray-200" />
              <a
                href="https://github.com/steven-tey/dub"
                target="_blank"
                rel="noreferrer"
                className="rounded-md p-2 transition-colors hover:bg-gray-100 active:bg-gray-200"
              >
                <span className="sr-only">Github</span>
                <h3 className="text-white">A</h3>
                {/*<Twitter className="h-5 w-5 text-gray-600" />*/}
              </a>
              <div className="h-8 border-l border-gray-200" />
              <a
                href="https://www.linkedin.com/company/dubhq/"
                target="_blank"
                rel="noreferrer"
                className="rounded-md p-2 transition-colors hover:bg-gray-100 active:bg-gray-200"
              >
                <span className="sr-only">LinkedIn</span>
                <h3 className="text-white">A</h3>
                {/*<Twitter className="h-5 w-5 text-gray-600" />*/}
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
                        className="text-sm text-white hover:text-gray-900"
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
                        className="text-sm text-white hover:text-gray-900"
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
                        className="text-sm text-white hover:text-gray-900"
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
        <div className="mt-16 border-t border-gray-900/10 pt-8 sm:mt-20 lg:mt-24">
          <p className="text-sm leading-5 text-white">
            © {new Date().getFullYear()} MirrorScripts
          </p>
        </div>
      </MaxWidthWrapper>
    </footer>
  );
}