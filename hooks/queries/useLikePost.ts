import { likePost } from "@/api/post";
import queryClient from "@/api/queryClient";
import { queryKeys } from "@/constants";
import { Post, Profile } from "@/types";
import { useMutation } from "@tanstack/react-query";

function useLikePost() {
  return useMutation({
    mutationFn: likePost,
    onMutate: async (postId: number) => {
      await queryClient.cancelQueries({
        queryKey: [queryKeys.POST, queryKeys.GET_POST, postId],
      });

      const previousPost = queryClient.getQueryData<Post>([
        queryKeys.POST,
        queryKeys.GET_POST,
        postId,
      ]);

      const user = queryClient.getQueryData<Profile>([
        queryKeys.AUTH,
        queryKeys.GET_ME,
      ]);

      const userId = Number(user?.id);
      const newPost = { ...previousPost };

      const likedIndex =
        previousPost?.likes.findIndex((like) => like.userId === userId) ?? -1;

      likedIndex >= 0
        ? newPost.likes?.splice(likedIndex, 1)
        : newPost.likes?.push({ userId: userId });

      queryClient.setQueryData(
        [queryKeys.POST, queryKeys.GET_POST, postId],
        newPost
      );

      return { previousPost, newPost };
    },
    onError: (err, newPost, context) => {
      queryClient.setQueryData(
        [queryKeys.POST, queryKeys.GET_POST, context?.previousPost?.id],
        context?.previousPost
      );
    },
    onSettled: (data, error, variables, context) => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.POST, queryKeys.GET_POST, variables],
      });

      queryClient.invalidateQueries({
        queryKey: [queryKeys.POST, queryKeys.GET_POSTS],
      });
    },
  });
}

export default useLikePost;
