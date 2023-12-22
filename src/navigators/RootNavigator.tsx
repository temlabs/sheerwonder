import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {TabNavigator} from './TabNavigator';
import {SpotifyLoginModal} from '@/components/spotifyBanner/SpotifyLoginModal';
import React from 'react';
import {SpotifyLogoutModal} from '@/components/spotifyBanner/SpotifyLogoutModal';
import {LinearGradientBackground} from '@/components/LinearGradientBackground';
import {View, ViewStyle} from 'react-native';
import colors from '@/theme/colors';
import Background from './components/Background';
import {CreateShortPost} from '@/components/modals/createShortPost/CreateShortPost';

const Stack = createNativeStackNavigator();

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
        <Stack.Screen
          name="CreateShortPostModal"
          component={CreateShortPost}
          options={{
            presentation: 'card',
            animation: 'fade',
            contentStyle: {opacity: 1},
          }}
        />
      </Stack.Navigator>
    </View>
  );
}

export default RootNavigator;
