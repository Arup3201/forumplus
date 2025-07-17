import type { SidebarProps } from "@/types/components/sidebar.ts";

import { cn } from "@/lib/utils";

const Sidebar = ({ items = [], selected, onMenuSelect }: SidebarProps) => {
  return (
    <ul className="flex flex-col gap-1 bg-white mt-10 pl-2">
      {items.map((item) => {
        const isSelected = selected === item.id;
        return (
          <li
            key={item.id}
            className={cn(
              "min-w-[200px] flex gap-2 px-4 py-2 items-center rounded-md font-normal text-gray-800 hover:text-gray-900 hover:bg-gray-100",
              isSelected ? "text-gray-100 bg-gray-900" : ""
            )}
            onClick={() => onMenuSelect(item.id)}
          >
            <item.Icon
              size={18}
              className={
                isSelected ? "bg-gray-900 text-gray-100" : "text-gray-900"
              }
            />
            <span>{item.name}</span>
          </li>
        );
      })}
    </ul>
  );
};

export default Sidebar;
