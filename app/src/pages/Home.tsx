import { useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import useFetch from "@/hooks/fetch";
import { Icons } from "@/components/icons";

export const Home = () => {
  const { loading, error, getRequest } = useFetch();

  useEffect(() => {
    getRequest(
      "/api/threads/",
      (data) => {
        console.log(data);
      },
      (error) => {
        console.error(error);
      }
    );
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const filterClass = "flex gap-1 items-center text-sm bg-gray-100 border-1 border-gray-800 rounded-lg px-4 py-1"

  return (
    <main className="flex flex-col gap-2">
      <Tabs defaultValue="latest">
        <div className="overflow-x-auto">
          <TabsList>
            <TabsTrigger value="latest">Latest</TabsTrigger>
            <TabsTrigger value="trending">Trending</TabsTrigger>
            <TabsTrigger value="activity">My Activities</TabsTrigger>
            <TabsTrigger value="bookmark">Bookmarks</TabsTrigger>
            <TabsTrigger value="draft">Drafts</TabsTrigger>
          </TabsList>
        </div>
        <div className="flex gap-2 justify-end items-center">
          <Dialog>
            <DialogTrigger className={filterClass}>
              <Icons.Tag  size={12} />
              Tags
            </DialogTrigger>
            <DialogContent>
              All possible tags will appear here...
            </DialogContent>
          </Dialog>
          <Dialog>
            <DialogTrigger className={filterClass}>
              <Icons.Sort size={12} />
              Sort
            </DialogTrigger>
            <DialogContent>
              Ascending
              Descending
            </DialogContent>
          </Dialog>
          <Dialog>
            <DialogTrigger className={filterClass}>
              <Icons.Filter  size={12} />
              Filter
            </DialogTrigger>
            <DialogContent>
              All filter options will appear here...
            </DialogContent>
          </Dialog>
        </div>
        <TabsContent value="latest">
          List of all latest discussions...
        </TabsContent>
        <TabsContent value="trending">
          List of all trending discussions...
        </TabsContent>
        <TabsContent value="activity">
          List of all of my activities...
        </TabsContent>
        <TabsContent value="bookmark">
          List of all of my bookmarks...
        </TabsContent>
        <TabsContent value="draft">List of all of my draft...</TabsContent>
      </Tabs>
    </main>
  );
};
