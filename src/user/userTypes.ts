export interface User {
  id: number;
  bio?: string;
  avatarUrl?: string;
  followerCount: number;
  followingCount: number;
  displayName: string;
  username: string;
}
