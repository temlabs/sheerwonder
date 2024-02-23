export interface Track {
  id: string;
  name: string;
  artist: string;
  artwork: string | null;
  spotify_id: string;
  duration: number;
  created_at: string;
}

export type CreateTrackParams = Omit<Track, 'id' | 'created_at'>;
