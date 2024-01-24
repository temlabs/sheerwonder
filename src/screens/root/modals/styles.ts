import colors from '@/theme/colors';
import {StatusBar, ViewStyle} from 'react-native';

export const modalViewStyle: ViewStyle = {
  flex: 1,
  backgroundColor: colors.BACKGROUND,
  paddingHorizontal: 10,
  paddingTop: StatusBar.currentHeight,
};
