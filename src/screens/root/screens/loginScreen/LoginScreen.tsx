import {HeroText} from '@/components/text/HeroText';
import {AuthInput} from '@/components/textInput/AuthInput';
import {useStytch} from '@stytch/react-native';
import {LOGIN_AUTHENTICATE_URL} from 'linkingConfig';
import React from 'react';
import {
  View,
  ViewStyle,
  Text,
  TextInputProps,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from 'react-native';
import {checkUserExists} from '@/auth/authFunctions';

export function LoginScreen() {
  return (
    <ScrollView contentContainerStyle={scrollViewStyle}>
      <View style={containerViewStyle}>
        <HeroText
          text="A world of wonder awaits
      "
        />
        <View style={inputViewStyle}>
          <AuthInput
            textContentType="emailAddress"
            placeHolder="Enter your email"
            onSubmitEditing={checkUserExists}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const containerViewStyle: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
  flex: 1,
  gap: 60,
  width: '100%',
};

const scrollViewStyle: ViewStyle = {
  width: '100%',
  height: '100%',
};

const inputViewStyle: ViewStyle = {
  width: '70%',
};
