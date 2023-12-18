import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {CommunityScreen} from '@/screens/community/screens/CommunityScreen';

const Stack = createNativeStackNavigator();
export function CommunityStack(): JSX.Element {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Community" component={CommunityScreen} />
    </Stack.Navigator>
  );
}
