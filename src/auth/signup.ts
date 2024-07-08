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
  return res;
};
