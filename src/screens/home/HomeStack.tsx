import * as React from 'react';
import {View, ViewStyle} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {defaultStackNavigatorOptions, screens} from '@/navigators/config';
import {EditFeedScreen} from './screens/EditFeedScreen';
import {StoryScreen} from './screens/storyScreen/StoryScreen';
import {AuthSpotifyResultScreen} from './screens/authSpotifyScreen/AuthSpotifyResultScreen';
import {HomeScreen} from './screens/homeScreen/HomeScreen';
import {ShortPostScreen} from './screens/ShortPostScreen';

const Stack = createNativeStackNavigator();

export function HomeStack(): JSX.Element {
  return (
    <View style={{flex: 1, backgroundColor: 'transparent'}}>
      <Stack.Navigator
        initialRouteName={screens.HOME}
        screenOptions={defaultStackNavigatorOptions}>
        <Stack.Screen name={screens.HOME} component={HomeScreen} />
        <Stack.Screen name={screens.EDIT_FEED} component={EditFeedScreen} />
        <Stack.Screen<typeof screens.SHORT_POST>
          name={screens.SHORT_POST}
          component={ShortPostScreen}
          options={{
            headerShown: true,
            headerTitle: 'Post',
            headerStyle: {backgroundColor: 'transparent'},
            headerShadowVisible: false,
          }}
        />

        <Stack.Screen<typeof screens.STORY>
          name={screens.STORY}
          component={StoryScreen}
          options={{
            headerShown: true,
            headerTitle: '',
            headerTransparent: true,
            headerStyle: {backgroundColor: 'transparent'},
            headerShadowVisible: false,
          }}
        />
        <Stack.Screen<typeof screens.AUTH_SPOTIFY_RESULT>
          name={screens.AUTH_SPOTIFY_RESULT}
          component={AuthSpotifyResultScreen}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </View>
  );
}

const gradientBackgroundStyle: ViewStyle = {
  position: 'absolute',
  height: '100%',
  width: '100%',
  backgroundColor: 'black',
  // zIndex: 0,
};
