import {signUp} from '@/auth/signup';
import {useLogin} from '@/auth/useLogin/useLogin';
import {useSignUp} from '@/auth/useSignUp/useSignUp';
import {Button} from '@/components/buttons/Button';
import {PrimaryButton} from '@/components/buttons/PrimaryButton';
import {SWTextInput} from '@/components/textInput/SWTextInput';
import {screens} from '@/navigators/config';
import {RootScreenProps} from '@/screens/types';
import colors from '@/theme/colors';
import {gap} from '@/theme/gap';
import {typography} from '@/theme/typography';
import {BackdropBlur, Canvas, Fill, Rect} from '@shopify/react-native-skia';
import React from 'react';
import {
  View,
  ViewStyle,
  Text,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  Keyboard,
  Pressable,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export function LoginScreen({
  navigation,
}: RootScreenProps<typeof screens.LOGIN>) {
  const insets = useSafeAreaInsets();
  const dimensions = useWindowDimensions();
  const {
    values,
    updateField,
    errors,
    touched,
    checkErrors,
    checkTouched,
    validateField,
    touchField,
    setErrors,
  } = useLogin();

  const handleLogIn = async () => {
    try {
      const res = await signUp(values.username, values.email, values.password);
      console.debug({res});
    } catch (error) {
      const e = error as Error;
      const matchingKeys = (['email', 'password', 'username'] as const).filter(
        k => k === e.name,
      );
      const key = matchingKeys.length > 0 ? matchingKeys[0] : undefined;
      if (key) {
        setErrors(errors => ({...errors, [key]: e.message}));
      }
    }
  };

  return (
    <View
      style={[
        container,
        {
          paddingTop: insets.top + 24,
          paddingBottom: insets.bottom + 24,
          zIndex: -1,
        },
      ]}>
      <Pressable
        style={{width: '100%', height: '100%', position: 'absolute'}}
        onPress={() => Keyboard.dismiss()}
      />
      <View style={content}>
        <View
          style={{
            padding: 24,
            gap: 30,
          }}>
          <Text
            style={[
              typography.h2,
              {fontSize: 24, color: 'rgba(255,255,255,1)'},
            ]}>
            Welcome back, explorer
          </Text>

          <View style={inputsContainer}>
            <View style={inputContainer}>
              <SWTextInput
                label="Username"
                textContentType="username"
                value={values.username}
                onChangeText={t => {
                  updateField('username', t);
                  touched.username &&
                    validateField('username', values.username);
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
                label="Password"
                textContentType="password"
                secureTextEntry={true}
                value={values.password}
                onChangeText={t => {
                  updateField('password', t);
                  touched.password &&
                    validateField('password', values.password);
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
      </View>
      <View style={[buttons]}>
        <Button
          label="SIgn in"
          onPress={handleLogIn}
          disabled={
            !checkErrors(['password', 'username']) ||
            !checkTouched(['password', 'username'])
          }
        />
        <Button
          type="link"
          label="Create an account?"
          onPress={() => {
            navigation.navigate(screens.SIGN_UP, {});
          }}
        />
      </View>
    </View>
  );
}

const container: ViewStyle = {
  //   width: '100%',
  //   height: '100%',
  flex: 1,
  justifyContent: 'flex-start',
  alignItems: 'center',
  padding: 24,
  // paddingHorizontal: 30,
  paddingHorizontal: 15,
};

const content: ViewStyle = {
  gap: 60,
  alignSelf: 'center',
  // backgroundColor: 'blue',
  // overflow: 'hidden',

  borderRadius: 24,
  // padding: 16,
  width: '100%',
};

const inputsContainer: ViewStyle = {
  gap: 40,
};

const inputContainer: ViewStyle = {
  gap: 4,
};

const buttons: ViewStyle = {
  backgroundColor: 'trnsparent',
  width: '100%',
  justifyContent: 'flex-end',
  flexGrow: 1,
  gap: 8,
};
