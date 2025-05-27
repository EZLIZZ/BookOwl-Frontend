import { SidebarProvider } from "@/components/ui/sidebar";
import SideBarAdmin from "./_components/SideBarAdmin";

export default function layout({children}){
    return(
        <div>
            <SidebarProvider >
            <SideBarAdmin />
            {children}
            </SidebarProvider>
        

        </div>
    )
}