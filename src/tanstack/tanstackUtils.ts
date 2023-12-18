import {queryClient} from './config';
import {QueryKeyTypeMap} from './queryTypes';

export const getQueryData = <K extends keyof QueryKeyTypeMap>(
  queryKey: [K, ...unknown[]],
): QueryKeyTypeMap[K] | undefined => {
  return queryClient.getQueryData(queryKey);
};
