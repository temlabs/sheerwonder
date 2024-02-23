import {API_URL} from '@env';
import {ShortPost, ShortPostDraft} from './shortPostTypes';

export async function fetchShortPosts() {
  const shortPostsEndPoint = 'shortPosts';
  const endpoint = API_URL + shortPostsEndPoint;
  try {
    const shortPostsRes = await fetch(endpoint);
    const shortPosts = (await shortPostsRes.json()) as ShortPost[];
    return shortPosts;
  } catch (error) {
    throw error;
  }
}

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
