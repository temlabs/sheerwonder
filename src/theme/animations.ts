import {LayoutAnimationConfig} from 'react-native';

export const quickSpring: LayoutAnimationConfig = {
  duration: 100,
  create: {type: 'linear', property: 'opacity'},
  update: {type: 'spring', springDamping: 0.9},
  delete: {type: 'linear', property: 'opacity'},
};
