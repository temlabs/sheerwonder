import {LinkButton} from '@/components/buttons/LinkButton';
import {AuthInput} from '@/components/textInput/AuthInput';
import {instructionTextStyle} from '@/theme/textStyles';
import React from 'react';
import {Text, TextInputProps, View, ViewStyle} from 'react-native';

interface Props {
  onSubmit: (password: string) => void;
  goBackToAccountDiscovery: () => void;
  goToForgotPassword: () => void;
}

export function Login({
  onSubmit,
  goBackToAccountDiscovery,
  goToForgotPassword,
}: Props) {
  const validateAndSubmit: TextInputProps['onSubmitEditing'] = e => {
    const password = e.nativeEvent.text;
    onSubmit(password);
  };

  return (
    <View style={outerViewStyle}>
      <View style={inputViewStyle}>
        <Text style={instructionTextStyle}>Welcome back explorer</Text>

        <AuthInput
          textContentType="password"
          placeHolder="Password"
          onSubmitEditing={validateAndSubmit}
          secureTextEntry
        />
        <LinkButton
          text="Change email address"
          onPress={goBackToAccountDiscovery}
        />
        <LinkButton text="Forgot password?" onPress={goToForgotPassword} />
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
