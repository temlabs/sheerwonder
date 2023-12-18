import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {DiscoverScreen} from '@/screens/discover/screens/DiscoverScreen';

const Stack = createNativeStackNavigator();
export function DiscoverStack(): JSX.Element {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Discover" component={DiscoverScreen} />
    </Stack.Navigator>
  );
}
