import {ShortPost, ShortPostDraft} from './shortPostTypes';

export const isShortPostDraft = (
  shortPost: ShortPost | ShortPostDraft,
): shortPost is ShortPostDraft => {
  if ('track' in shortPost) {
    return true;
  }
  return false;
};
