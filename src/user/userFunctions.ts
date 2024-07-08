import {QueryFunction} from '@tanstack/react-query';
import {User} from './userTypes';
import {API_URL} from '@env';
import apiEndpoints from '@/api/apiConfig';

export const fetchUser: QueryFunction<
  User,
  string[],
  never
> = async context => {
  const {queryKey} = context;
  const [, _userId] = queryKey;
  const queryParams = new URLSearchParams({userId: _userId});
  const url = API_URL + apiEndpoints.user + '?' + queryParams.toString();

  try {
    const userRes = await fetch(url);

    if (userRes.status !== 200) {
      throw userRes.statusText;
    }
    const user = (await userRes.json()) as unknown as User;
    return user;
  } catch (error) {
    throw error;
  }
};
