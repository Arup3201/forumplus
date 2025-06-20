import { BellIcon, SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useState } from "react";
import useAuth from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const navigate = useNavigate();

  const { isAuthenticated } = useAuth();

  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search functionality
    console.log("Searching for:", searchQuery);
  };

  return (
    <header className="flex items-center justify-between gap-4 py-3 px-4 bg-white rounded-lg shadow-sm">
      <div className="flex items-center gap-6">
        <div className="w-10 h-10 bg-primary rounded flex items-center justify-center">
          <span className="text-white font-bold text-xl">F+</span>
        </div>
        
        <nav className="hidden md:flex items-center gap-4">
          <Button variant="ghost">Home</Button>
          <Button variant="ghost">Discussions</Button>
          <Button variant="ghost">Members</Button>
          <Button variant="ghost">About</Button>
        </nav>
      </div>

      <form onSubmit={handleSearch} className="flex-1 max-w-2xl mx-4">
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input 
            placeholder="Search discussions, topics, or members..." 
            className="w-full pl-10 py-2"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </form>

      <div className="flex items-center gap-4">
        {isAuthenticated ? (
          <>
            <Button variant="ghost" size="icon" className="relative">
              <BellIcon className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-destructive text-white text-xs rounded-full flex items-center justify-center">
                2
              </span>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar>
                    <img
                      src="https://github.com/favicon.ico" 
                      alt="Profile"
                      className="rounded-full w-8 h-8"
                    />
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => navigate("/profile")}>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => console.log("Log out")}>Log out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        ) : (
          <div className="flex items-center gap-2">
            <Button variant="ghost" onClick={() => console.log("Log in")}>Log in</Button>
            <Button>Sign up</Button>
          </div>
        )}
      </div>
    </header>
  );
};
