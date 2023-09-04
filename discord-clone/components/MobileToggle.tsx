import React from 'react'
import { Menu } from 'lucide-react'

import { Sheet, SheetContent, SheetTrigger } from './ui/sheet'
import { Button } from './ui/button'
import { NavigationSidebar } from './navigation/SideBar'
import { ServerSidebar } from './server/SideBar'

const MobileToggle = async ({ serverId }: { serverId: string }) => {
  const navigationSideBar = await NavigationSidebar();
  const serversSidebar = await ServerSidebar({ serverId });
  
  return (
    <Sheet>
        <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className='md:hidden'>
                <Menu />
            </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 flex gap-0">
            <div className='w-[72px]'>
                {navigationSideBar}
            </div>
            {serversSidebar}
        </SheetContent>
    </Sheet>
  )
}

export default MobileToggle