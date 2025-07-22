import type {
  FilterButtonProps,
  FilterBodyProps,
} from "@/types/components/filter.ts";

import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "./ui/label";
import { cn } from "@/lib/utils";
import { Icons } from "./icons";

const FilterButton: React.FC<FilterButtonProps> = ({
  open,
  onFilter = () => {},
}) => {
  return (
    <Button
      className={cn(
        "flex items-center gap-1 bg-white hover:bg-blue-100 border-1 border-blue-800 rounded-md text-blue-800 cursor-pointer",
        open ? "bg-blue-100" : "",
      )}
      onClick={() => onFilter()}
    >
      <Icons.Filter size={12} />
      Filter
    </Button>
  );
};

const FilterBody: React.FC<FilterBodyProps> = ({ show }) => {
  const filterContent = [
    {
      id: "filter",
      title: "Filter By",
      type: "multiple",
      values: [
        {
          id: "no-answers",
          name: "No answers",
          type: "normal",
        },
        {
          id: "not-upvoted",
          name: "Not upvoted or accepted answers",
          type: "normal",
        },
      ],
    },
    {
      id: "sort",
      title: "Sorted By",
      type: "single",
      values: [
        {
          id: "newest",
          name: "Newest",
        },
        {
          id: "recent",
          name: "Recent Activity",
        },
        {
          id: "score",
          name: "Highest Score",
        },
        {
          id: "trending",
          name: "Trending",
        },
        {
          id: "active",
          name: "Most Activity",
        },
      ],
    },
    {
      id: "tag",
      title: "Tagged With",
      type: "single",
      values: [
        {
          id: "following",
          name: "My watched tags",
        },
      ],
    },
  ];

  const form = useForm();

  const onSubmit: SubmitHandler<FieldValues> = (values) => {
    console.log(values);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn(
          "flex-col bg-gray-100 border border-gray-300 rounded-sm transition-all",
          show ? "flex" : "hidden",
        )}
      >
        <div className="flex justify-between items-baseline px-2 py-4 border-b-1 border-b-gray-300">
          {filterContent.map((content) => {
            return (
              <FormField
                control={form.control}
                name={content.id}
                render={() => (
                  <FormItem>
                    <FormLabel className="mb-2 font-bold text-gray-800">
                      {content.title}
                    </FormLabel>
                    <FormControl>
                      <RadioGroup>
                        {content.values.map((option) => {
                          return (
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem
                                value={option.id}
                                id={option.id}
                              />
                              <Label
                                className="font-normal text-gray-700 cursor-pointer"
                                htmlFor={option.id}
                              >
                                {option.name}
                              </Label>
                            </div>
                          );
                        })}
                      </RadioGroup>
                    </FormControl>
                  </FormItem>
                )}
              />
            );
          })}
        </div>
        <div className="flex gap-2 p-2">
          <Button type="submit">Apply Filters</Button>
          <Button variant="secondary">Cancel</Button>
        </div>
      </form>
    </Form>
  );
};

export { FilterButton, FilterBody };
