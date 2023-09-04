import { currentProfile } from "@/lib/current-profile";
import { redirect } from "next/dist/server/api-utils";

export const NavigationSidebar = async() => {

    const profile = await currentProfile();

    if(!profile)return redirect

    return ( 
        <div>
            navigation sidebar
        </div>
     );
}