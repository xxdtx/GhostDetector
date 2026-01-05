// _layout.tsx

import { Stack } from 'expo-router';
import React from 'react';

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false, // Hide the top header if you prefer
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="explore" />
    </Stack>
  );
}
