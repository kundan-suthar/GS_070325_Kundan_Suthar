import { AppSidebar } from "@/components/app-sidebar";
import { NavActions } from "@/components/nav-actions";

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Outlet } from "react-router";

const DashboardLayout = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-14 shrink-0 items-center gap-2">
          <div className="flex flex-1 items-center gap-2 px-3">
            {/* below is to handle collapse or expand */}
            <SidebarTrigger />

            {/* <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbPage className="line-clamp-1">
                  Project Management & Task Tracking
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb> */}
            <h1>Data Viewer App</h1>
          </div>
          <div className="ml-auto px-3">
            <NavActions />
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 px-4 py-10">
          {/* <div className="mx-auto h-24 w-full max-w-5xl rounded-xl bg-muted/50" /> */}
          {/* <div className="mx-auto h-full w-full max-w-5xl rounded-xl bg-muted/50" /> */}

          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default DashboardLayout;
