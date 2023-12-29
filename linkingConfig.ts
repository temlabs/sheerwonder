import {navigators, screens, stacks} from '@/navigators/config';

export const linkingConfig = {
  screens: {
    [navigators.BOTTOM_TAB_NAVIGATOR]: {
      screens: {
        [stacks.HOME]: {
          screens: {
            [screens.HOME]: '',
            [screens.SHORT_POST]: 'shortPost/:shortPostId',
          },
        },
      },
    },
  },
};
