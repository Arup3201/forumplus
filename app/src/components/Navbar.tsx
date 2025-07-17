import type { SidebarItemType } from "@/types/components/sidebar";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "./ui/button";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";

import { Icons } from "./icons";
import Searchbox from "./search-box";
import OptimizedAvatar from "./optimized-avatar";
import BadgeIcon from "./badge-icon";
import Sidebar from "./sidebar";
import useAuth from "@/hooks/auth";
import useBreakpoint from "@/hooks/breakpoint";

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

export const Navbar = () => {
  const { user } = useAuth();
  const { isDesktop } = useBreakpoint();

  const [selectedMenu, setSelectedMenu] = useState(SIDEBAR_ITEMS[0].id);

  const mobileView = (
    <>
      <Sheet>
        <SheetTrigger>
          <Icons.Menu size={24} />
        </SheetTrigger>
        <SheetContent side="left">
          <Sidebar
            items={SIDEBAR_ITEMS}
            selected={selectedMenu}
            onMenuSelect={(id) => setSelectedMenu(id)}
          />
        </SheetContent>
      </Sheet>
      <Icons.Logo size={32} />
      <Tooltip>
        <TooltipTrigger>
          <Switch id="dark-mode" />
        </TooltipTrigger>
        <TooltipContent>Dark Mode</TooltipContent>
      </Tooltip>
      <div className="fixed bottom-0 left-0 right-0 z-50 w-full flex justify-between items-center px-6 py-2 bg-gray-100">
        <Button variant="ghost" className="ps-0 pe-0 p-0">
          <Icons.Home size={24} />
        </Button>
        <Dialog>
          <DialogTrigger>
            <Icons.Search size={18} />
          </DialogTrigger>
          <DialogContent>
            <Searchbox size={18} />
          </DialogContent>
        </Dialog>
        <Tooltip>
          <TooltipTrigger>
            <Button className="w-12 h-12 rounded-4xl bg-indigo-500">
              <Icons.Plus className="stroke-3" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Start a discussion</TooltipContent>
        </Tooltip>
        <BadgeIcon value="2+" colorClass="bg-indigo-500">
          <Icons.Calendar size={24} />
        </BadgeIcon>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost">
              {user ? (
                <OptimizedAvatar
                  src={user.avatarUrl}
                  alt={user.displayName}
                  fallbackText={user.displayName?.split(" ")[0][0] || "User"}
                  className="w-[24px] h-[24px]"
                />
              ) : (
                <Icons.User size={24} />
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" sideOffset={20}>
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                {user ? (
                  <OptimizedAvatar
                    src={user.avatarUrl}
                    alt={user.displayName}
                    fallbackText={user.displayName?.split(" ")[0][0]}
                    className="w-10 h-10"
                  />
                ) : (
                  <Icons.User size={24} />
                )}
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">
                    {user?.displayName}
                  </span>
                  <span className="text-muted-foreground truncate text-xs">
                    {user?.email}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Icons.UserCircle />
                Account
              </DropdownMenuItem>
              <DropdownMenuItem>
                <BadgeIcon
                  colorClass="bg-red-500"
                  className="has-[>svg]:p-0"
                  value="2"
                >
                  <Icons.Bell />
                </BadgeIcon>
                Notifications
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Icons.Logout />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );

  const desktopView = (
    <>
      <Icons.Logo size={36} />
      <div className="hidden md:flex md:gap-10"></div>
      <Searchbox size={24} className="hidden md:flex" />
      <div className="hidden md:flex md:items-center md:gap-4 md:text-gray-800">
        <BadgeIcon value="2+" colorClass="bg-indigo-500">
          <Icons.Calendar size={24} />
        </BadgeIcon>
        <BadgeIcon value="4+" colorClass="bg-red-500">
          <Icons.Bell size={24} />
        </BadgeIcon>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost">
              {user ? (
                <OptimizedAvatar
                  src={user.avatarUrl}
                  alt={user.displayName}
                  fallbackText={user.displayName?.split(" ")[0][0] || "User"}
                  className="w-[24px] h-[24px]"
                />
              ) : (
                <Icons.User size={24} />
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" sideOffset={20}>
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                {user ? (
                  <OptimizedAvatar
                    src={user.avatarUrl}
                    alt={user.displayName}
                    fallbackText={user.displayName?.split(" ")[0][0]}
                    className="w-10 h-10"
                  />
                ) : (
                  <Icons.User size={24} />
                )}
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">
                    {user?.displayName}
                  </span>
                  <span className="text-muted-foreground truncate text-xs">
                    {user?.email}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Icons.UserCircle />
                Account
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Icons.Logout />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <div className="flex items-center space-x-2">
          <Label htmlFor="dark-mode" className="text-gray-700 md:hidden">
            Dark Mode
          </Label>
          <Switch id="dark-mode" />
        </div>
      </div>
    </>
  );

  return (
    <header className="w-full border-b p-2 flex justify-between items-center">
      {isDesktop ? desktopView : mobileView}
    </header>
  );
};
