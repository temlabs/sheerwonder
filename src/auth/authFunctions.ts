import {LoginParams, SignUpParams, SignUpResponse} from '@/auth/authTypes';
import {stytch} from '@/stytch/config';
import {queryClient} from '@/tanstack/config';
import {fetchUser} from '@/user/userFunctions';
import userQueryKeys from '@/user/userQueryKeys';

export const checkUserExists = async (
  email: string = '',
  username: string = '',
): Promise<boolean> => {
  try {
    const url = new URL(
      'userExists',
      'https://sheerwonder-backend-production.up.railway.app/',
    );

    url.searchParams.append('email', email);
    url.searchParams.append('username', username);
    console.debug(url.toString());
    const res = await fetch(url);
    const userExists = await res.json();
    return userExists;
  } catch (error) {
    console.debug(error);
  }
  return false;
};

export const login = async (
  loginParams: LoginParams,
): Promise<{sessionToken: string; sessionJwt: string}> => {
  const url = new URL(
    'login',
    'https://sheerwonder-backend-production.up.railway.app/',
  );

  const jsonData = JSON.stringify(loginParams);

  const headers = {
    'Content-Type': 'application/json',
  };

  const fetchOptions = {
    method: 'POST',
    headers: headers,
    body: jsonData,
  };

  try {
    const res = await fetch(url, fetchOptions);
    if (res.status !== 200) {
      throw res.statusText;
    }
    const resJson = (await res.json()) as unknown as {
      sessionToken: string;
      sessionJwt: string;
    };
    console.debug(res.status);
    const stytchUser = await stytch.user.get();
    queryClient.prefetchQuery({
      queryKey: userQueryKeys.user(stytchUser?.user_id!),
      queryFn: fetchUser,
    });
    return resJson;
  } catch (error) {
    console.debug(error);
  }
  return {sessionJwt: '', sessionToken: ''};
};

export const signUp = async (
  signUpParams: SignUpParams,
): Promise<{sessionToken: string; sessionJwt: string}> => {
  const url = new URL(
    'signUp',
    'https://sheerwonder-backend-production.up.railway.app/',
  );

  const jsonData = JSON.stringify(signUpParams);

  const headers = {
    'Content-Type': 'application/json',
  };

  const fetchOptions = {
    method: 'POST',
    headers: headers,
    body: jsonData,
  };

  try {
    const res = await fetch(url, fetchOptions);
    const resJson = (await res.json()) as unknown as SignUpResponse;

    return resJson;
  } catch (error) {
    console.debug(error);
  }
  return {sessionJwt: '', sessionToken: ''};
};
