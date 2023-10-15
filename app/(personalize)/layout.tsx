import { Analytics } from '@vercel/analytics/react';
import { PersonalizeNavbar } from '@/components/personalize-navbar';
import { getApiLimitCount } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";
import { Montserrat } from 'next/font/google'

import { cn } from "@/lib/utils";

const poppins = Montserrat ({ weight: '600', subsets: ['latin'] });

const PersonalizeLayout = async ({
  children,
}: {
  children: React.ReactNode
}) => {
  const apiLimitCount = await getApiLimitCount();
  const isPro = await checkSubscription();

  return ( 
    <div className="h-full relative">
      <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0">
        <div className="px-3 py-2 flex-1">
          <h1 className={cn("text-2xl font-bold", poppins.className)}>
            Mirror
          </h1>
        </div>
      </div>
      <main className="md:pl-72 pb-10">
        <PersonalizeNavbar />
        {children}
        <Analytics />
      </main>
    </div>
   );
}
 
export default PersonalizeLayout;