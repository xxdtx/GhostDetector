// _layout.tsx

import { Stack } from 'expo-router';
import React from 'react';

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false, // Hide the top header
      }}
    />
  );
}
