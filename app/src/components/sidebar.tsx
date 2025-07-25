import type { SidebarItemType } from "@/types/components/sidebar.ts";

import { useState } from "react";
import { cn } from "@/lib/utils";

import { Icons } from "./icons";

const SIDEBAR_ITEMS: SidebarItemType[] = [
  {
    id: "questions",
    name: "Questions",
    Icon: Icons.Question,
    api: "",
  },
  {
    id: "tags",
    name: "Tags",
    Icon: Icons.Tag,
    api: "",
  },
  {
    id: "activities",
    name: "My Activities",
    Icon: Icons.Acitvity,
    api: "",
  },
  {
    id: "bookmarks",
    name: "Bookmarks",
    Icon: Icons.Bookmark,
    api: "",
  },
  {
    id: "drafts",
    name: "Drafts",
    Icon: Icons.Draft,
    api: "",
  },
];

const Sidebar = () => {
  const [selectedMenu, setSelectedMenu] = useState(SIDEBAR_ITEMS[0].id);

  return (
    <div className="hidden md:block px-2 py-4 border-0 border-gray-100 border-r-2">
      <ul className="flex flex-col gap-1 bg-transparent">
        {SIDEBAR_ITEMS.map((item) => {
          const isSelected = selectedMenu === item.id;
          return (
            <li
              key={item.id}
              className={cn(
                "flex items-center gap-2 hover:bg-gray-300 px-4 py-2 rounded-md min-w-[200px] text-gray-800 cursor-pointer",
                isSelected ? "bg-gray-300" : "",
              )}
              onClick={() => setSelectedMenu(item.id)}
            >
              <item.Icon size={18} />
              <span>{item.name}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Sidebar;
