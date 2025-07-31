import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { theme } from './theme';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Git Gud or Die</Text>
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...theme.styles.container,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    ...theme.styles.text.title,
  },
  subtitle: {
    ...theme.styles.text.subtitle,
    marginTop: theme.spacing.sm,
  },
});
