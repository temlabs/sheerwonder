import {HeroText} from '@/components/text/HeroText';
import {AuthInput} from '@/components/textInput/AuthInput';
import {screens} from '@/navigators/config';
import {RootStackParamList} from '@/navigators/types';
import {RouteProp, useRoute} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useStytch, useStytchSession} from '@stytch/react-native';
import {LOGIN_AUTHENTICATE_URL} from 'linkingConfig';
import React, {useEffect} from 'react';
import {View, ViewStyles, Text, TextInputProps} from 'react-native';

export function AuthenticateLoginScreen({
  navigation,
}: NativeStackScreenProps<
  RootStackParamList,
  typeof screens.AUTHENTICATE_LOGIN
>) {
  const route =
    useRoute<
      RouteProp<RootStackParamList, typeof screens.AUTHENTICATE_LOGIN>
    >();
  const token = route?.params?.token;
  console.debug('token: ', token);

  const stytchClient = useStytch();

  stytchClient.magicLinks.authenticate(token, {
    session_duration_minutes: 60,
  });

  return (
    <>
      <HeroText text="Signing you in" />
    </>
  );
}
