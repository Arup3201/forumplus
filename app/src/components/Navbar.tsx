import { BellIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";

export const Navbar = () => {
  return (
      <header className="flex items-center justify-between gap-4 py-2 px-2 bg-white rounded-lg shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-primary rounded flex items-center justify-center">
            <span className="text-white font-bold text-xl">F+</span>
          </div>
          <Input placeholder="Search the forum" className="w-64" />
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon">
            <BellIcon className="w-5 h-5" />
          </Button>
          <Avatar>
            <img
              src="https://github.com/favicon.ico"
              alt="Profile"
              className="rounded-full w-8 h-8"
            />
          </Avatar>
        </div>
      </header>
  );
};
