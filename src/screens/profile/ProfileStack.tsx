import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ProfileScreen} from '@/screens/profile/screens/ProfileScreen';

const Stack = createNativeStackNavigator();
export function ProfileStack(): JSX.Element {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
  );
}
