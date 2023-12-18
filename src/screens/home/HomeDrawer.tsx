import * as React from 'react';
import {HomeScreen} from '@/screens/home/screens/homeScreen/HomeScreen';
import {defaultDrawerNavigatorOptions, screens} from '@/navigators/config';
import {createDrawerNavigator} from '@/react-navigation/drawer';
import {HomeDrawerContent} from './drawer/HomeDrawerContent';
import {AuthSpotifyScreen} from './screens/authSpotifyScreen/AuthSpotifyScreen';
import {LogoutSpotifyScreen} from './screens/authSpotifyScreen/LogoutSpotifyScreen';

const Drawer = createDrawerNavigator();

export function HomeDrawer(): JSX.Element {
  return (
    <Drawer.Navigator
      drawerContent={props => <HomeDrawerContent {...props} />}
      initialRouteName={screens.HOME}
      detachInactiveScreens={true}
      screenOptions={{
        ...defaultDrawerNavigatorOptions,
      }}>
      <Drawer.Screen name={screens.HOME} component={HomeScreen} />
      <Drawer.Screen
        name={screens.AUTH_SPOTIFY}
        component={AuthSpotifyScreen}
        options={{unmountOnBlur: true}}
      />
      <Drawer.Screen
        name={screens.LOGOUT_SPOTIFY}
        component={LogoutSpotifyScreen}
        options={{unmountOnBlur: true}}
      />
    </Drawer.Navigator>
  );
}
