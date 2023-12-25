import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {TabNavigator} from './TabNavigator';
import {SpotifyLoginModal} from '@/components/spotifyBanner/SpotifyLoginModal';
import React from 'react';
import {SpotifyLogoutModal} from '@/components/spotifyBanner/SpotifyLogoutModal';
import {View} from 'react-native';
import {CreateShortPostSearch} from '@/screens/root/modals/CreateShortPostSearch';
import {screens} from './config';
import {CreateShortPostSelectRange} from '@/screens/root/modals/CreateShortPostSelectRange';
import colors from '@/theme/colors';
import {RootStackParamList} from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <View style={{flex: 1}}>
      <Stack.Navigator
        initialRouteName="Tab"
        screenOptions={{headerShown: false}}>
        <Stack.Screen
          name="Tab"
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
            presentation: 'transparentModal',
            animation: 'fade',
            contentStyle: {opacity: 1},
          }}
        />
        <Stack.Screen
          name={screens.CREATE_SHORT_POST_SELECT_RANGE}
          component={CreateShortPostSelectRange}
          options={{
            presentation: 'transparentModal',
            animation: 'fade',
            contentStyle: {opacity: 1},
            headerShown: true,
            headerTitle: 'Select a track',
            headerTransparent: true,
            headerTintColor: colors.TEXT_PRIMARY,
          }}
        />
      </Stack.Navigator>
    </View>
  );
}

export default RootNavigator;
