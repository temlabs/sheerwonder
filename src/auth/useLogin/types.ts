export const loginFields = ['username', 'password'] as const;

export type LoginField = (typeof loginFields)[number];
export type LoginErrors = {[key in (typeof loginFields)[number]]: string};
export type LoginTouched = {[key in (typeof loginFields)[number]]: boolean};
export type LoginValues = {[key in (typeof loginFields)[number]]: string};
