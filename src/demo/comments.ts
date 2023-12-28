import {CommentProps} from './types';
import {users} from './users';

export const comments: CommentProps[] = [
  {
    id: 'abc',
    postId: 'abc',
    replies: 5,
    text: 'Honestly, i remember listening to this on the way back from work for the first time and I instantly knew it would be one of my 2023 faves',
    user: users[8],
    parent: undefined,
  },
  {
    id: 'def',
    postId: 'abc',
    replies: 0,
    text: "right! it's the way the pads and his voice combine, like the soundscape is so open",
    user: users[1],
    parent: undefined,
  },
];
