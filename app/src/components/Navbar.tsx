import { useNavigate } from "react-router";

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
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

export const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const MobileNavbar = () => (
    <>
      <Sheet>
        <SheetTrigger className="md:hidden">
          <Icons.Menu size={24} />
        </SheetTrigger>
        <SheetContent side="left" className="pt-10">
          <Sidebar />
        </SheetContent>
      </Sheet>
      <Icons.Logo size={32} className="md:hidden" />
      <Tooltip>
        <TooltipTrigger>
          <Switch id="dark-mode" className="md:hidden" />
        </TooltipTrigger>
        <TooltipContent>Dark Mode</TooltipContent>
      </Tooltip>
      <div className="md:hidden right-0 bottom-0 left-0 z-50 fixed flex justify-between items-center bg-gray-100 px-6 py-2 w-full">
        <Button variant="ghost" className="p-0 ps-0 pe-0">
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
            <Button className="bg-indigo-500 rounded-4xl w-12 h-12">
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
              <div className="flex items-center gap-2 px-1 py-1.5 text-sm text-left">
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
                <div className="flex-1 grid text-sm text-left leading-tight">
                  <span className="font-medium truncate">
                    {user?.displayName}
                  </span>
                  <span className="text-muted-foreground text-xs truncate">
                    {user?.email}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={() => navigate('/profile')}>
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
            <DropdownMenuItem onClick={() => logout()}>
              <Icons.Logout />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );

  const DesktopNavbar = () => (
    <>
      <Icons.Logo size={36} className="hidden md:inline-flex" />
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
            <Button variant="ghost" size="icon">
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
              <div className="flex items-center gap-2 px-1 py-1.5 text-sm text-left">
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
                <div className="flex-1 grid text-sm text-left leading-tight">
                  <span className="font-medium truncate">
                    {user?.displayName}
                  </span>
                  <span className="text-muted-foreground text-xs truncate">
                    {user?.email}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={() => navigate('/profile')}>
                <Icons.UserCircle />
                Account
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => logout()}>
              <Icons.Logout />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <div className="flex items-center space-x-2">
          <Label htmlFor="dark-mode" className="md:hidden text-gray-700">
            Dark Mode
          </Label>
          <Switch id="dark-mode" />
        </div>
      </div>
    </>
  );

  return (
    <header className="flex justify-between items-center gap-3 p-2 border-b w-full">
      <DesktopNavbar />
      <MobileNavbar />
    </header>
  );
};
