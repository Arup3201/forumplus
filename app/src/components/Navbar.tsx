import { Icons } from "./icons";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { Button } from "./ui/button";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { Searchbox } from "@/components/search";
import BadgeIcon from "./badge-icon";
import useBreakpoint from "@/hooks/useBreakpoint";

const NAVIGATION_ITEMS = [
  {
    id: "discussions",
    link: "/discussions",
    title: "Discussions",
  },
  {
    id: "tags",
    link: "/tags",
    title: "Tags",
  },
];

export const Navbar = () => {
  const { isDesktop } = useBreakpoint();

  const mobileView = (
    <>
      <Sheet>
        <SheetTrigger>
          <Icons.Menu size={32} />
        </SheetTrigger>
        <SheetContent side="left">
          <NavigationMenu orientation="vertical" className="mx-auto">
            <NavigationMenuList className="flex-col align-baseline">
              {NAVIGATION_ITEMS.map((item) => {
                return (
                  <NavigationMenuLink asChild>
                    <a
                      className="font-medium rounded-md pl-2 pr-2 no-underline outline-hidden select-none focus:shadow-md hover:bg-gray-100"
                      href={item.link}
                    >
                      {item.title}
                    </a>
                  </NavigationMenuLink>
                );
              })}
            </NavigationMenuList>
          </NavigationMenu>
        </SheetContent>
      </Sheet>
      <Icons.Logo size={32} />
      <Tooltip>
        <TooltipTrigger>
          <Switch id="dark-mode" />
        </TooltipTrigger>
        <TooltipContent>Dark Mode</TooltipContent>
      </Tooltip>
      <div className="fixed bottom-0 left-0 z-50 w-full flex justify-between items-center px-6 py-2 bg-gray-100">
        <Button variant="ghost">
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
        <BadgeIcon value="2+" colorClass="bg-indigo-500">
          <Icons.Calendar size={24} />
        </BadgeIcon>
        <BadgeIcon value="4+" colorClass="bg-red-500">
          <Icons.Bell size={24} />
        </BadgeIcon>
        <Button variant="ghost">
          <Icons.User size={24} />
        </Button>
      </div>
    </>
  );

  const desktopView = (
    <>
      <Icons.Logo size={36} />
      <div className="hidden md:flex md:gap-10">
        <NavigationMenu className="gap-2">
          <NavigationMenuList>
            {NAVIGATION_ITEMS.map((item) => {
              return (
                <NavigationMenuLink asChild>
                  <a
                    className="font-medium rounded-md pl-2 pr-2 no-underline outline-hidden select-none focus:shadow-md hover:bg-gray-100"
                    href={item.link}
                  >
                    {item.title}
                  </a>
                </NavigationMenuLink>
              );
            })}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <Searchbox size={24} className="hidden md:flex" />
      <div className="hidden md:flex md:items-center md:gap-4 md:text-gray-800">
        <BadgeIcon value="2+" colorClass="bg-indigo-500">
          <Icons.Calendar size={24} />
        </BadgeIcon>
        <BadgeIcon value="4+" colorClass="bg-red-500">
          <Icons.Bell size={24} />
        </BadgeIcon>
        <Button variant="ghost">
          <Icons.User size={24} />
        </Button>
      </div>
      <div className="flex items-center space-x-2">
        <Label htmlFor="dark-mode" className="text-gray-700 md:hidden">
          Dark Mode
        </Label>
        <Switch id="dark-mode" />
      </div>
    </>
  );

  return (
    <header className="w-full border-b p-2 flex justify-between items-center">
      {isDesktop ? desktopView : mobileView}
    </header>
  );
};
