import { useState, useEffect, useReducer } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Icons } from "@/components/icons";
import useAuth from "@/hooks/auth";
import useFetch from "@/hooks/fetch";
import type { UserProfile } from "@/types/user";
import type {
  EditType,
  UserProfileReducerAction,
} from "@/types/components/user-profile";
import { USER_PROFILE_ACTION } from "@/types/components/user-profile";
import UserUpdateModal from "@/components/user-update-modal";
import OptimizedAvatar from "@/components/optimized-avatar";
import Sidebar from "@/components/sidebar";
import type { TabOptionType } from "@/types/components/home";

const userProfileReducer = (
  state: UserProfile,
  action: UserProfileReducerAction,
) => {
  switch (action.type) {
    case USER_PROFILE_ACTION.SET:
      return {
        ...action.payload,
        bio: action.payload.bio ?? "-",
        interests: action.payload.interests ?? [],
        location: action.payload.location ?? "-",
      };
    case USER_PROFILE_ACTION.UPDATE_DISPLAY_NAME:
      return {
        ...state,
        displayName: action.payload.displayName,
      };
    case USER_PROFILE_ACTION.UPDATE_USERNAME:
      return {
        ...state,
        username: action.payload.username,
      };
    case USER_PROFILE_ACTION.UPDATE_BIO:
      return {
        ...state,
        bio: action.payload.bio,
      };
    case USER_PROFILE_ACTION.UPDATE_LOCATION:
      return {
        ...state,
        location: action.payload.location,
      };
    case USER_PROFILE_ACTION.UPDATE_INTERESTS:
      return {
        ...state,
        interests: action.payload.interests,
      };
    default:
      return state;
  }
};

