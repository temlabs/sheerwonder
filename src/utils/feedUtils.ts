import {ShortPostProps, StoryProps} from '@/demo/types';

export const isComment = (
  post: ShortPostProps | StoryProps,
): post is ShortPostProps => {
  return post.type === 'comment';
};

export const isStory = (
  post: ShortPostProps | StoryProps,
): post is StoryProps => {
  return post.type === 'story';
};
