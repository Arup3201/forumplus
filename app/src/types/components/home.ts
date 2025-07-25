import type React from "react";

type TabOptionType = {
  id: string;
  name: string;
  title: string;
  description: string;
  Content?: React.ElementType
};

export type { TabOptionType };
