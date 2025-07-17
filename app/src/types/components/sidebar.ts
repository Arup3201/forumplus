import React from "react";

type SidebarItemType = {
  id: string;
  name: string;
  Icon: React.ElementType;
  api: string;
};

interface SidebarProps {
    items: SidebarItemType[], 
    selected: string, 
    onMenuSelect: (id: string) => void
}

export type {SidebarItemType, SidebarProps};
