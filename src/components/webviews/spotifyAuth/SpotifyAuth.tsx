import {DrawerNavigationHelpers} from '@/react-navigation/drawer/lib/typescript/@types';
import * as React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {screens} from '@/navigators/config';

export function SpotifyAuth({
  navigation,
}: {
  navigation: DrawerNavigationHelpers;
}): JSX.Element {
  const initiateAuthFlow = (): void => {
    navigation.navigate(screens.AUTH_SPOTIFY);
  };

  return (
    <>
      <TouchableOpacity
        onPress={initiateAuthFlow}
        style={{backgroundColor: 'yellow', height: 100}}>
        <Text>Authoriseeee</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate(screens.LOGOUT_SPOTIFY)}
        style={{backgroundColor: 'yellow', height: 100}}>
        <Text>Log out</Text>
      </TouchableOpacity>
    </>
  );
}
