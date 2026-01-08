import {
  IconActivity,
  IconDashboard,
  IconDatabase,
  IconFileWord,

  IconHelp,
  IconInnerShadowTop,
  IconReport,
  IconSettings,
  IconPackage,
  IconTool,
  IconClipboardCheck,
  IconTruckDelivery,
  IconArrowsExchange,
} from "@tabler/icons-react"

import { Link } from "react-router-dom"
import { NavDocuments } from '@/components/nav-documents'
import { NavMain } from '@/components/nav-main'
import { NavSecondary } from '@/components/nav-secondary'
import { NavUser } from '@/components/nav-user'
import { NavProcesses } from '@/components/nav-processes'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'

const data = {
  user: {
    name: "SPP Admin",
    email: "admin@shreepolymer.com",
    avatar: "/avatars/admin.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/",
      icon: IconDashboard,
    },
    {
      title: "Inventory",
      url: "#",
      icon: IconPackage,
    },
    {
      title: "Quality Control",
      url: "#",
      icon: IconClipboardCheck,
    },
    {
      title: "Maintenance",
      url: "#",
      icon: IconTool,
    },
    {
      title: "Reports",
      url: "#",
      icon: IconReport,
    },
  ],
  processes: [
    {
      title: "Preparation",
      url: "#",
      icon: IconPackage,
      isActive: true,
      items: [
        {
          title: "Delivery Challan Receipt",
          url: "/delivery-challan-receipt",
        },
        {
          title: "Compound Inspection",
          url: "/compound-inspection",
        },
        {
          title: "Material Transfer",
          url: "/material-transfer",
        },
        {
          title: "Cut Bit Transfer",
          url: "/cut-bit-transfer",
        },
      ],
    },
    {
      title: "Blanking",
      url: "#",
      icon: IconTool,
      items: [
        {
          title: "Blanking DC Entry",
          url: "/blanking-dc-entry",
        },
        {
          title: "Blank Bin Inward Entry",
          url: "/blank-bin-inward",
        },
        {
          title: "Work Planning",
          url: "/work-planning",
        },
        {
          title: "Blank Bin Issue",
          url: "/blank-bin-issue",
        },
        {
          title: "Inspection Entry",
          url: "/inspection-entry",
        },
      ],
    },
    {
      title: "Moulding",
      url: "#",
      icon: IconClipboardCheck,
      items: [
        {
          title: "Moulding Production Entry",
          url: "/moulding-production",
        },
        {
          title: "Moulding Inspection Entry",
          url: "/moulding-inspection",
        },
      ],
    },
    {
      title: "Deflashing",
      url: "#",
      icon: IconArrowsExchange,
      items: [
        {
          title: "Deflashing Despatch Entry",
          url: "/deflashing-despatch",
        },
        {
          title: "Deflashing Receipt Entry",
          url: "/deflashing-receipt",
        },
        {
          title: "Deflashing Inspection Entry",
          url: "/deflashing-inspection",
        },
        {
          title: "Despatch To U1 Entry",
          url: "/despatch-to-u1",
        },
        {
          title: "Receive Deflashing Entry",
          url: "/receive-deflashing",
        },
      ],
    },
    {
      title: "Finishing & Packing",
      url: "#",
      icon: IconTruckDelivery,
      items: [
        {
          title: "Finishing Process Entry",
          url: "/finishing-process",
        },
        {
          title: "Packing",
          url: "/packing",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "#",
      icon: IconSettings,
    },
    {
      title: "System Status",
      url: "#",
      icon: IconActivity,
    },
    {
      title: "Get Help",
      url: "#",
      icon: IconHelp,
    },
  ],
  documents: [
    {
      name: "Data Library",
      url: "#",
      icon: IconDatabase,
    },
    {
      name: "Reports",
      url: "#",
      icon: IconReport,
    },
    {
      name: "Word Assistant",
      url: "#",
      icon: IconFileWord,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <Link to="/">
                <IconInnerShadowTop className="!size-5" />
                <span className="text-base font-semibold">Shree Polymer Console</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProcesses items={data.processes} />
        <NavDocuments items={data.documents} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
