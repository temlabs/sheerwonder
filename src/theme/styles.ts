import {StyleSheet, ViewStyle} from 'react-native';
import colors from '@/theme/colors';

interface Styles {
  flexRowJustBetweenBase: ViewStyle;
  flexRowJustBetweenCent: ViewStyle;
  flexRowStartCent: ViewStyle;
  flexColJustStartCent: ViewStyle;
  gap1: ViewStyle;
  gap2: ViewStyle;
  gap3: ViewStyle;
}

export const styles = StyleSheet.create<Styles>({
  flexColJustStartCent: {
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    width: '100%',
  },
  flexRowJustBetweenBase: {
    alignItems: 'baseline',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  flexRowJustBetweenCent: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  flexRowStartCent: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: '100%',
  },
  gap1: {gap: 2},
  gap2: {gap: 5},
  gap3: {gap: 10},
});
