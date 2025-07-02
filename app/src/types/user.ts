interface RecentActivity {
    id: string;
    userId: string;
    activityType: string;
    activityData: string;
    createdAt: string;
}

interface UserProfile {
    id: string;
    userId: string;
    email: string;
    username: string;
    displayName: string;
    bio: string | null;
    avatarUrl: string | null;
    website: string | null;
    location: string | null;
    role: string;
    lastSeenAt: string | null;
    postCount: number;
    reputation: number;
    interests: string[] | null;
    recentActivities: RecentActivity[] | null;
    createdAt: string;
    updatedAt: string;
}

interface User {
    id: string;
    email: string;
    username: string;
    avatarUrl: string | null;
    isActive: boolean;
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
}

export type { User, UserProfile };