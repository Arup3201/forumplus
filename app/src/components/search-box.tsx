import type { SeachboxProps } from "@/types/components/searchbox";
import { Icons } from "./icons";
import { Input } from "./ui/input";
import { cn, generateId } from "@/lib/utils";

const Searchbox = ({
  size,
  placeholder = "Search",
  className = "",
  onChange = () => {},
}: SeachboxProps) => {
  return (
    <div
      className={cn(
        "flex items-center gap-1 px-2 py-0 border-2 border-gray-200 rounded-sm w-full",
        className,
      )}
    >
      <Icons.Search size={size} className="text-gray-400" />
      <Input
        id={generateId("search-input-id-")}
        className="bg-transparent shadow-transparent border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
};

export default Searchbox;
