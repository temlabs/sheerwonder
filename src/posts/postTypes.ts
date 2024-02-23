import {CreateDBTrackParams, DBTrack} from '@/tracks/trackTypes';

export interface DBShortPost {
  id: string;
  user_id: string;
  post_text: string;
  reply_count: number;
  upvote_count: number;
  save_count: number;
  track_id: DBTrack;
  time_in: number | null;
  time_out: number | null;
  created_at: string;
}

export type CreateDBShortPostParams = Omit<
  DBShortPost,
  'reply_count' | 'upvote_count' | 'save_count' | 'created_at' | 'track_id'
> & {id: string | null; track: CreateDBTrackParams};
