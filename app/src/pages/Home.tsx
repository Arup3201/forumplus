import type { TabOptionType } from "@/types/components/home";

import { useState } from "react";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Tabs, TabsTrigger, TabsList } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useBreakpoint from "@/hooks/breakpoint";
import { cn } from "@/lib/utils";

import Sidebar from "../components/sidebar";

const FilterButton = () => {
  const [openFilters, setOpenFilters] = useState(false);

  return (
    <Button
      className="flex gap-1 items-center border-1 bg-white border-blue-800 text-blue-800 rounded-md hover:bg-blue-100 cursor-pointer"
      onClick={() => setOpenFilters(true)}
    >
      <Icons.Filter size={12} />
      Filter
    </Button>
  );
};

const TAB_OPTIONS: TabOptionType[] = [
  {
    id: "latest",
    name: "Latest",
    title: "Latest Questions",
    description: "Latest posts made on the platform",
  },
  {
    id: "trending",
    name: "Trending",
    title: "Trending Questions",
    description: "Trending questions on the platform till now",
  },
  {
    id: "unanswered",
    name: "Unanswered",
    title: "Unanswered Questions",
    description: "Questions that are not yet answered by anyone",
  },
  {
    id: "upvoted",
    name: "Upvoted",
    title: "Upvoted Questions",
    description: "Questions that you have upvoted",
  },
  {
    id: "scored",
    name: "Scored",
    title: "Highest Scored Questions",
    description: "Questions that has scored highest on the platform",
  },
  {
    id: "week",
    name: "Week",
    title: "Most Active Questions",
    description: "Questions asked since last 1 week",
  },
  {
    id: "month",
    name: "Month",
    title: "Most Active Questions",
    description: "Questions asked since last 1 month",
  },
];
const VISIBLE_TABS_IN_MOBILE = 1;
const VISIBLE_TABS_IN_DESKTOP = 4;

export const Home = () => {
  const { isDesktop } = useBreakpoint();
  const [selectedOption, setSelectedOption] = useState(TAB_OPTIONS[0].id);

  const numVisibleTabs = isDesktop
    ? VISIBLE_TABS_IN_DESKTOP
    : VISIBLE_TABS_IN_MOBILE;
  const visibleTabOptions = TAB_OPTIONS.slice(0, numVisibleTabs);
  const moreTabOptions = TAB_OPTIONS.slice(numVisibleTabs);

  return (
    <main className="flex justify-between">
      {isDesktop && (
        <div className="border-0 pr-2 border-r-2 border-gray-100 block">
          <Sidebar />
        </div>
      )}
      <div className="flex flex-col gap-1 w-full">
        <div className="flex gap-2 justify-end">
          <Tabs value={selectedOption}>
            <TabsList className="flex gap-1 items-center border border-gray-300">
              {visibleTabOptions.map((option) => (
                <TabsTrigger
                  onClick={() => setSelectedOption(option.id)}
                  className="data-[state=active]:bg-gray-300 data-[state=active]:border-gray-300 data-[state=active]:text-gray-900 border border-transparent text-gray-800 hover:border-gray-100 hover:bg-gray-100 cursor-pointer"
                  value={option.id}
                >
                  {option.name}
                </TabsTrigger>
              ))}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    size="sm"
                    className={cn(
                      "bg-transparent text-gray-800 shadow-none outline-none hover:border-gray-100 hover:bg-gray-100 cursor-pointer",
                      moreTabOptions.findIndex(
                        (opt) => opt.id === selectedOption
                      ) > -1
                        ? "bg-gray-300 border-gray-300"
                        : ""
                    )}
                  >
                    More
                    <Icons.Dropdown size={18} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="flex flex-col gap-1">
                  {moreTabOptions.map((opt) => (
                    <DropdownMenuItem
                      className={cn(
                        "text-sm text-gray-800",
                        opt.id === selectedOption
                          ? "bg-gray-300 border-gray-300"
                          : ""
                      )}
                      onClick={() => setSelectedOption(opt.id)}
                    >
                      {opt.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </TabsList>
          </Tabs>
          <FilterButton />
        </div>
      </div>
    </main>
  );
};
