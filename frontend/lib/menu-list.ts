import { LayoutGrid, LucideIcon, Book } from "lucide-react";

type Submenu = {
  href: string;
  label: string;
  active: boolean;
};

type Menu = {
  href: string;
  label: string;
  active: boolean;
  icon: LucideIcon;
  submenus: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getMenuList(pathname: string): Group[] {
  return [
    {
      groupLabel: "",
      menus: [
        {
          href: "/home/dashboard",
          label: "Dashboard",
          active: pathname.includes("/dashboard"),
          icon: LayoutGrid,
          submenus: [],
        },
        {
          href: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api-docs`,
          label: "API",
          active: pathname.includes("/api"),
          icon: Book,
          submenus: [],
        },
      ],
    },
    // {
    //   groupLabel: "Contents",
    //   menus: [
    //     {
    //       href: "",
    //       label: "Monitor",
    //       active: pathname.includes("/monitor"),
    //       icon: Monitor,
    //       submenus: [
    //         {
    //           href: "/monitor/organizations",
    //           label: "Organizations",
    //           active: pathname.includes("/monitor/organizations")
    //         },
    //         {
    //           href: "/monitor/agents",
    //           label: "Agents",
    //           active: pathname === "/monitor/agents"
    //         },
    //         {
    //           href: "/monitor/users",
    //           label: "Users",
    //           active: pathname === "/monitor/users"
    //         }
    //       ]
    //     },
    //     {
    //       href: "/categories",
    //       label: "Categories",
    //       active: pathname.includes("/categories"),
    //       icon: Bookmark,
    //       submenus: []
    //     },
    //     {
    //       href: "/tags",
    //       label: "Tags",
    //       active: pathname.includes("/tags"),
    //       icon: Tag,
    //       submenus: []
    //     }
    //   ]
    // },
    // {
    //   groupLabel: "Settings",
    //   menus: [
    //     {
    //       href: "/users",
    //       label: "Users",
    //       active: pathname.includes("/users"),
    //       icon: Users,
    //       submenus: []
    //     },
    //     {
    //       href: "/account",
    //       label: "Account",
    //       active: pathname.includes("/account"),
    //       icon: Settings,
    //       submenus: []
    //     }
    //   ]
    // }
  ];
}
