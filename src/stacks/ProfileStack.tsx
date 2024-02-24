import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ProfileScreen} from '@/screens/profile/ProfileScreen';
import {ProfileMenu} from '../screens/profileMenu/ProfileMenu';
import {screens} from '@/navigators/config';
import colors from '@/theme/colors';

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
        options={{
          headerShown: true,
          headerTransparent: true,
          headerTintColor: colors.TEXT_PRIMARY,
        }}
      />
    </Stack.Navigator>
  );
}
