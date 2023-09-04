import React from 'react'

import { currentProfile } from '@/lib/current-profile';
import { redirectToSignIn } from '@clerk/nextjs';
import { db } from '@/lib/db';
import { redirect } from 'next/navigation';
import { ServerSidebar } from '@/components/server/SideBar';

const MainLayout = async ({
  children,
  params
}: {
  children: React.ReactNode;
  params: { serverId: string }
}) => {
  const SideBar = await ServerSidebar({ serverId: params.serverId });
  const profile = await currentProfile();

  if(!profile) {
    return redirectToSignIn();
  }

  const server = await db.server.findUnique({
    where: {
        id: params.serverId
    }
  });

  if(!server) {
    return redirect("/");
  }

  return (
    <div className='h-full'>
        <div className='hidden md:flex h-full w-60 z-20 flex-col fixed inset-y-0'>
            {SideBar}
        </div>
        <main className='h-full md:pl-60'>
            {children}
        </main>
    </div>
  )
}

export default MainLayout;
