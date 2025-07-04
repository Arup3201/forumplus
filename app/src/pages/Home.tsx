import { useEffect, useState } from "react";
import useFetch from "@/hooks/useFetch";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import CreateThread from "./CreateThread";
import {Icons} from "@/components/icons";

export const Home = () => {
  const { loading, error, getRequest } = useFetch();
  const [isCreateThreadOpen, setIsCreateThreadOpen] = useState(false);

  useEffect(() => {
    getRequest("/api/threads/", (data) => {
      console.log(data);
    }, (error) => {
      console.error(error);
    });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const categories = [
    {
      name: "General Discussion",
      description: "Open forum for all topics and community chat",
      icon: <Icons.MessageSquare className="w-6 h-6" />,
      postCount: 1234,
      color: "bg-blue-500/10 text-blue-500"
    },
    {
      name: "Help & Support",
      description: "Get help with technical issues and questions",
      icon: <Icons.HelpCircle className="w-6 h-6" />,
      postCount: 856,
      color: "bg-green-500/10 text-green-500"
    },
    {
      name: "Ideas & Feedback",
      description: "Share your ideas and suggestions",
      icon: <Icons.Lightbulb className="w-6 h-6" />,
      postCount: 432,
      color: "bg-yellow-500/10 text-yellow-500"
    },
    {
      name: "Development",
      description: "Technical discussions and coding help",
      icon: <Icons.Code className="w-6 h-6" />,
      postCount: 678,
      color: "bg-purple-500/10 text-purple-500"
    }
  ];

  const recentActivity = [
    {
      title: "How to get started with React?",
      category: "Help & Support",
      author: "@john_doe",
      time: "5 minutes ago",
      replies: 3
    },
    {
      title: "New feature proposal: Dark mode",
      category: "Ideas & Feedback",
      author: "@jane_smith",
      time: "15 minutes ago",
      replies: 5
    },
    {
      title: "Best practices for state management",
      category: "Development",
      author: "@tech_guru",
      time: "1 hour ago",
      replies: 8
    }
  ];

  return (
    <div className="w-full mx-auto px-6 space-y-6 relative">
      {/* Floating Action Button */}
      <div className="fixed bottom-1 right-8 z-50">
        <Button 
          size="lg" 
          className="rounded-full shadow-lg hover:shadow-xl transition-shadow"
          onClick={() => setIsCreateThreadOpen(true)}
        >
          <Icons.Plus className="w-5 h-5 mr-2" />
          New Discussion
        </Button>
      </div>

      {/* CreateThread Modal */}
      <CreateThread 
        isOpen={isCreateThreadOpen} 
        onClose={() => setIsCreateThreadOpen(false)} 
      />

      {/* Site Identity */}
      <div className="text-center space-y-6">
        <div className="flex items-center justify-center gap-4">
          <Icons.Logo className="w-10 h-10" />
          <h1 className="text-4xl font-bold">ForumPlus</h1>
        </div>
        <p className="text-muted-foreground text-xl max-w-2xl mx-auto">
          A vibrant community for developers to share knowledge, get help, and grow together.
        </p>
      </div>

      {/* Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((category) => (
          <Card key={category.name} className="hover:shadow-md transition-shadow">
            <CardContent className="p-8">
              <div className="flex flex-col gap-4">
                <div className={`p-4 rounded-lg ${category.color} w-fit`}>
                  {category.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-xl">{category.name}</h3>
                  <p className="text-muted-foreground mt-2">{category.description}</p>
                  <div className="flex items-center gap-2 mt-4 text-muted-foreground">
                    <Icons.Users className="w-5 h-5" />
                    <span>{category.postCount} posts</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader className="px-6 py-4 border-b">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl">Active Discussions</CardTitle>
            <Button variant="ghost" size="sm">View All</Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y">
            {recentActivity.map((activity) => (
              <div key={activity.title} className="flex items-start gap-4 p-4 hover:bg-muted/50 transition-colors">
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium truncate">{activity.title}</h4>
                  <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                    <Badge variant="outline" className="text-xs">{activity.category}</Badge>
                    <span>•</span>
                    <span>{activity.author}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Icons.Clock className="w-3 h-3" />
                      {activity.time}
                    </span>
                  </div>
                </div>
                <Badge variant="secondary" className="shrink-0">{activity.replies} replies</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}; 