const UserProfilePage = () => {
  const { user } = useAuth();
  const { loading, error, getRequest, patchRequest } = useFetch();

  const [userProfileState, userProfileDispatch] = useReducer(
    userProfileReducer,
    {} as UserProfile,
  );
  const [editingProfile, setEditingProfile] = useState<EditType | null>(null);

  // Temporary states for editing
  const [tempBio, setTempBio] = useState(userProfileState.bio ?? "");
  const [tempInterests, setTempInterests] = useState(
    userProfileState.interests?.join(", ") ?? "",
  );
  const [tempLocation, setTempLocation] = useState(
    userProfileState.location ?? "",
  );

  const handleBioSave = async () => {
    await patchRequest(
      `/api/auth/profile`,
      {
        id: user?.id,
        bio: tempBio,
      },
      (data) => {
        userProfileDispatch({
          type: USER_PROFILE_ACTION.UPDATE_BIO,
          payload: data,
        });
        setTempBio(data.bio ?? "");
      },
      (error) => {
        console.error("Error saving bio:", error);
      },
    );
    setEditingProfile(null);
  };

  const handleBioCancel = () => {
    setTempBio(userProfileState.bio ?? "");
    setEditingProfile(null);
  };

  const handleInterestsSave = async () => {
    const newInterests = tempInterests
      .split(",")
      .map((i) => i.trim())
      .filter((i) => i);
    await patchRequest(
      `/api/auth/profile`,
      {
        id: user?.id,
        interests: newInterests,
      },
      (data) => {
        userProfileDispatch({
          type: USER_PROFILE_ACTION.UPDATE_INTERESTS,
          payload: data,
        });
        setTempInterests(data.interests?.join(", ") ?? "");
      },
      (error) => {
        console.error("Error saving interests:", error);
      },
    );
    setEditingProfile(null);
  };

  const handleInterestsCancel = () => {
    setTempInterests(userProfileState.interests?.join(", ") ?? "");
    setEditingProfile(null);
  };

  const handleLocationSave = async () => {
    await patchRequest(
      `/api/auth/profile`,
      {
        id: user?.id,
        location: tempLocation,
      },
      (data) => {
        userProfileDispatch({
          type: USER_PROFILE_ACTION.UPDATE_LOCATION,
          payload: data,
        });
        setTempLocation(data.location ?? "");
      },
      (error) => {
        console.error("Error saving location:", error);
      },
    );
    setEditingProfile(null);
  };

  const handleLocationCancel = () => {
    setTempLocation(userProfileState.location ?? "");
    setEditingProfile(null);
  };

  const handleSave = async (field: EditType, value: string) => {
    switch (field) {
      case "display_name":
        await patchRequest(
          `/api/auth/profile`,
          {
            id: user?.id,
            display_name: value,
          },
          (data) => {
            userProfileDispatch({
              type: USER_PROFILE_ACTION.UPDATE_DISPLAY_NAME,
              payload: {
                ...userProfileState,
                displayName: data.display_name,
              },
            });
          },
          (error) => {
            console.error("Error saving display name:", error);
          },
        );
        break;
      case "username":
        await patchRequest(
          `/api/auth/profile`,
          {
            id: user?.id,
            username: value,
          },
          (data) => {
            userProfileDispatch({
              type: USER_PROFILE_ACTION.UPDATE_USERNAME,
              payload: {
                ...userProfileState,
                username: data.username,
              },
            });
          },
          (error) => {
            console.error("Error saving username:", error);
          },
        );
        break;
    }
    setEditingProfile(null);
  };

  const handleUpdateCancel = () => {
    setEditingProfile(null);
  };

  const user_tabs: TabOptionType[] = [
    {
      id: "personal",
      name: "Personal",
      title: "Personal Information",
      description: "Personal information about the user",
      Content: () => {
        return (
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
                <div className="flex justify-between items-center">
                  <Label htmlFor="bio">Bio</Label>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setEditingProfile("bio")}
                    className="text-xs"
                  >
                    <Icons.Edit className="mr-1 w-3 h-3" />
                    Edit
                  </Button>
                </div>
                {editingProfile === "bio" ? (
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
                      <span className="text-muted-foreground text-xs">
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
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {bio}
                  </p>
                )}
              </div>

              {/* Location */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="location">Location</Label>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setEditingProfile("location")}
                    className="text-xs"
                  >
                    <Icons.Edit className="mr-1 w-3 h-3" />
                    Edit
                  </Button>
                </div>
                {editingProfile === "location" ? (
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
                  <div className="flex items-center gap-2 text-muted-foreground text-sm">
                    <Icons.MapPin className="w-4 h-4" />
                    <span>{location ?? "-"}</span>
                  </div>
                )}
              </div>

              {/* Interests */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="interests">Interests & Topics</Label>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setEditingProfile("interests")}
                    className="text-xs"
                  >
                    <Icons.Edit className="mr-1 w-3 h-3" />
                    Edit
                  </Button>
                </div>
                {editingProfile === "interests" ? (
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
                    {interests && interests.length > 0 ? (
                      interests.map((interest) => (
                        <Badge
                          key={interest}
                          variant="secondary"
                          className="text-xs"
                        >
                          <Icons.Hash className="mr-1 w-3 h-3" />
                          {interest ?? "-"}
                        </Badge>
                      ))
                    ) : (
                      <span className="text-muted-foreground text-sm">-</span>
                    )}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        );
      },
    },
    {
      id: "questions",
      name: "Questions",
      title: "Questions You Posted",
      description: "Questions posted by the user till now",
      Content: () => {
        return <p>
          This is questions tab.
        </p>
      }
    },
    {
      id: "answers",
      name: "Answers",
      title: "Answers You Provided",
      description: "Answers the user has given till now",
      Content: () => {
        return <p>
          This is answers tab.
        </p>
      }
    },
  ];

  const [selectedTab, setSelectedTab] = useState(user_tabs[0].id);

  useEffect(() => {
    if (user) {
      getRequest(
        `/api/auth/${user.id}/profile`,
        (data) => {
          userProfileDispatch({
            type: USER_PROFILE_ACTION.SET,
            payload: {
              id: data.id,
              userId: data.user_id,
              email: data.email,
              username: data.username,
              displayName: data.display_name,
              bio: data.bio,
              location: data.location,
              interests: data.interests,
              avatarUrl: data.avatar_url,
              website: data.website,
              role: data.role,
              lastSeenAt: data.last_seen_at,
              postCount: data.post_count,
              reputation: data.reputation,
              recentActivities: data.recent_activities,
              createdAt: data.created_at,
              updatedAt: data.updated_at,
            },
          });
          setTempBio(data.bio ?? "");
          setTempInterests(data.interests?.join(", ") ?? "");
          setTempLocation(data.location ?? "");
        },
        (error) => {
          console.error("Error fetching user profile:", error);
        },
      );
    }
  }, [user]);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }

  const { displayName, username, createdAt, bio, location, interests } =
    userProfileState;

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex flex-col gap-2 py-2 pl-2 w-full">
        <Card>
          <CardContent className="p-6">
            <div className="flex md:flex-row flex-col items-start gap-6">
              {/* Profile Picture */}
              <div className="group relative">
                <OptimizedAvatar
                  src={userProfileState.avatarUrl}
                  alt={userProfileState.displayName}
                  fallbackText={userProfileState.displayName?.split(" ")[0][0]}
                  className="shadow-lg border-4 border-white w-32 h-32 cursor-pointer"
                />
                <div className="absolute inset-0 flex justify-center items-center bg-black/40 opacity-0 group-hover:opacity-100 rounded-full transition-opacity cursor-pointer">
                  <Icons.Camera className="w-8 h-8 text-white" />
                </div>
              </div>

              {/* User Info */}
              <div className="flex-1 space-y-4">
                <div className="flex md:flex-row flex-col md:justify-between md:items-center gap-4">
                  <div>
                    <h1 className="font-bold text-3xl">{displayName}</h1>
                    <p className="text-muted-foreground text-lg">@{username}</p>
                    <div className="flex items-center gap-2 mt-1 text-muted-foreground text-sm">
                      <Icons.Mail className="w-4 h-4" />
                      <span>{user?.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground text-sm">
                      <Icons.Calendar className="w-4 h-4" />
                      <span>Joined {createdAt?.split("T")[0] ?? "-"}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button size="sm" className="gap-2">
                          <Icons.Edit className="w-4 h-4" />
                          Edit
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem
                          onClick={() => setEditingProfile("display_name")}
                        >
                          Display Name
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => setEditingProfile("username")}
                        >
                          Username
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>

                {editingProfile === "display_name" && (
                  <UserUpdateModal
                    label="Display Name"
                    value={displayName ?? ""}
                    onSave={(value) => handleSave("display_name", value)}
                    onCancel={() => handleUpdateCancel()}
                  />
                )}
                {editingProfile === "username" && (
                  <UserUpdateModal
                    label="Username"
                    value={username ?? ""}
                    onSave={(value) => handleSave("username", value)}
                    onCancel={() => handleUpdateCancel()}
                  />
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs value={selectedTab}>
          <TabsList className="flex items-center gap-1 border border-gray-300">
            {user_tabs.map((tab) => {
              return (
                <TabsTrigger
                  value={tab.id}
                  className="data-[state=active]:bg-gray-300 hover:bg-gray-100 border data-[state=active]:border-gray-300 hover:border-gray-100 border-transparent text-gray-800 data-[state=active]:text-gray-900 cursor-pointer"
                  onClick={() => setSelectedTab(tab.id)}
                >
                  {tab.name}
                </TabsTrigger>
              );
            })}
          </TabsList>

          {user_tabs.map(tab => {
            if(!tab.Content) return;

            return <TabsContent value={tab.id}>
              <tab.Content />
            </TabsContent>
          })}
        </Tabs>
      </div>
    </div>
  );
};

export default UserProfilePage;
