import {useStore} from '@/store/useStore';
import {
  SPOTIFY_BASE_URL,
  REDIRECT_URI,
  CLIENT_ID,
  CLIENT_SECRET,
  SCOPE,
} from './spotifyConfig';
import {AuthTokens, AuthTokensResponse} from './spotifyTypes';
import {queryClient} from '@/tanstack/config';
import {queryKeys} from '@/tanstack/queryKeys';
import {getQueryData} from '@/tanstack/tanstackUtils';
import {QueryFunctionContext} from '@tanstack/react-query';
import {Buffer} from 'buffer';
import {throwSpotifyAuthError} from './spotifyUtils';

export const generateSpotifyLoginUri = (): string => {
  const queryObject = {
    response_type: 'code',
    client_id: CLIENT_ID,
    scope: SCOPE,
    redirect_uri: REDIRECT_URI,
  };
  const queryParams = new URLSearchParams(queryObject);
  const queryString = queryParams.toString();
  return 'https://accounts.spotify.com/authorize?' + queryString;
};

export const extractCode = (query: string): string | null => {
  const codeRegex = /code=([^&]+)/;
  const match = query.match(codeRegex);
  return match ? match[1] : null;
};

export const isSpotifyAccessTokenExpired = (): boolean => {
  const accessTokenQueryState = queryClient.getQueryState(
    queryKeys.SPOTIFY_ACCESS_TOKEN_KEY(),
  );
  const accessTokenIsStale = accessTokenQueryState.isInvalidated;

  return accessTokenQueryState === undefined || accessTokenIsStale;
};

export const isSpotifyAuthenticated = (
  refreshToken?: string,
  accessToken?: string,
): boolean => {
  // do we have a refresh token
  const accessTokenQueryState = queryClient.getQueryState(
    queryKeys.SPOTIFY_ACCESS_TOKEN_KEY(),
  );

  const accessTokenIsNotStale =
    accessTokenQueryState !== undefined && !accessTokenQueryState.isInvalidated;
  const refreshTokenExists =
    !!refreshToken || !!useStore.getState().spotifyRefreshToken;
  const accessTokenExists =
    !!accessToken || !!getQueryData(queryKeys.SPOTIFY_ACCESS_TOKEN_KEY());
  return accessTokenExists && accessTokenIsNotStale && refreshTokenExists;
};

export const fetchAuthorizationTokens = async (
  authCode: string,
): Promise<AuthTokens> => {
  const url = `${SPOTIFY_BASE_URL}/api/token`;

  const encodedKeys = Buffer.from(CLIENT_ID + ':' + CLIENT_SECRET).toString(
    'base64',
  );

  const formData = {
    code: authCode,
    redirect_uri: REDIRECT_URI,
    grant_type: 'authorization_code',
  };

  const body = Object.keys(formData)
    .map(
      key => encodeURIComponent(key) + '=' + encodeURIComponent(formData[key]),
    )
    .join('&');

  const headers = {
    'content-type': 'application/x-www-form-urlencoded',
    Authorization: 'Basic ' + encodedKeys,
  };

  const res = await fetch(url, {method: 'POST', headers, body});
  const resData = (await res.json()) as unknown as AuthTokensResponse;
  throwSpotifyAuthError(resData);
  const authTokens: AuthTokens = {
    accessToken: resData.access_token,
    scope: resData.scope,
    expiresIn: resData.expires_in,
    refreshToken: resData.refresh_token,
  };
  return authTokens;
};

const refreshAccessToken = async (refreshtoken: string) => {
  const url = `${SPOTIFY_BASE_URL}/api/token`;
  const encodedKeys = Buffer.from(CLIENT_ID + ':' + CLIENT_SECRET).toString(
    'base64',
  );

  const formData = {
    refresh_token: refreshtoken,
    grant_type: 'refresh_token',
  };

  const body = Object.keys(formData)
    .map(
      key => encodeURIComponent(key) + '=' + encodeURIComponent(formData[key]),
    )
    .join('&');

  const headers = {
    'content-type': 'application/x-www-form-urlencoded',
    Authorization: 'Basic ' + encodedKeys,
  };

  const res = await fetch(url, {method: 'POST', headers, body});
  const resData = (await res.json()) as unknown as AuthTokensResponse;
  throwSpotifyAuthError(resData);

  const authTokens: AuthTokens = {
    accessToken: resData.access_token,
    scope: resData.scope,
    expiresIn: resData.expires_in,
    refreshToken: resData.refresh_token,
  };
  console.log('returning');
  return authTokens;
};

export const fetchAccessToken = async ({
  queryKey,
}: QueryFunctionContext<
  ReturnType<typeof queryKeys.SPOTIFY_ACCESS_TOKEN_KEY>
>): Promise<string> => {
  // check if we're signed in. if not, throw error
  const [, authCodeArg] = queryKey;
  const authCode = authCodeArg ?? useStore.getState().spotifyAuthCode;
  const refreshToken = useStore.getState().spotifyRefreshToken;

  const authenticated = isSpotifyAuthenticated();
  console.log('fetching access token: ', {
    gotAuthCode: !!authCode,
    gotRefreshToken: !!refreshToken,
    authenticated,
    expired: isSpotifyAccessTokenExpired(),
  });
  if (!authCode && !authenticated) {
    const notSignedIn = new Error('Spotify is not Authenticated');
    notSignedIn.name = 'Spotify not authenticated';
    throw notSignedIn;
  }

  if (!!authCode && !!refreshToken) {
    // refresh token
    try {
      console.log('attempting refresh');
      const tokens = await refreshAccessToken(refreshToken);
      useStore
        .getState()
        .setSpotifyAccessCodeExpiresIn(tokens.expiresIn * 1000);
      return tokens.accessToken;
    } catch (error) {
      return '';
    }
  } else {
    // get initial token
    console.debug('getting intial');

    if (!authCode) {
      const noAuthCodeError = new Error('No auth code to fetch tokens with');
      noAuthCodeError.name = 'No Auth Code';
      throw noAuthCodeError;
    }
    try {
      const tokens = await fetchAuthorizationTokens(authCode);
      useStore
        .getState()
        .setSpotifyAccessCodeExpiresIn(tokens.expiresIn * 1000);
      useStore.getState().setSpotifyRefreshToken(tokens.refreshToken);
      return tokens.accessToken;
    } catch (error) {
      return '';
    }
  }
};

export const removeKeysFromStore = () => {
  // delete authcode
  queryClient.removeQueries({
    queryKey: queryKeys.SPOTIFY_ACCESS_TOKEN_KEY(),
    exact: true,
  });
  useStore.getState().setSpotifyAuthCode('');
  useStore.getState().setSpotifyAccessCodeExpiresIn(0);
  useStore.getState().setSpotifyRefreshToken('');
  // delete refresh token
  // access token
};
