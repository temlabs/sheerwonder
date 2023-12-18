import {SpotifyError} from './spotifyTypes';

export const getError = async (errorResponse: {
  error: SpotifyError;
}): Promise<void> => {
  const status = errorResponse.error.status;
  const message = errorResponse.error.message;
  switch (status) {
    case 401: {
      const badTokenError = new Error(message);
      badTokenError.name = 'Bad or expired token';
      throw badTokenError;
      break;
    }
    case 403: {
      const badAuthError = new Error(message);
      badAuthError.name = 'Bad OAuth request';
      throw badAuthError;
      break;
    }
    case 429: {
      const rateLimitError = new Error(message);
      rateLimitError.name = 'Exceeded rate limits';
      throw rateLimitError;
      break;
    }
    default:
      break;
  }
};

export const throwSpotifyAuthError = (errorResponse: unknown) => {
  if (typeof errorResponse !== 'object') {
    return;
  }
  if (
    'error_description' in errorResponse &&
    typeof errorResponse.error_description === 'string'
  ) {
    const exception = new Error(errorResponse.error_description);
    if ('error' in errorResponse && typeof errorResponse.error === 'string')
      exception.name = errorResponse.error;
    throw exception;
  }
};
