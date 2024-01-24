import {AuthInput} from '@/components/textInput/AuthInput';
import {isValidEmailAddress} from '@/utils/validationUtils';
import React from 'react';
import {TextInputProps, View, ViewStyle} from 'react-native';

interface Props {
  onSubmit: (email?: string, username?: string) => void;
  usernameTextRef: React.MutableRefObject<string>;
  emailTextRef: React.MutableRefObject<string>;
}

export function AccountDiscovery({
  onSubmit,
  usernameTextRef,
  emailTextRef,
}: Props) {
  const validateAndSubmit: TextInputProps['onSubmitEditing'] = e => {
    const text = e.nativeEvent.text;
    let email = '';
    let username = '';
    if (isValidEmailAddress(text)) {
      email = text;
    } else {
      username = text;
    }

    onSubmit(email, username);
  };

  return (
    <View style={outerViewStyle}>
      <View style={inputViewStyle}>
        <AuthInput
          textContentType="emailAddress"
          placeHolder="Email or username"
          onSubmitEditing={validateAndSubmit}
          initialValue={
            emailTextRef.current
              ? emailTextRef.current
              : usernameTextRef.current
          }
        />
      </View>
    </View>
  );
}

const outerViewStyle: ViewStyle = {
  width: '100%',
  alignItems: 'center',
};

const inputViewStyle: ViewStyle = {
  width: '90%',
  gap: 10,
};
