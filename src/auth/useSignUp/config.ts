import {SignUpErrors, SignUpTouched, SignUpValues} from './types';

export const defaultErrors: SignUpErrors = {
  username: '',
  password: '',
  confirmationCode: '',
  email: '',
};

export const defaultValues: SignUpValues = {
  username: '',
  password: '',
  confirmationCode: '',
  email: '',
};

export const defaultTouched: SignUpTouched = {
  username: false,
  password: false,
  confirmationCode: false,
  email: false,
};
