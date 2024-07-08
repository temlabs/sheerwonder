import {useState} from 'react';
import {defaultErrors, defaultTouched, defaultValues} from './config';
import {SignUpField, signUpFields} from './types';
import {signUpValidationSchema} from './validationSchema';
import {LayoutAnimation} from 'react-native';
import {layoutAnimationConfig} from '@/animations/animationConfig';

interface Errors {}

export function useSignUp() {
  const [errors, setErrors] = useState(defaultErrors);
  const [touched, setTouched] = useState(defaultTouched);
  const [values, setValues] = useState(defaultValues);

  const updateField = (key: (typeof signUpFields)[number], value: string) => {
    LayoutAnimation.configureNext(layoutAnimationConfig);
    setValues(v => ({...v, [key]: value}));
  };

  const touchField = (
    key: (typeof signUpFields)[number],
    touched: boolean = true,
  ) => {
    LayoutAnimation.configureNext(layoutAnimationConfig);
    setTouched(t => ({...t, [key]: touched}));
  };

  const validateField = (key: SignUpField, value: string = values[key]) => {
    const result = signUpValidationSchema
      .pick({[key]: true})
      .safeParse({[key]: value});
    console.debug({result});
    if (result.success) {
      LayoutAnimation.configureNext(layoutAnimationConfig);
      setErrors(e => ({...e, [key]: ''}));
    } else {
      const errorMessage = result.error.errors[0].message;
      console.debug({errorMessage});
      LayoutAnimation.configureNext(layoutAnimationConfig);
      setErrors(e => ({...e, [key]: errorMessage}));
    }
  };

  const checkTouched = (keys: (typeof signUpFields)[number][]) => {
    for (const key of keys) {
      if (!touched[key]) {
        return false;
      }
    }
    return true;
  };

  const checkErrors = (keys: (typeof signUpFields)[number][]) => {
    for (const key of keys) {
      if (!errors[key]) {
        return false;
      }
    }
    return true;
  };

  return {
    validateField,
    touchField,
    updateField,
    checkTouched,
    checkErrors,
    values,
    errors,
    touched,
  };
}
