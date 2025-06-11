import { useEffect } from "react";
import useFetch from "@/hooks/useFetch";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu } from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";

export const Home = () => {
  const { loading, error, getRequest } = useFetch();

  useEffect(() => {
    getRequest("/api/content");
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
      <main className="flex gap-8">
        {/* Main Content */}
        <section className="flex-1 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <DropdownMenu>
              <Button variant="outline">Latest first</Button>
              {/* Dropdown options would go here */}
            </DropdownMenu>
            <div className="flex items-center gap-2">
              <Checkbox id="mark-all" />
              <label htmlFor="mark-all" className="text-sm">Mark all as read</label>
            </div>
            <Button>Start New Discussion</Button>
          </div>

          {/* Posts List */}
          <div className="flex flex-col gap-4">
            {/* Example post card, repeat for each post */}
            <Card className="p-4 flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <Avatar>
                  <img src="/avatar1.png" alt="User" className="rounded-full w-8 h-8" />
                </Avatar>
                <div className="flex flex-col">
                  <span className="font-semibold">Introduce Yourself!</span>
                  <span className="text-xs text-muted-foreground">Latest reply from @harryson 5 minutes ago</span>
                </div>
                <Badge className="ml-auto" variant="secondary">Introductions</Badge>
              </div>
              <div className="text-sm text-muted-foreground">
                Hey everyone, new member here! Thought I'd write a bit about myself and why I'm here. First off, my name is Harry and I'm 31 years old massive fan of ...
              </div>
              <div className="flex items-center gap-4 text-xs text-muted-foreground mt-2">
                <div className="flex -space-x-2">
                  <Avatar><img src="/avatar1.png" alt="User1" className="rounded-full w-6 h-6" /></Avatar>
                  <Avatar><img src="/avatar2.png" alt="User2" className="rounded-full w-6 h-6" /></Avatar>
                  <Avatar><img src="/avatar3.png" alt="User3" className="rounded-full w-6 h-6" /></Avatar>
                  <Avatar><img src="/avatar4.png" alt="User4" className="rounded-full w-6 h-6" /></Avatar>
                </div>
                <span>25 Comments</span>
              </div>
            </Card>
            {/* Repeat similar Card for other posts, or map over data if available */}
          </div>
        </section>

        {/* Sidebar */}
        <aside className="w-72 flex-shrink-0 hidden lg:block">
          <div className="bg-white rounded-lg shadow-sm p-4 flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <Checkbox id="following" />
              <label htmlFor="following" className="text-sm font-medium">Following</label>
            </div>
            <div className="flex flex-col gap-2 mt-2">
              <Button variant="ghost" className="justify-start">All Discussion</Button>
              <Button variant="ghost" className="justify-start">FAQ's</Button>
              <Button variant="ghost" className="justify-start">Off-Topic Chatter</Button>
              <Button variant="ghost" className="justify-start">Feedback</Button>
              <Button variant="ghost" className="justify-start">Member Spotlight</Button>
              <Button variant="ghost" className="justify-start">Introductions</Button>
              <Button variant="ghost" className="justify-start">Announcements</Button>
              <Button variant="ghost" className="justify-start">Showcase</Button>
              <Button variant="ghost" className="justify-start">Jobs</Button>
            </div>
          </div>
        </aside>
      </main>
  );
}; 