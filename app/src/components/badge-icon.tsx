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
            "absolute -top-2 -right-2 min-w-5 h-5 flex items-center justify-center p-1 text-xs",
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
