import React from 'react';
import {ViewStyle} from 'react-native';
import {SafeAreaView, StatusBar, useColorScheme} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {TabNavigator} from '@/navigators/TabNavigator';
import colors from '@/theme/colors';
import {QueryClientProvider} from '@tanstack/react-query';
import {queryClient} from '@/tanstack/config';
import {enableFreeze} from 'react-native-screens';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
enableFreeze();
function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle: ViewStyle = {
    // backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    backgroundColor: colors.BACKGROUND,
    flex: 1,
  };

  const rootViewStyle: ViewStyle = {flex: 1};

  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <GestureHandlerRootView style={rootViewStyle}>
          <SafeAreaView style={backgroundStyle}>
            <StatusBar
              // barStyle={isDarkMode ? 'light-content' : 'dark-content'}
              barStyle={'dark-content'}
              // backgroundColor={backgroundStyle.backgroundColor}
              backgroundColor={'transparent'}
            />
            <NavigationContainer
              theme={{
                colors: {
                  background: colors.BACKGROUND,
                  primary: '',
                  card: '',
                  text: '',
                  border: '',
                  notification: '',
                },
                dark: false,
              }}>
              <TabNavigator />
            </NavigationContainer>
          </SafeAreaView>
        </GestureHandlerRootView>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}

export default App;
