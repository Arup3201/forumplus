import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Camera,
  Edit3,
  MapPin,
  Calendar,
  MessageSquare,
  Reply,
  Star,
  Plus,
  Mail,
  Bell,
  ExternalLink,
  User,
  Hash,
} from "lucide-react";

const UserProfile = () => {
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [isEditingInterests, setIsEditingInterests] = useState(false);
  const [isEditingLocation, setIsEditingLocation] = useState(false);
  // Remove activeTab state as shadcn tabs manages its own state
  const [bio, setBio] = useState(
    "Passionate developer with 5+ years of experience in React and TypeScript. Love building scalable web applications and contributing to open source projects."
  );
  const [interests, setInterests] = useState([
    "React",
    "TypeScript",
    "Node.js",
    "GraphQL",
    "Open Source",
  ]);
  const [location, setLocation] = useState("San Francisco, CA");
  const [tempBio, setTempBio] = useState(bio);
  const [tempInterests, setTempInterests] = useState(interests.join(", "));
  const [tempLocation, setTempLocation] = useState(location);

  // Mock user data
  const userData = {
    username: "tech_enthusiast",
    fullName: "Alex Johnson",
    email: "alex.johnson@example.com",
    avatar: "/api/placeholder/120/120",
    reputation: 1247,
    location: location,
    joinDate: "Mar 2023",
    stats: {
      postsCreated: 156,
      repliesMade: 423,
      reputation: 1247,
    },
    recentPosts: [
      {
        title: "Best practices for React hooks",
        thread: "React Discussion",
        date: "2 days ago",
      },
      {
        title: "TypeScript vs JavaScript in 2024",
        thread: "General Discussion",
        date: "5 days ago",
      },
      {
        title: "How to optimize bundle size",
        thread: "Performance",
        date: "1 week ago",
      },
      {
        title: "GraphQL vs REST APIs",
        thread: "API Design",
        date: "2 weeks ago",
      },
      {
        title: "State management solutions",
        thread: "React Discussion",
        date: "3 weeks ago",
      },
    ],
    notifications: {
      messages: 3,
      notifications: 7,
    },
  };

  const handleBioSave = () => {
    setBio(tempBio);
    setIsEditingBio(false);
  };

  const handleBioCancel = () => {
    setTempBio(bio);
    setIsEditingBio(false);
  };

  const handleInterestsSave = () => {
    const newInterests = tempInterests
      .split(",")
      .map((i) => i.trim())
      .filter((i) => i);
    setInterests(newInterests);
    setIsEditingInterests(false);
  };

  const handleInterestsCancel = () => {
    setTempInterests(interests.join(", "));
    setIsEditingInterests(false);
  };

  const handleLocationSave = () => {
    setLocation(tempLocation);
    setIsEditingLocation(false);
  };

  const handleLocationCancel = () => {
    setTempLocation(location);
    setIsEditingLocation(false);
  };

  return (
    <div className="w-full mx-auto px-6 space-y-6">
      <Tabs defaultValue="profile">
        <div className="flex items-center justify-between">
          <TabsList className="grid w-auto grid-cols-3 gap-4">
            <TabsTrigger value="profile" className="relative">
              <User className="w-4 h-4 mr-2" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="messages" className="relative">
              <Mail className="w-4 h-4 mr-2" />
              Messages
              {userData.notifications.messages > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -top-1 -right-1 text-xs px-1.5 py-0 min-w-[18px] h-[18px] rounded-full"
                >
                  {userData.notifications.messages}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="notifications" className="relative">
              <Bell className="w-4 h-4 mr-2" />
              Notifications
              {userData.notifications.notifications > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -top-1 -right-1 text-xs px-1.5 py-0 min-w-[18px] h-[18px] rounded-full"
                >
                  {userData.notifications.notifications}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>
          <Button size="sm" className="gap-2">
            <Plus className="w-4 h-4" />
            New Thread
          </Button>
        </div>

        <TabsContent value="profile" className="mt-0">
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  {/* Profile Picture */}
                  <div className="relative group">
                    <Avatar className="w-32 h-32 cursor-pointer border-4 border-white shadow-lg">
                      <AvatarImage
                        src={userData.avatar}
                        alt={userData.fullName}
                      />
                      <AvatarFallback className="text-2xl font-bold bg-primary text-primary-foreground">
                        {userData.fullName
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                      <Camera className="w-8 h-8 text-white" />
                    </div>
                  </div>

                  {/* User Info */}
                  <div className="flex-1 space-y-4">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div>
                        <h1 className="text-3xl font-bold">
                          {userData.fullName}
                        </h1>
                        <p className="text-lg text-muted-foreground">
                          @{userData.username}
                        </p>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                          <Mail className="w-4 h-4" />
                          <span>{userData.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="w-4 h-4" />
                          <span>Joined {userData.joinDate}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 bg-yellow-50 dark:bg-yellow-900/20 px-3 py-1 rounded-full">
                          <Star className="w-4 h-4 text-yellow-500" />
                          <span className="font-semibold text-yellow-700 dark:text-yellow-400">
                            {userData.reputation.toLocaleString()}
                          </span>
                        </div>
                        <Button size="sm" className="gap-2">
                          <Edit3 className="w-4 h-4" />
                          Edit Profile
                        </Button>
                      </div>
                    </div>

                    {/* Activity Summary Icons */}
                    <TooltipProvider>
                      <div className="flex items-center gap-6 pt-2 border-t border-muted/30">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="flex items-center gap-2 text-sm cursor-help">
                              <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                                <MessageSquare className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                              </div>
                              <span className="font-medium">
                                {userData.stats.postsCreated}
                              </span>
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Posts Created</p>
                          </TooltipContent>
                        </Tooltip>

                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="flex items-center gap-2 text-sm cursor-help">
                              <div className="w-8 h-8 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                                <Reply className="w-4 h-4 text-green-600 dark:text-green-400" />
                              </div>
                              <span className="font-medium">
                                {userData.stats.repliesMade}
                              </span>
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Replies Made</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                    </TooltipProvider>
                  </div>
                </div>
              </CardContent>
            </Card>
            {/* Personal Info */}
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>
                  Manage your profile details and interests
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Bio */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="bio">Bio</Label>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsEditingBio(true)}
                      className="text-xs"
                    >
                      <Edit3 className="w-3 h-3 mr-1" />
                      Edit
                    </Button>
                  </div>
                  {isEditingBio ? (
                    <div className="space-y-2">
                      <Textarea
                        id="bio"
                        value={tempBio}
                        onChange={(e) => setTempBio(e.target.value)}
                        rows={3}
                        maxLength={200}
                        placeholder="Tell us about yourself..."
                      />
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-muted-foreground">
                          {tempBio.length}/200 characters
                        </span>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={handleBioCancel}
                          >
                            Cancel
                          </Button>
                          <Button size="sm" onClick={handleBioSave}>
                            Save
                          </Button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {bio}
                    </p>
                  )}
                </div>

                {/* Location */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="location">Location</Label>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsEditingLocation(true)}
                      className="text-xs"
                    >
                      <Edit3 className="w-3 h-3 mr-1" />
                      Edit
                    </Button>
                  </div>
                  {isEditingLocation ? (
                    <div className="space-y-2">
                      <Input
                        id="location"
                        type="text"
                        value={tempLocation}
                        onChange={(e) => setTempLocation(e.target.value)}
                        placeholder="Enter your location"
                      />
                      <div className="flex justify-end gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={handleLocationCancel}
                        >
                          Cancel
                        </Button>
                        <Button size="sm" onClick={handleLocationSave}>
                          Save
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      <span>{userData.location}</span>
                    </div>
                  )}
                </div>

                {/* Interests */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="interests">Interests & Topics</Label>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsEditingInterests(true)}
                      className="text-xs"
                    >
                      <Edit3 className="w-3 h-3 mr-1" />
                      Edit
                    </Button>
                  </div>
                  {isEditingInterests ? (
                    <div className="space-y-2">
                      <Input
                        id="interests"
                        type="text"
                        value={tempInterests}
                        onChange={(e) => setTempInterests(e.target.value)}
                        placeholder="Enter interests separated by commas"
                      />
                      <div className="flex justify-end gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={handleInterestsCancel}
                        >
                          Cancel
                        </Button>
                        <Button size="sm" onClick={handleInterestsSave}>
                          Save
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {interests.map((interest) => (
                        <Badge
                          key={interest}
                          variant="secondary"
                          className="text-xs"
                        >
                          <Hash className="w-3 h-3 mr-1" />
                          {interest}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>
                      Your latest posts and contributions
                    </CardDescription>
                  </div>
                  <Button variant="outline" size="sm" className="gap-2">
                    <ExternalLink className="w-4 h-4" />
                    View All Posts
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y">
                  {userData.recentPosts.map((post) => (
                    <div
                      key={post.title}
                      className="p-4 hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-sm truncate">
                            {post.title}
                          </h4>
                          <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                            <span>in</span>
                            <Badge
                              variant="outline"
                              className="text-xs px-2 py-0"
                            >
                              {post.thread}
                            </Badge>
                          </div>
                        </div>
                        <span className="text-xs text-muted-foreground whitespace-nowrap">
                          {post.date}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="messages" className="mt-0">
          <div className="space-y-4">
            <div className="text-center py-8 text-muted-foreground">
              <Mail className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p className="text-sm">No messages yet</p>
              <p className="text-xs mt-1">
                Your conversations will appear here
              </p>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="notifications" className="mt-0">
          <div className="space-y-4">
            <div className="text-center py-8 text-muted-foreground">
              <Bell className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p className="text-sm">No notifications yet</p>
              <p className="text-xs mt-1">Activity updates will appear here</p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export { UserProfile };
