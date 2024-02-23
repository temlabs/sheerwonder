export interface User {
  id: string;
  created_at: string;
  avatar_url: string | null;
  bio: string | null;
  follower_count: number;
  following_count: number;
  sign_up_order_number: number;
  display_name: string | null;
  username: string;
}
