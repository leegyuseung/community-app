import { colors } from "@/constants";
import useGetInfiniteSearchPosts from "@/hooks/queries/useGetInfiniteSearchPosts";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import { FlatList, Platform, StatusBar, StyleSheet, View } from "react-native";
import FeedItem from "./FeedItem";
import SearchInput from "./SearchInput";

function SearchFeedList() {
  const [keyword, setKeyword] = useState("");
  const [submitKeyword, setSubmitKeyword] = useState("");

  const {
    data: posts,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useGetInfiniteSearchPosts(submitKeyword);

  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleEndReached = () => {
    // 다음페이지가 있고 페칭중이 아니라면 다음페이지 페칭해주기
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refetch();
    setIsRefreshing(false);
  };

  return (
    <>
      <View style={styles.inputContainer}>
        <View style={styles.arrowLeft}>
          <Feather
            name="arrow-left"
            size={28}
            color={colors.BLACK}
            onPress={() => router.back()}
          />
        </View>
        <SearchInput
          autoFocus
          value={keyword}
          onChangeText={(text) => setKeyword(text)}
          placeholder="글 제목 검색"
          onSubmitEditing={() => setSubmitKeyword(keyword)}
          onSubmit={() => setSubmitKeyword(keyword)}
        />
      </View>
      <FlatList
        data={posts?.pages.flat()}
        renderItem={({ item }) => <FeedItem post={item} />}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={styles.contentContainer}
        onEndReached={handleEndReached} // 마지막 도달하면 실행
        onEndReachedThreshold={0.5} // 절반정도 지났을때 데이터 불러오기
        refreshing={isRefreshing}
        onRefresh={handleRefresh}
      />
    </>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 8,
    paddingHorizontal: 16,
    gap: 8,
    backgroundColor: colors.WHITE,
    flexDirection: "row",
    height: 44,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },

  arrowLeft: {
    alignItems: "center",
    justifyContent: "center",
  },

  contentContainer: {
    paddingVertical: 12,
    backgroundColor: colors.GRAY_200,
    gap: 12,
  },
});

export default SearchFeedList;
