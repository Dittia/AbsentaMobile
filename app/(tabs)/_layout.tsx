import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';
import { ChartBar, FileText, UserCircle2 } from 'lucide-react-native';
import { HapticTab } from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          default: {
            // marginBottom: 10,
          },
        }),
      }}>
      <Tabs.Screen
        name = "dashboard"
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ color }) => <ChartBar color={color} />
        }}
      />
        <Tabs.Screen
          name="report"
          options={{
            title: 'Report',
            tabBarIcon: ({ color }) => <FileText color={color} />
          }}
        />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <UserCircle2 color={color} />
        }}
      />
    </Tabs>
  );
}
