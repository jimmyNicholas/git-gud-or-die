import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Switch,
} from 'react-native';
import { theme } from './theme';

export default function SettingsScreen() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Notification Settings */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Notifications</Text>
        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingLabel}>Quest Deadline Warnings</Text>
            <Text style={styles.settingDescription}>
              Get notified before quests expire
            </Text>
          </View>
          <Switch
            value={true}
            onValueChange={() => {}}
            trackColor={{
              false: theme.colors.border,
              true: theme.colors.secondary,
            }}
            thumbColor={theme.colors.text}
          />
        </View>
        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingLabel}>Character Death Alerts</Text>
            <Text style={styles.settingDescription}>
              Notify when character dies
            </Text>
          </View>
          <Switch
            value={true}
            onValueChange={() => {}}
            trackColor={{
              false: theme.colors.border,
              true: theme.colors.secondary,
            }}
            thumbColor={theme.colors.text}
          />
        </View>
        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingLabel}>Daily Reminders</Text>
            <Text style={styles.settingDescription}>
              Daily check-in reminders
            </Text>
          </View>
          <Switch
            value={false}
            onValueChange={() => {}}
            trackColor={{
              false: theme.colors.border,
              true: theme.colors.secondary,
            }}
            thumbColor={theme.colors.text}
          />
        </View>
      </View>

      {/* App Settings */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>App Settings</Text>
        <TouchableOpacity style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingLabel}>Theme</Text>
            <Text style={styles.settingDescription}>Dark Souls (Default)</Text>
          </View>
          <Text style={styles.settingValue}>›</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingLabel}>Sound Effects</Text>
            <Text style={styles.settingDescription}>
              Death sounds and alerts
            </Text>
          </View>
          <Text style={styles.settingValue}>›</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingLabel}>Haptic Feedback</Text>
            <Text style={styles.settingDescription}>Vibration on actions</Text>
          </View>
          <Text style={styles.settingValue}>›</Text>
        </TouchableOpacity>
      </View>

      {/* About Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About</Text>
        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingLabel}>Version</Text>
            <Text style={styles.settingDescription}>Git Gud or Die</Text>
          </View>
          <Text style={styles.settingValue}>1.0.0</Text>
        </View>
        <TouchableOpacity style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingLabel}>Privacy Policy</Text>
            <Text style={styles.settingDescription}>
              Read our privacy policy
            </Text>
          </View>
          <Text style={styles.settingValue}>›</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingLabel}>Terms of Service</Text>
            <Text style={styles.settingDescription}>Read our terms</Text>
          </View>
          <Text style={styles.settingValue}>›</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.primary,
    padding: theme.spacing.lg,
  },
  section: {
    marginBottom: theme.spacing.xl,
  },
  sectionTitle: {
    ...theme.styles.text.subtitle,
    marginBottom: theme.spacing.md,
    color: theme.colors.secondary,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  settingInfo: {
    flex: 1,
  },
  settingLabel: {
    ...theme.styles.text.body,
    marginBottom: theme.spacing.xs,
  },
  settingDescription: {
    ...theme.styles.text.caption,
    color: theme.colors.textDim,
  },
  settingValue: {
    ...theme.styles.text.body,
    color: theme.colors.textDim,
    fontSize: theme.typography.fontSize.lg,
  },
});
