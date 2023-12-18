import colors from './colors';

export type ThemeColor = (typeof colors)[keyof typeof colors];
