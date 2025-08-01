import { Stack, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { theme } from './theme';

export default function RootLayout() {
  const router = useRouter();

  return (
    <>
      <StatusBar style="light" />
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>GGD</Text>
          <View style={styles.navIcons}>
            <TouchableOpacity
              style={styles.navButton}
              onPress={() => router.push('/')}
            >
              <Text style={styles.navIcon}>❗</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.navButton}
              onPress={() => router.push('/character')}
            >
              <Text style={styles.navIcon}>🏹</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.navButton}
              onPress={() => router.push('/settings')}
            >
              <Text style={styles.navIcon}>⚙️</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Main Content */}
        <View style={styles.content}>
          <Stack
            screenOptions={{
              headerShown: false,
              animation: 'none',
            }}
          >
            <Stack.Screen name="index" />
            <Stack.Screen name="character" />
            <Stack.Screen name="settings" />
          </Stack>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.primary,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
    backgroundColor: theme.colors.primaryDark,
  },
  title: {
    ...theme.styles.text.title,
    color: theme.colors.secondary,
    fontWeight: theme.typography.fontWeight.bold,
  },
  navIcons: {
    flexDirection: 'row',
    gap: theme.spacing.md,
    backgroundColor: theme.colors.text,
  },
  navButton: {
    padding: theme.spacing.sm,
  },
  navIcon: {
    fontSize: theme.typography.fontSize.lg,
  },
  content: {
    flex: 1,
  },
});
