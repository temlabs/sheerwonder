import * as React from 'react';
import {View, Text, ViewStyle, TextStyle} from 'react-native';
import {DrawerContentScrollView} from '@/react-navigation/drawer';
import {DrawerContentComponentProps} from '@/react-navigation/drawer';
import colors from '@/theme/colors';
import {LinkButton} from '@/components/buttons/LinkButton';
import {styles} from '@/theme/styles';
import {Add} from '@/components/icons/Add';
import {SpotifyAuth} from '@/components/webviews/spotifyAuth/SpotifyAuth';

export function HomeDrawerContent(
  props: DrawerContentComponentProps,
): JSX.Element {
  return (
    <>
      <View style={backgroundViewStyle} />
      <DrawerContentScrollView
        {...props}
        style={scrollViewStyle}
        contentContainerStyle={scrollViewContainerStyle}>
        {/* <DrawerItemList {...props} /> */}

        <Text style={drawerHeaderText}>DEFAULT LIST</Text>

        <View style={defaultListViewStyle}>
          <Text style={listTextStyle}>Liked songs</Text>
          <LinkButton text="Change" onPress={() => {}} />
        </View>
        <View
          style={{
            ...styles.flexRowJustBetweenCent,
            marginTop: 60,
          }}>
          <Text style={drawerHeaderText}>ALL LISTS</Text>
          <Add width={20} height={20} fill={colors.PRIMARY} />
        </View>

        <View style={styles.gap3}>
          <Text style={listTextStyle}>Following</Text>
          <Text style={listTextStyle}>Deep focus</Text>
          <Text style={listTextStyle}>Discover Weekly</Text>
          <Text style={listTextStyle}>Hillsong</Text>
          <Text style={listTextStyle}>Close friends</Text>
        </View>

        <SpotifyAuth navigation={props.navigation} />
      </DrawerContentScrollView>
    </>
  );
}

const scrollViewStyle: ViewStyle = {
  backgroundColor: 'transparent',
  paddingHorizontal: 30,
  paddingVertical: 20,
};

const scrollViewContainerStyle: ViewStyle = {};

const backgroundViewStyle: ViewStyle = {
  position: 'absolute',
  // backgroundColor: 'black',
  // opacity: 0.5,
  width: '100%',
  height: '100%',
};

const drawerHeaderText: TextStyle = {
  color: colors.TEXT_GRAY,
  fontSize: 10,
  fontWeight: 'bold',
  flexShrink: 1,
};

const defaultListViewStyle: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'baseline',
  width: '100%',
};

const otherListViewStyle: ViewStyle = {
  gap: 10,
  width: '100%',
};

const listTextStyle: TextStyle = {
  color: colors.TEXT_WHITE,
  fontSize: 24,
};
