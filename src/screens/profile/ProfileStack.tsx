import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ProfileScreen} from '@/screens/profile/screens/ProfileScreen';
import {ProfileMenu} from './screens/ProfileMenu';
import {screens} from '@/navigators/config';

const Stack = createNativeStackNavigator();
export function ProfileStack(): JSX.Element {
  return (
    <Stack.Navigator initialRouteName={screens.PROFILE_MENU}>
      <Stack.Screen
        name={screens.PROFILE_MENU}
        component={ProfileMenu}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={screens.PROFILE}
        component={ProfileScreen}
        options={{headerShown: true}}
      />
    </Stack.Navigator>
  );
}
