import { colors } from "@/constants";
import { Feather } from "@expo/vector-icons";
import { router, Stack } from "expo-router";
import { Pressable } from "react-native";

export default function ProfileLayout() {
  return (
    <Stack
      screenOptions={{
        contentStyle: { backgroundColor: colors.WHITE },
        headerTintColor: colors.BLACK,
      }}
    >
      <Stack.Screen
        name="[id]"
        options={{
          headerBackButtonDisplayMode: "minimal",
          headerShadowVisible: false,
          headerShown: true,
          headerTitle: "",
          headerLeft: () => (
            <Pressable onPress={() => router.back()}>
              <Feather name="arrow-left" size={28} color={colors.BLACK} />
            </Pressable>
          ),
        }}
      />
      <Stack.Screen
        name="update"
        options={{
          headerBackButtonDisplayMode: "minimal",
          headerShadowVisible: false,
          headerShown: true,
          headerTitle: "프로필 편집",
          headerLeft: () => (
            <Pressable onPress={() => router.back()}>
              <Feather name="arrow-left" size={28} color={colors.BLACK} />
            </Pressable>
          ),
        }}
      />
      <Stack.Screen
        name="avatar"
        options={{
          headerBackButtonDisplayMode: "minimal",
          headerShadowVisible: false,
          headerShown: true,
          headerTitle: "",
          headerLeft: () => (
            <Pressable onPress={() => router.back()}>
              <Feather name="arrow-left" size={28} color={colors.BLACK} />
            </Pressable>
          ),
        }}
      />
    </Stack>
  );
}
