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
import { FilterButton, FilterBody } from "../components/filter";

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
  const [openFilter, setOpenFilter] = useState(false);

  const numVisibleTabs = isDesktop
    ? VISIBLE_TABS_IN_DESKTOP
    : VISIBLE_TABS_IN_MOBILE;
  const visibleTabOptions = TAB_OPTIONS.slice(0, numVisibleTabs);
  const moreTabOptions = TAB_OPTIONS.slice(numVisibleTabs);

  return (
    <main className="flex justify-between">
      {isDesktop && (
        <div className="block pr-2 border-0 border-gray-100 border-r-2">
          <Sidebar />
        </div>
      )}
      <div className="flex flex-col gap-1 pl-2 w-full">
        <div className="flex justify-end gap-2">
          <Tabs value={selectedOption}>
            <TabsList className="flex items-center gap-1 border border-gray-300">
              {visibleTabOptions.map((option) => (
                <TabsTrigger
                  onClick={() => setSelectedOption(option.id)}
                  className="data-[state=active]:bg-gray-300 hover:bg-gray-100 border data-[state=active]:border-gray-300 hover:border-gray-100 border-transparent text-gray-800 data-[state=active]:text-gray-900 cursor-pointer"
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
                      "bg-transparent hover:bg-gray-100 shadow-none hover:border-gray-100 outline-none text-gray-800 cursor-pointer",
                      moreTabOptions.findIndex(
                        (opt) => opt.id === selectedOption,
                      ) > -1
                        ? "bg-gray-300 border-gray-300"
                        : "",
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
                        "text-gray-800 text-sm",
                        opt.id === selectedOption
                          ? "bg-gray-300 border-gray-300"
                          : "",
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
          <FilterButton
            open={openFilter}
            onFilter={() => setOpenFilter((snapshot) => !snapshot)}
          />
        </div>
        <FilterBody show={openFilter} />
      </div>
    </main>
  );
};
