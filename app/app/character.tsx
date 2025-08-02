import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { theme } from '../theme';

export default function CharacterScreen() {
  return (
    <View style={styles.container}>
      {/* Character Status */}
      <View style={styles.statusSection}>
        <View style={styles.characterCard}>
          <Text style={styles.characterName}>The Undead</Text>
          <Text style={styles.characterStatus}>Status: Alive</Text>
          <Text style={styles.characterCreated}>Created: 2 days ago</Text>
        </View>
      </View>

      {/* Stats Section */}
      <View style={styles.statsSection}>
        <Text style={styles.sectionTitle}>Stats</Text>
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>12</Text>
            <Text style={styles.statLabel}>Quests Completed</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>2</Text>
            <Text style={styles.statLabel}>Days Alive</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>0</Text>
            <Text style={styles.statLabel}>Deaths</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>85%</Text>
            <Text style={styles.statLabel}>Success Rate</Text>
          </View>
        </View>
      </View>

      {/* Actions Section */}
      <View style={styles.actionsSection}>
        <Text style={styles.sectionTitle}>Actions</Text>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionButtonText}>Create New Character</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.dangerButton}>
          <Text style={styles.dangerButtonText}>Reset Character (Death)</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.primary,
    padding: theme.spacing.lg,
  },
  statusSection: {
    marginBottom: theme.spacing.xl,
  },
  characterCard: {
    ...theme.styles.card,
    alignItems: 'center',
    padding: theme.spacing.xl,
  },
  characterName: {
    ...theme.styles.text.title,
    color: theme.colors.accent,
    marginBottom: theme.spacing.sm,
  },
  characterStatus: {
    ...theme.styles.text.body,
    color: theme.colors.success,
    marginBottom: theme.spacing.xs,
  },
  characterCreated: {
    ...theme.styles.text.caption,
    color: theme.colors.textDim,
  },
  statsSection: {
    marginBottom: theme.spacing.xl,
  },
  sectionTitle: {
    ...theme.styles.text.subtitle,
    marginBottom: theme.spacing.md,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.md,
  },
  statCard: {
    ...theme.styles.card,
    flex: 1,
    minWidth: '45%',
    alignItems: 'center',
    padding: theme.spacing.lg,
  },
  statValue: {
    ...theme.styles.text.title,
    color: theme.colors.secondary,
    marginBottom: theme.spacing.xs,
  },
  statLabel: {
    ...theme.styles.text.caption,
    textAlign: 'center',
  },
  actionsSection: {
    gap: theme.spacing.md,
  },
  actionButton: {
    ...theme.styles.button.primary,
  },
  actionButtonText: {
    color: theme.colors.text,
    fontSize: theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.semibold,
  },
  dangerButton: {
    ...theme.styles.button.secondary,
    borderColor: theme.colors.error,
  },
  dangerButtonText: {
    color: theme.colors.error,
    fontSize: theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.semibold,
  },
});
