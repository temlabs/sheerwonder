interface ExternalUrls {
  spotify: string;
}

interface Image {
  url: string;
  height: number;
  width: number;
}

interface Artist {
  external_urls: ExternalUrls;
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
  followers?: {
    href: string;
    total: number;
  };
  genres?: string[];
  images?: Image[];
  popularity?: number;
}

interface Album {
  album_type: string;
  total_tracks: number;
  available_markets: string[];
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  name: string;
  release_date: string;
  release_date_precision: string;
  restrictions?: {
    reason: string;
  };
  type: string;
  uri: string;
  artists: Artist[];
}

interface ExternalIds {
  isrc: string;
  ean: string;
  upc: string;
}

export interface SpotifyTrack {
  album: Album;
  artists: Artist[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: ExternalIds;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  is_playable: boolean;
  linked_from?: any; // Replace 'any' with the appropriate type if available
  restrictions?: {
    reason: string;
  };
  name: string;
  popularity: number;
  preview_url: string;
  track_number: number;
  type: string;
  uri: string;
  is_local: boolean;
}

interface Context {
  type: string;
  href: string;
  external_urls: ExternalUrls;
  uri: string;
}

export interface TrackItem {
  track: SpotifyTrack;
  played_at: string;
  context: Context;
}

interface Cursors {
  after: string;
  before: string;
}

export interface RecentlyPlayedResponse {
  href: string;
  limit: number;
  next: string;
  cursors: Cursors;
  total: number;
  items: TrackItem[];
}
