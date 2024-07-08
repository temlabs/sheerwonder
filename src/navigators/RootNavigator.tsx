import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {TabNavigator} from './TabNavigator';
import {SpotifyLoginModal} from '@/components/spotifyBanner/SpotifyLoginModal';
import React from 'react';
import {SpotifyLogoutModal} from '@/components/spotifyBanner/SpotifyLogoutModal';
import {View} from 'react-native';
import {CreateShortPostSearch} from '@/screens/root/modals/CreateShortPostSearch';
import {navigators, screens} from './config';
import {CreateShortPostSelectRange} from '@/screens/root/modals/CreateShortPostSelectRange';
import colors from '@/theme/colors';
import {RootStackParamList} from './types';
import {CreateShortPostWrite} from '@/screens/root/modals/CreateShortPostWrite';
import {LoginScreen} from '@/screens/root/screens/loginScreen/LoginScreen';
import {AuthenticateLoginScreen} from '@/screens/root/screens/AuthenticateLoginScreen';
import {useStytchSession} from '@stytch/react-native';
import {SignUpScreen} from '@/screens/root/screens/signUpScreen/SignUpScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  const {session, fromCache} = useStytchSession();
  const isSignedIn = !!session;

  return (
    <View style={{flex: 1}}>
      <Stack.Navigator
        initialRouteName={
          isSignedIn ? navigators.BOTTOM_TAB_NAVIGATOR : screens.SIGN_UP
        }
        screenOptions={{headerShown: false}}>
        {isSignedIn ? (
          <>
            <Stack.Screen
              name={navigators.BOTTOM_TAB_NAVIGATOR}
              component={TabNavigator}
              options={{contentStyle: {backgroundColor: 'transparent'}}}
            />
            <Stack.Screen
              name={screens.SPOTIFY_LOGIN_MODAL}
              component={SpotifyLoginModal}
              options={{
                presentation: 'transparentModal',
                animation: 'fade',
                contentStyle: {opacity: 1},
              }}
            />
            <Stack.Screen
              name={screens.SPOTIFY_LOGOUT_MODAL}
              component={SpotifyLogoutModal}
              options={{
                presentation: 'transparentModal',
                animation: 'fade',
                contentStyle: {opacity: 1},
              }}
            />
            <Stack.Screen
              name={screens.CREATE_SHORT_POST_SEARCH}
              component={CreateShortPostSearch}
              options={{
                presentation: 'containedTransparentModal',
                animation: 'fade',
                contentStyle: {opacity: 1, backgroundColor: 'rgba(0, 0, 0, 1)'},
              }}
            />
            <Stack.Screen
              name={screens.CREATE_SHORT_POST_SELECT_RANGE}
              component={CreateShortPostSelectRange}
              options={{
                presentation: 'containedTransparentModal',
                animation: 'fade',
                contentStyle: {opacity: 1, backgroundColor: 'rgba(0, 0, 0, 1)'},
                headerShown: true,
                headerTitle: 'Select a range',
                headerTransparent: true,
                headerTintColor: colors.TEXT_PRIMARY,
              }}
            />
            <Stack.Screen
              name={screens.CREATE_SHORT_POST_WRITE}
              component={CreateShortPostWrite}
              options={{
                presentation: 'containedTransparentModal',
                animation: 'fade',
                contentStyle: {opacity: 1, backgroundColor: 'rgba(0, 0, 0, 1)'},
                headerShown: true,
                headerTitle: 'Write your post',
                headerTransparent: true,
                headerTintColor: colors.TEXT_PRIMARY,
              }}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name={screens.SIGN_UP}
              component={SignUpScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name={screens.LOGIN}
              component={LoginScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name={screens.AUTHENTICATE_LOGIN}
              component={AuthenticateLoginScreen}
              options={{
                headerShown: false,
              }}
            />
          </>
        )}
      </Stack.Navigator>
    </View>
  );
}

export default RootNavigator;
