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
import { cn } from "@/lib/utils";

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
const VISIBLE_TABS_IN_MOBILE = 2;
const VISIBLE_TABS_IN_DESKTOP = 4;

const Questions = () => {
  const [selectedOption, setSelectedOption] = useState(TAB_OPTIONS[0].id);
  const [openFilter, setOpenFilter] = useState(false);

  const mobileMoreTabs = TAB_OPTIONS.slice(VISIBLE_TABS_IN_MOBILE);
  const desktopMoreTabs = TAB_OPTIONS.slice(VISIBLE_TABS_IN_DESKTOP);

  return (
    <>
      <div className="flex justify-between">
        <h2 className="font-semibold text-gray-800 text-2xl">
          Latest Questions
        </h2>
        <Button
          className="bg-blue-500 hover:bg-blue-600 font-semibold text-white cursor-pointer"
          size="lg"
        >
          Ask Question
        </Button>
      </div>
      <div className="flex justify-end gap-2">
        <Tabs value={selectedOption}>
          <TabsList className="flex items-center gap-1 border border-gray-300">
            {TAB_OPTIONS.map((option, index) => (
              <TabsTrigger
                onClick={() => setSelectedOption(option.id)}
                className={cn(
                  "data-[state=active]:bg-gray-300 hover:bg-gray-100 border data-[state=active]:border-gray-300 hover:border-gray-100 border-transparent text-gray-800 data-[state=active]:text-gray-900 cursor-pointer",
                  // mobile view
                  index >= VISIBLE_TABS_IN_MOBILE ? "hidden md:flex" : "",
                  // desktop view
                  index >= VISIBLE_TABS_IN_DESKTOP ? "md:hidden" : "",
                )}
                value={option.id}
              >
                {option.name}
              </TabsTrigger>
            ))}
            {/* Mobile view - More */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  size="sm"
                  className={cn(
                    "md:hidden bg-transparent hover:bg-gray-100 shadow-none hover:border-gray-100 outline-none text-gray-800 cursor-pointer",
                    mobileMoreTabs.findIndex(
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
                {mobileMoreTabs.map((opt) => (
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

            {/* Desktop view - More */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  size="sm"
                  className={cn(
                    "hidden md:flex bg-transparent hover:bg-gray-100 shadow-none hover:border-gray-100 outline-none text-gray-800 cursor-pointer",
                    desktopMoreTabs.findIndex(
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
                {desktopMoreTabs.map((opt) => (
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
    </>
  );
};

export default Questions;
