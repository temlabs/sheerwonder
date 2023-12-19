import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {TabNavigator} from './TabNavigator';
import {SpotifyLoginModal} from '@/components/spotifyBanner/SpotifyLoginModal';
import React from 'react';
import {SpotifyLogoutModal} from '@/components/spotifyBanner/SpotifyLogoutModal';

const Stack = createNativeStackNavigator();

function RootNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Tab"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Tab" component={TabNavigator} />
      <Stack.Screen
        name="SpotifyLoginModal"
        component={SpotifyLoginModal}
        options={{
          presentation: 'transparentModal',
          animation: 'fade',
          contentStyle: {opacity: 1},
        }}
      />
      <Stack.Screen
        name="SpotifyLogoutModal"
        component={SpotifyLogoutModal}
        options={{
          presentation: 'transparentModal',
          animation: 'fade',
          contentStyle: {opacity: 1},
        }}
      />
    </Stack.Navigator>
  );
}

export default RootNavigator;
