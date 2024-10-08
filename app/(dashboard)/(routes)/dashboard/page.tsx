"use client";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { 
  ArrowRight, 
  PenSquare,
  FileText,
  Library,
  MenuSquare
} from "lucide-react";
import { useRouter } from "next/navigation";

const tools = [
  {
    label: 'Research Report',
    icon: PenSquare,
    color: "text-pink-800",
    bgColor: "bg-pink-800/10",
    href: '/research',
  },
  {
    label: 'Resources Report',
    icon: Library,
    color: "text-pink-800",
    bgColor: "bg-pink-800/10",
    href: '/resources',
  },
  {
    label: 'Outline Report',
    icon: MenuSquare,
    color: "text-pink-800",
    bgColor: "bg-pink-800/10",
    href: '/outline',
  },
  {
    label: 'Your Reports',
    icon: FileText,
    color: "text-green-800",
    bgColor: "bg-green-800/10",
    href: '/reports',
  },
]

export default function DashboardPage() {
  const router = useRouter();
  return (
    <div>
      <div className="mb-8 space-y-4">
        <h2 className="text-2xl md:text-4xl font-bold text-center">
          Mirror - Explore the power of AI
        </h2>
        <p className="text-muted-foreground font-light text-sm md:text-lg text-center">
          Explore our AI assistants - Experience the power of AI
        </p>
      </div>
      <div className="px-4 md:px-20 lg:px-32 space-y-4">
        {tools.map((tool) => (
          <Card 
            onClick={() => router.push(tool.href)}
            key={tool.href} 
            className="p-4 border-black/5 flex items-center justify-between hover:shadow-md transition cursor-pointer"
          >
            <div className="flex items-center gap-x-4">
              <div className={cn("p-2 w-fit rounded-md", tool.bgColor)}>
                <tool.icon className={cn("w-8 h-8", tool.color)} />
              </div>
              <div className="font-semibold">
                {tool.label}
              </div>
            </div>
            <ArrowRight className="w-5 h-5" />
          </Card>
        ))}
      </div>
    </div>
  )
}