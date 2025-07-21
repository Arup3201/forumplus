import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { cn } from "@/lib/utils";
import type { BadgeIconProps } from "@/types/components/badge-icon";

const BadgeIcon = ({
  className = "",
  value = undefined,
  colorClass,
  children,
}: BadgeIconProps) => {
  return (
    <Button variant="ghost" className={cn("relative", className)}>
      {children}
      {value && (
        <Badge
          className={cn(
            "-top-2 -right-2 absolute flex justify-center items-center p-1 min-w-5 h-5 text-xs",
            colorClass
          )}
        >
          {value}
        </Badge>
      )}
    </Button>
  );
};

export default BadgeIcon;
