import {CommentProps, StoryProps} from '@/demo/types';

export const isComment = (
  post: CommentProps | StoryProps,
): post is CommentProps => {
  return post.type === 'comment';
};

export const isStory = (
  post: CommentProps | StoryProps,
): post is StoryProps => {
  return post.type === 'story';
};
