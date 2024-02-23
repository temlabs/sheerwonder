import {CreateTrackParams, Track} from '@/tracks/trackTypes';
import {User} from '@/user/userTypes';

export interface ShortPost {
  id: string;
  user_id: string;
  text: string;
  reply_count: number;
  upvote_count: number;
  save_count: number;
  track_id: string;
  time_in: number | null;
  time_out: number | null;
  created_at: string;
  username: User['username'];
  display_name: User['display_name'];
  avatar_url: User['avatar_url'];
  artist: Track['artist'];
  artwork: Track['artwork'];
  spotify_id: Track['spotify_id'];
  duration: Track['duration'];
  name: Track['name'];
}

export interface ShortPostDraft {
  user_id: string;
  text: string;
  track: CreateTrackParams;
  time_in: number;
  time_out: number;
}
