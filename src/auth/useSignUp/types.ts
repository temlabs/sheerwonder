export const signUpFields = [
  'email',
  'username',
  'password',
  'confirmationCode',
] as const;

export type SignUpField = (typeof signUpFields)[number];
export type SignUpErrors = {[key in (typeof signUpFields)[number]]: string};
export type SignUpTouched = {[key in (typeof signUpFields)[number]]: boolean};
export type SignUpValues = {[key in (typeof signUpFields)[number]]: string};
