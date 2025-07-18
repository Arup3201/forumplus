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
    <ul className="flex flex-col gap-1 bg-transparent">
      {SIDEBAR_ITEMS.map((item) => {
        const isSelected = selectedMenu === item.id;
        return (
          <li
            key={item.id}
            className={cn(
              "min-w-[200px] flex gap-2 px-4 py-2 items-center rounded-md text-gray-800 hover:bg-gray-300 cursor-pointer",
              isSelected ? "bg-gray-300" : ""
            )}
            onClick={() => setSelectedMenu(item.id)}
          >
            <item.Icon
              size={18}
            />
            <span>{item.name}</span>
          </li>
        );
      })}
    </ul>
  );
};

export default Sidebar;
