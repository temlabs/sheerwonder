export interface DBTrack {
  id: string;
  name: string;
  artist: string;
  artwork: string | null;
  spotify_id: string | null;
  duration: number | null;
  created_at: string;
}

export type CreateDBTrackParams = Omit<DBTrack, 'id' | 'created_at'>;
