import { colors } from "@/constants";
import { Stack } from "expo-router";

export default function ImageLayout() {
  return (
    <Stack
      screenOptions={{
        contentStyle: { backgroundColor: colors.WHITE },
        headerTintColor: colors.BLACK,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
