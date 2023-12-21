import {LinearGradientBackground} from '@/components/LinearGradientBackground';
import colors from '@/theme/colors';
import React from 'react';
import {ViewStyle} from 'react-native';

function Background() {
  return (
    <LinearGradientBackground
      x1={100}
      style={gradientBackgroundStyle}
      stops={[
        {offset: 0, opacity: 0.2, color: colors.PRIMARY},
        {offset: 100, opacity: 0.2, color: colors.TERTIARY},
      ]}
    />
  );
}

const gradientBackgroundStyle: ViewStyle = {
  position: 'absolute',
  //   flex: 1,
  height: '100%',
  width: '100%',
  backgroundColor: 'black',
};

export default React.memo(Background);
