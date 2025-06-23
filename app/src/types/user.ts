interface RecentActivity {
    id: string;
    user_id: string;
    activity_type: string;
    activity_data: string;
    created_at: string;
}

interface UserProfile {
    id: string;
    user_id: string;
    email: string;
    username: string;
    display_name: string | null;
    bio: string | null;
    avatar_url: string | null;
    website: string | null;
    location: string | null;
    role: string;
    last_seen_at: string | null;
    post_count: number;
    reputation: number;
    recentActivities: RecentActivity[] | null;
    created_at: string;
    updated_at: string;
}

interface User {
    id: string;
    email: string;
    is_active: boolean;
    is_deleted: boolean;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
}

export type { User, UserProfile };