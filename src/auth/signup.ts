import {User} from '@/user/userTypes';
import {API_URL} from '@env';

export const signUp = async (
  username: string,
  email: string,
  password: string,
) => {
  const body = JSON.stringify({
    username,
    email,
    password,
  });

  const res = await fetch(`${API_URL}signUp`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body,
  });
  const json = (await res.json()) as
    | User
    | {
        error: {
          message: string;
          code: number;
          field?: 'email' | 'password' | 'username';
        };
      };
  if ('error' in json) {
    const e = new Error(json.error.message);
    e.name = json.error.field ?? 'signUp request error';
    throw e;
  }
  return json;
};

export const signIn = async (username: string, email: string) => {
  const body = JSON.stringify({
    username,
    email,
  });

  const res = await fetch(`${API_URL}signUp`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body,
  });
  return res;
};
