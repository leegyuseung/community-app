import CustomButton from "@/components/CustomButton";
import DescriptionInput from "@/components/DescriptionInput";
import TitleInput from "@/components/TitleInput";
import VoteAttached from "@/components/VoteAttached";
import useGetPost from "@/hooks/queries/useGetPost";
import useUpdatePost from "@/hooks/queries/useUpdatePost";
import { ImageUri } from "@/types";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { KeyboardAvoidingView, StyleSheet } from "react-native";

type FormValues = {
  title: string;
  description: string;
  isVoteAttached: boolean;
  imageUris: ImageUri[];
};

export default function PostUpdateScreen() {
  const { id } = useLocalSearchParams();
  const { data: post } = useGetPost(Number(id));

  const navigation = useNavigation();
  const updatePost = useUpdatePost();
  const postForm = useForm<FormValues>();

  useEffect(() => {
    if (post) {
      postForm.reset({
        title: post.title,
        description: post.description,
        isVoteAttached: post.hasVote,
        imageUris: post.imageUris,
      });
    }
  }, [post, postForm]);

  const onSubmit = (formValues: FormValues) => {
    updatePost.mutate(
      {
        id: Number(id),
        body: formValues,
      },
      {
        onSuccess: () => router.back(),
      }
    );
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <CustomButton
          label="저장"
          size="medium"
          variant="standard"
          onPress={postForm.handleSubmit(onSubmit)}
        />
      ),
    });
  });

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="height"
      keyboardVerticalOffset={100}
    >
      <FormProvider {...postForm}>
        <TitleInput />
        <DescriptionInput />
        <VoteAttached />
      </FormProvider>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 16,
    gap: 16,
  },
});
