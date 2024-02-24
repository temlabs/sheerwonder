import {API_URL} from '@env';
import {ShortPost, ShortPostDraft} from './shortPostTypes';
import {QueryFunction} from '@tanstack/react-query';
import apiEndpoints from '@/api/apiConfig';

export const fetchShortPosts: QueryFunction<
  ShortPost[],
  string[],
  never
> = async context => {
  const {queryKey} = context;
  const [, _userId] = queryKey;
  const queryParams = new URLSearchParams({created_by_user_id: _userId});
  const shortPostsEndPoint = apiEndpoints.shortPost;
  const url = `${API_URL}${shortPostsEndPoint}${
    _userId ? '?' + queryParams.toString() : ''
  }`;

  try {
    const shortPostsRes = await fetch(url);
    const shortPosts = (await shortPostsRes.json()) as ShortPost[];
    return shortPosts;
  } catch (error) {
    throw error;
  }
};

export async function addShortPost(shortPost: ShortPostDraft) {
  const addShortPostEndPoint = 'createShortPost';
  const url = API_URL + addShortPostEndPoint;
  console.log('adding short post: ', shortPost);
  try {
    const addShortPostsRes = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(shortPost),
    });
    console.log('add short post res: ', addShortPostsRes);
    const createdShortPost = await addShortPostsRes.json();
    return createdShortPost;
  } catch (error) {
    console.log('add short post err: ', error);
    throw error;
  }
}
