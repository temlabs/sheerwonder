import {z} from 'zod';
import {LoginValues} from './types';

export const signUpValidationSchema = z.object<z.ZodRawShape>({
  username: z
    .string({required_error: 'Please provide a username'})
    .min(1, 'Please provide a username'),
  password: z
    .string({required_error: 'Please provide a password'})
    .min(1, 'Please provide a password'),
});
