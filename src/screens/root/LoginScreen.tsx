import {HeroText} from '@/components/text/HeroText';
import {AuthInput} from '@/components/textInput/AuthInput';
import {useStytch} from '@stytch/react-native';
import {LOGIN_AUTHENTICATE_URL} from 'linkingConfig';
import React from 'react';
import {View, ViewStyle, Text, TextInputProps} from 'react-native';

export function LoginScreen() {
  const stytchClient = useStytch();
  const sendMagicLinkEmail: TextInputProps['onSubmitEditing'] = e => {
    const email = e.nativeEvent.text;
    stytchClient.magicLinks.email.send(email, {
      login_magic_link_url: LOGIN_AUTHENTICATE_URL,
      login_expiration_minutes: 60,
    });
  };

  return (
    <View style={containerViewStyle}>
      <HeroText
        text="A world of wonder awaits
      "
      />
      <View style={inputViewStyle}>
        <AuthInput
          placeHolder="Enter your email"
          onSubmitEditing={sendMagicLinkEmail}
        />
      </View>
    </View>
  );
}

const containerViewStyle: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
  flex: 1,
  gap: 60,
  width: '100%',
};

const inputViewStyle: ViewStyle = {
  width: '70%',
};
