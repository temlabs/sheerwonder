import {DBUser} from '@/user/userTypes';

export interface LoginParams {
  username?: string;
  password: string;
  email?: string;
}

export interface SignUpParams {
  username: string;
  password: string;
  email: string;
}

export interface SignUpResponse {
  sessionToken: string;
  sessionJwt: string;
  userId: string;
  user: DBUser;
}
