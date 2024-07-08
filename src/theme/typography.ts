import {TextStyle} from 'react-native';
import colors from './colors';
const h1: TextStyle = {
  fontSize: 44,
  color: 'white',
  fontFamily: 'Sora-Bold',
};

const h2: TextStyle = {
  fontSize: 28,
  color: 'white',
  fontFamily: 'Sora-Medium',
  fontWeight: '500',
};

const h3: TextStyle = {
  fontSize: 24,
  color: 'white',
  fontFamily: 'Sora-Bold',
};

const p: TextStyle = {
  fontSize: 18,
  color: 'white',
  fontFamily: 'Sora-ExtraLight',
  fontWeight: '200',
};

const small: TextStyle = {
  fontSize: 12,
  color: colors.white,
  fontFamily: 'Sora-ExtraLight',
  fontWeight: '200',
};

export const typography = {
  h1,
  h2,
  h3,
  p,
  small,
};
