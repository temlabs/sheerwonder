import {addPost} from '@/posts/postFunctions';
import {useMutation} from '@tanstack/react-query';

export function useAddPostMutation() {
  const addPostMutation = useMutation({mutationFn: addPost});

  return addPostMutation;
}
