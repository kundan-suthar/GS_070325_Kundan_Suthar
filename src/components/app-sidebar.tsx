import * as React from "react";
import { ChartColumnBig, Shapes, SquareKanban, Store } from "lucide-react";
import { NavMain } from "@/components/nav-main";
import { Sidebar, SidebarHeader, SidebarRail } from "@/components/ui/sidebar";

// This is sample data.
const data = {
  navMain: [
    {
      title: "Store",
      url: "/",
      icon: Store,
    },
    {
      title: "SKU",
      url: "/sku",
      icon: Shapes,
    },
    {
      title: "Planning",
      url: "/planning",
      icon: ChartColumnBig,
    },
    {
      title: "Charts",
      url: "/charts",
      icon: SquareKanban,
      badge: "10",
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar className="border-r-0" {...props}>
      <SidebarHeader>
        <NavMain items={data.navMain} />
      </SidebarHeader>
      <SidebarRail />
    </Sidebar>
  );
}
