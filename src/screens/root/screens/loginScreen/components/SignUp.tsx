import {SignUpParams} from '@/auth/authTypes';
import {ActionButton} from '@/components/buttons/ActionButton';
import {AuthInput} from '@/components/textInput/AuthInput';
import {instructionTextStyle} from '@/theme/textStyles';
import React, {useRef, useState} from 'react';
import {
  NativeSyntheticEvent,
  Text,
  TextInput,
  TextInputSubmitEditingEventData,
  View,
  ViewStyle,
} from 'react-native';

interface Props {
  onSubmit: (signUpParams: SignUpParams) => void;
  usernameTextRef: React.MutableRefObject<string>;
  emailTextRef: React.MutableRefObject<string>;
  goBack: () => void;
}

export function SignUp({
  onSubmit,
  usernameTextRef,
  emailTextRef,
  goBack,
}: Props) {
  const [email, setEmail] = useState<string>(emailTextRef.current);
  const [username, setUsername] = useState<string>(usernameTextRef.current);
  const [password, setPassword] = useState<string>('');

  const handleSubmit = (
    e?: NativeSyntheticEvent<TextInputSubmitEditingEventData>,
  ) => {
    const eventPassword = e?.nativeEvent.text;
    const passwordToSubmit = eventPassword ?? password;
    const canSubmit = !!email && !!username && !!passwordToSubmit;

    canSubmit && onSubmit({email, username, password: passwordToSubmit});
    if (!canSubmit) {
    }
    return;
  };

  const emailRef = useRef<TextInput>(null);
  const usernameRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);

  return (
    <View style={outerViewStyle}>
      <View style={inputViewStyle}>
        <Text style={instructionTextStyle}>
          Welcome to the club. Sign up to get started.
        </Text>
        <AuthInput
          textContentType="emailAddress"
          placeHolder="Email"
          onSubmitEditing={() => usernameRef.current?.focus()}
          ref={emailRef}
          onBlur={e => setEmail(e.nativeEvent.text)}
          initialValue={email}
          autoFocus
        />
        <AuthInput
          textContentType="username"
          placeHolder="Username"
          ref={usernameRef}
          onSubmitEditing={() => passwordRef.current?.focus()}
          onBlur={e => setUsername(e.nativeEvent.text)}
          initialValue={username}
        />
        <AuthInput
          textContentType="password"
          placeHolder="Password"
          onSubmitEditing={handleSubmit}
          ref={passwordRef}
          onBlur={e => setPassword(e.nativeEvent.text)}
          secureTextEntry
        />
        <ActionButton onPress={() => handleSubmit()} text="Sign Up" />
        <ActionButton onPress={goBack} text="Go Back" />
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
