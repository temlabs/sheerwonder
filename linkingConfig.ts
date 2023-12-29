import {navigators, screens, stacks} from '@/navigators/config';

export const BASE_PREFIX = 'sheerwonder://';

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
    [screens.AUTHENTICATE_LOGIN]: 'authenticateLogin',
  },
};

export const LOGIN_AUTHENTICATE_URL = `${BASE_PREFIX}authenticateLogin`;
