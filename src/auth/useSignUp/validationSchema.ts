import {z} from 'zod';
import {SignUpValues} from './types';

export const signUpValidationSchema = z.object<z.ZodRawShape>({
  username: z
    .string({required_error: 'Please provide a username'})
    .min(1, 'Please provide a username'),
  email: z
    .string({required_error: 'Please provide a valid email address'})
    .email('Please provide a valid email address')
    .min(1, 'Please provide a valid email address'),
  password: z
    .string({required_error: 'Please provide a password'})
    .min(1, 'Please provide a password')
    .min(8, 'Please choose a password with atleast 8 characters'),
  confirmationCode: z.string(),
});
