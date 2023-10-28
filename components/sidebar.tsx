"use client";

import Link from "next/link";
import Image from "next/image";
import { Montserrat } from 'next/font/google'
import { LayoutDashboard, PenSquare, Settings, FileText, Library, MenuSquare } from "lucide-react";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { FreeCounter } from "@/components/free-counter";

const poppins = Montserrat ({ weight: '600', subsets: ['latin'] });

const routes = [
  {
    label: 'Dashboard',
    icon: LayoutDashboard,
    href: '/dashboard',
    color: "text-sky-500"
  },
  {
    label: 'Research Report',
    icon: PenSquare,
    color: "text-pink-800",
    href: '/research',
  },
  {
    label: 'Resources Report',
    icon: Library,
    color: "text-pink-800",
    href: '/resources',
  },
  {
    label: 'Outline Report',
    icon: MenuSquare,
    color: "text-pink-800",
    href: '/outline',
  },
  {
    label: 'Your Reports',
    icon: FileText,
    color: "text-green-800",
    href: '/reports',
  },
  {
    label: 'Settings',
    icon: Settings,
    href: '/settings',
  },
];



interface SidebarProps {
  apiLimitCount: number;
  isPro: boolean;
}

export const Sidebar = ({
  apiLimitCount = 0,
  isPro = false,
}: SidebarProps) => {
  const pathname = usePathname();

  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-[#111827] text-white">
      <div className="px-3 py-2 flex-1">
        <Link href="/dashboard" className="flex items-center pl-3 mb-14">
          <h1 className={cn("text-2xl font-bold", poppins.className)}>
            MirrorScripts
          </h1>
        </Link>
        <div className="space-y-1">
          {routes.map((route) => (
            <Link
              key={route.href} 
              href={route.href}
              className={cn(
                "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition",
                pathname === route.href ? "text-white bg-white/10" : "text-zinc-400",
              )}
            >
              <div className="flex items-center flex-1">
                <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                {route.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
      <FreeCounter
        isPro={isPro} 
        apiLimitCount={apiLimitCount} 
      />
    </div>
  );
};
