import {useMutation} from '@tanstack/react-query';
import {addShortPost} from './shortPostFunctions';
import {queryClient} from '@/tanstack/config';
import shortPostQueryKeys from './shortPostQueryKeys';
import {ShortPost, ShortPostDraft} from './shortPostTypes';

export function useAddShortPost() {
  const mutation = useMutation({
    mutationFn: addShortPost,
    mutationKey: ['ADD_SHORT_POST'],
    onMutate: async shortPostDraft => {
      await queryClient.cancelQueries({queryKey: shortPostQueryKeys.all});
      const previousShortPosts = queryClient.getQueryData(
        shortPostQueryKeys.all,
      );

      queryClient.setQueryData<(ShortPost | ShortPostDraft)[]>(
        shortPostQueryKeys.all,
        old => (old ? [...old, shortPostDraft] : [shortPostDraft]),
      );
      return {previousShortPosts};
    },
    onError: (error, shortPostDraft, context) => {
      queryClient.setQueryData(
        shortPostQueryKeys.all,
        context?.previousShortPosts,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: shortPostQueryKeys.all});
    },
  });

  return mutation;
}
