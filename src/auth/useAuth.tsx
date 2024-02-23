import {useStytch} from '@stytch/react-native';
import {useCallback} from 'react';
import {LoginParams, SignUpParams} from './authTypes';
import {login, signUp} from './authFunctions';
import {MAX_STYTCH_SESSION_TIME} from './authConfig';

function useAuth() {
  const stytchClient = useStytch();

  const loginAndAuthenticate = useCallback(
    async (loginParams: LoginParams) => {
      try {
        const tokens = await login(loginParams);

        stytchClient.session.updateSession({
          session_jwt: tokens.sessionJwt,
          session_token: tokens.sessionToken,
        });
        const authenticateRes = await stytchClient.session.authenticate({
          session_duration_minutes: MAX_STYTCH_SESSION_TIME,
        });
      } catch (error) {
        console.debug(error);
        // throw error;
      }
    },
    [stytchClient],
  );

  const signUpAndAuthenticate = useCallback(
    async (signUpParams: SignUpParams) => {
      try {
        const tokens = await signUp(signUpParams);
        stytchClient.session.updateSession({
          session_jwt: tokens.sessionJwt,
          session_token: tokens.sessionToken,
        });
        await stytchClient.session.authenticate({
          session_duration_minutes: MAX_STYTCH_SESSION_TIME,
        });
      } catch (error) {}
    },
    [stytchClient],
  );

  const signOut = useCallback(async () => {
    await stytchClient.session.revoke();
  }, [stytchClient]);

  return {
    loginAndAuthenticate,
    signUpAndAuthenticate,
    signOut,
  };
}

export default useAuth;
