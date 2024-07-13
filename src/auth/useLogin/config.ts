import {LoginErrors, LoginTouched, LoginValues} from './types';

export const defaultErrors: LoginErrors = {
  username: '',
  password: '',
};

export const defaultValues: LoginValues = {
  username: '',
  password: '',
};

export const defaultTouched: LoginTouched = {
  username: false,
  password: false,
};
