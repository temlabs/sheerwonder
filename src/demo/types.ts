export interface UserProps {
  userName: string;
  displayName: string;
  profilePicture: string;
}

export type PostType = 'story' | 'shortPost';

export interface ShortPostProps {
  id: string;
  type: PostType;
  track: TrackProps;
  timeIn?: number | undefined;
  timeOut?: number | undefined;
  text: string;
  user: UserProps;
  upvotes: number;
  replies: number;
  saves: number;
}

export interface StoryProps {
  id: string;
  type: PostType;
  tracks: TrackProps[];
  cover: string;
  title: string;
  subtitle: string;
  chapters: StoryChapterProps[];
  intro: string;
  user: UserProps;
  upvotes: number;
  replies: number;
  saves: number;
}

export interface StoryChapterProps {
  id: string;
  title?: string;
  text: string;
  track: TrackProps;
  timeIn?: number;
  timeOut?: number;
}

export interface TrackProps {
  trackName: string;
  trackArtist: string;
  trackArtwork: string;
  duration: number;
  spotifyId: string;
}

export interface CommentProps {
  id: string;
  postId: string;
  parent?: CommentProps;
  text: string;
  user: UserProps;
  replies: number;
}

export type Thread = CommentProps[];
