"use client";

import { FileText, Home, LineChart, Newspaper, Users2 } from "lucide-react";

import { SidebarItem } from "./sidebar-item";

const routes = [
  {
    icon: Home,
    label: "Beranda",
    href: "/",
  },
  {
    icon: Users2,
    label: "penduduk",
    href: "/penduduk",
  },
  {
    icon: Newspaper,
    label: "Berita",
    href: "/berita",
  },
  {
    icon: LineChart,
    label: "Statistik",
    href: "/statistik",
  },
  {
    icon: FileText,
    label: "Print Data",
    href: "/print",
  },
];

export const SidebarRoutes = () => {
  return (
    <div className="flex flex-col w-full">
      {routes.map((route) => (
        <SidebarItem
          key={route.href}
          icon={route.icon}
          label={route.label}
          href={route.href}
        />
      ))}
    </div>
  );
};