import {isValidEmailAddress} from '@/utils/validationUtils';
import {TextInputProps} from 'react-native';

export const checkUserExists: TextInputProps['onSubmitEditing'] = async e => {
  const text = e.nativeEvent.text;
  let email = '';
  let username = '';
  if (isValidEmailAddress(text)) {
    email = text;
  } else {
    username = text;
  }
  try {
    const url = new URL(
      'userExists',
      'https://sheerwonder-backend-production.up.railway.app/',
    );

    url.searchParams.append('email', email);
    url.searchParams.append('username', username);
    console.debug(url.toString());
    const res = await fetch(url);
    const userExists = await res.json();
    console.debug(userExists);
  } catch (error) {
    console.debug(error);
  }
};
