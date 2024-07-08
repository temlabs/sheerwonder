import {signUp} from '@/auth/signup';
import {useSignUp} from '@/auth/useSignUp/useSignUp';
import {PrimaryButton} from '@/components/buttons/PrimaryButton';
import {SWTextInput} from '@/components/textInput/SWTextInput';
import colors from '@/theme/colors';
import {gap} from '@/theme/gap';
import {typography} from '@/theme/typography';
import React from 'react';
import {View, ViewStyle, Text, TextInput} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export function SignUpScreen() {
  const insets = useSafeAreaInsets();
  const {values, updateField, errors, validateField, touchField} = useSignUp();

  const handleSignUp = async () => {
    try {
      const res = await signUp(values.username, values.email, values.password);
      console.debug({res: await res.json()});
    } catch (error) {
      console.debug({error});
    }
  };

  return (
    <View style={[container, {paddingTop: insets.top}]}>
      <View style={content}>
        <Text style={typography.h2}>Sign up for sheerwonder</Text>
        <View style={inputsContainer}>
          <View style={inputContainer}>
            <SWTextInput
              label="Username"
              textContentType="username"
              value={values.username}
              onChangeText={t => {
                updateField('username', t);
              }}
              onBlur={() => {
                touchField('username');
                validateField('username', values.username);
              }}
            />
            {!!errors.username ? (
              <Text style={[typography.small, {color: colors.white}]}>
                {errors.username}
              </Text>
            ) : (
              <></>
            )}
          </View>
          <View style={inputContainer}>
            <SWTextInput
              label="Email"
              textContentType="emailAddress"
              value={values.email}
              onChangeText={t => {
                updateField('email', t);
              }}
              onBlur={() => {
                touchField('email');
                validateField('email', values.email);
              }}
            />
            {!!errors.email ? (
              <Text style={[typography.small, {color: colors.white}]}>
                {errors.email}
              </Text>
            ) : (
              <></>
            )}
          </View>
          <View style={inputContainer}>
            <SWTextInput
              label="Password"
              textContentType="password"
              secureTextEntry={true}
              value={values.password}
              onChangeText={t => {
                updateField('password', t);
              }}
              onBlur={() => {
                touchField('password');
                validateField('password', values.password);
              }}
            />
            {!!errors.password ? (
              <Text style={[typography.small, {color: colors.white}]}>
                {errors.password}
              </Text>
            ) : (
              <></>
            )}
          </View>
        </View>
      </View>
      <View style={[buttons, {paddingBottom: insets.bottom + 20}]}>
        <PrimaryButton text="Sign up" onPress={handleSignUp} />
      </View>
    </View>
  );
}

const container: ViewStyle = {
  //   width: '100%',
  //   height: '100%',
  flex: 1,
  justifyContent: 'space-between',

  paddingHorizontal: 16,
};

const content: ViewStyle = {
  gap: 60,
};

const inputsContainer: ViewStyle = {
  gap: 40,
};

const inputContainer: ViewStyle = {
  gap: 4,
};

const buttons: ViewStyle = {
  backgroundColor: 'trnsparent',
};
