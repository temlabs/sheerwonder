import {LoginHeroText} from '@/screens/root/screens/loginScreen/components/LoginHeroText';
import React, {ReactNode, useRef, useState} from 'react';
import {View, ViewStyle, ScrollView} from 'react-native';
import {checkUserExists} from '@/auth/authFunctions';
import {LoginComponent} from './types';
import {AccountDiscovery} from './components/AccountDiscovery';
import {Login} from './components/Login';
import useAuth from '@/auth/useAuth';
import Animated, {
  FadeIn,
  SlideInRight,
  SlideOutLeft,
} from 'react-native-reanimated';
import {SignUp} from './components/SignUp';

export function LoginScreen() {
  const {loginAndAuthenticate, signUpAndAuthenticate} = useAuth();
  const [loginComponent, setLoginComponent] =
    useState<LoginComponent>('accountDiscovery');
  const email = useRef('');
  const username = useRef('');
  const updateRefsAndCheckUserExists = async (
    emailArg?: string,
    usernameArg?: string,
  ) => {
    email.current = emailArg ?? '';
    username.current = usernameArg ?? '';
    try {
      const userExists = await checkUserExists(emailArg, usernameArg);
      setLoginComponent(userExists ? 'login' : 'signUp');
    } catch (error) {}
  };
  const loginComponents: {[key in LoginComponent]: ReactNode} = {
    accountDiscovery: (
      <Animated.View
        style={componentContainerViewStyle}
        entering={SlideInRight}
        exiting={SlideOutLeft}>
        <AccountDiscovery
          onSubmit={updateRefsAndCheckUserExists}
          key={'accountDiscovery'}
          usernameTextRef={username}
          emailTextRef={email}
        />
      </Animated.View>
    ),
    login: (
      <Animated.View
        style={componentContainerViewStyle}
        entering={SlideInRight}
        exiting={SlideOutLeft}>
        <Login
          onSubmit={password =>
            loginAndAuthenticate({
              email: email.current,
              username: username.current,
              password,
            })
          }
          goBackToAccountDiscovery={() => setLoginComponent('accountDiscovery')}
          goToForgotPassword={() => setLoginComponent('passwordReset')}
        />
      </Animated.View>
    ),
    signUp: (
      <SignUp
        emailTextRef={email}
        usernameTextRef={username}
        onSubmit={signUpAndAuthenticate}
        goBack={() => setLoginComponent('accountDiscovery')}
      />
    ),
  };

  return (
    <ScrollView contentContainerStyle={scrollViewStyle}>
      <View style={containerViewStyle}>
        <Animated.View entering={FadeIn.duration(1000)}>
          <LoginHeroText />
        </Animated.View>
        {loginComponents[loginComponent]}
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
  flex: 1,
};

const componentContainerViewStyle: ViewStyle = {
  width: '100%',
};
