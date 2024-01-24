import {ShortPostProps, StoryProps} from '@/demo/types';

export const isShortPost = (
  post: ShortPostProps | StoryProps,
): post is ShortPostProps => {
  return post.type === 'shortPost';
};

export const isStory = (
  post: ShortPostProps | StoryProps,
): post is StoryProps => {
  return post.type === 'story';
};
