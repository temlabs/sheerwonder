import useAuth from '@/auth/useAuth';
import {ActionButton} from '@/components/buttons/ActionButton';
import {Chevron} from '@/components/icons/Chevron';
import colors from '@/theme/colors';
import {profileHeaderStyle, profileMenuTextStyle} from '@/theme/textStyles';
import React from 'react';
import {Text, TouchableOpacity, View, ViewStyle} from 'react-native';

export function ProfileMenu() {
  const {signOut} = useAuth();

  const links: {label: string; onPress: () => void}[] = [
    {label: 'Your Profile', onPress: () => {}},
    {label: 'Notifications', onPress: () => {}},
    {label: 'About sheer wonder', onPress: () => {}},
    {label: 'Submit feedback', onPress: () => {}},
  ];

  return (
    <View style={containerViewStyle}>
      <Text style={profileHeaderStyle}>Hey there!</Text>
      <View style={menuContainer}>
        <View style={linkMenuContainer} key={'menuContainer'}>
          {links.map((link, i) => (
            <>
              <TouchableOpacity
                style={linkRow}
                onPress={link.onPress}
                key={link.label}>
                <Text style={profileMenuTextStyle}>{link.label}</Text>
                <Chevron width={16} height={16} fill={colors.TEXT_SECONDARY} />
              </TouchableOpacity>
              {i !== links.length - 1 ? (
                <View style={divider} key={i.toString()} />
              ) : (
                <></>
              )}
            </>
          ))}
        </View>
        <View style={buttonContainer}>
          <ActionButton text="Sign Out" onPress={signOut} />
        </View>
      </View>
    </View>
  );
}

const containerViewStyle: ViewStyle = {
  gap: 40,
  width: '95%',
  alignSelf: 'center',
  height: '100%',
};

const linkMenuContainer: ViewStyle = {
  width: '100%',
  alignSelf: 'center',
  //   gap: 20,
  //   backgroundColor: colors.BACKGROUND_LIGHT,
  borderRadius: 16,
  borderColor: colors.PRIMARY_LIGHT,
  borderWidth: 2,
  paddingVertical: 10,
};

const menuContainer: ViewStyle = {
  gap: 50,
  flexGrow: 1,
};

const buttonContainer: ViewStyle = {
  flexGrow: 1,
};

const linkRow: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'space-between',
  width: '100%',
  paddingHorizontal: 15,
  paddingVertical: 10,
  alignItems: 'center',
};

const divider: ViewStyle = {
  alignSelf: 'center',
  height: 2,
  backgroundColor: colors.NEUTRAL_GREY,
  opacity: 0.2,
  width: '90%',
};
