import type { UserProfile } from "@/types/user";

type EditType = "display_name" | "username" | "bio" | "interests" | "location";

export const USER_PROFILE_ACTION = {
    SET: "set",
    UPDATE_DISPLAY_NAME: "updateDisplayName",
    UPDATE_USERNAME: "updateUsername",
    UPDATE_BIO: "updateBio",
    UPDATE_LOCATION: "updateLocation",
    UPDATE_INTERESTS: "updateInterests",
} as const;

type UserProfileReducerActionType = typeof USER_PROFILE_ACTION[keyof typeof USER_PROFILE_ACTION];

interface UserProfileReducerAction {
  type: UserProfileReducerActionType;
  payload: UserProfile;
}

export type { EditType, UserProfileReducerAction };
