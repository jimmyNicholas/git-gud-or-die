import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { theme } from './theme';

export default function TodosScreen() {
  return (
    <View style={styles.container}>
      {/* Top Section - New Task Button and Controls */}
      <View style={styles.topSection}>
        <TouchableOpacity style={styles.newTaskButton} onPress={() => {}}>
          <Text style={styles.newTaskButtonText}>+ New Quest</Text>
        </TouchableOpacity>
        <View style={styles.controlsSection}>
          <TouchableOpacity style={styles.controlButton}>
            <Text style={styles.controlButtonText}>Sort</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.controlButton}>
            <Text style={styles.controlButtonText}>Filter</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Main Content Area - Task Cards */}
      <View style={styles.mainContent}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Placeholder Task Cards */}
          <View style={styles.taskCard}>
            <Text style={styles.taskTitle}>Complete project proposal</Text>
            <Text style={styles.taskDeadline}>Due: 2 hours</Text>
          </View>
          <View style={styles.taskCard}>
            <Text style={styles.taskTitle}>Review code changes</Text>
            <Text style={styles.taskDeadline}>Due: 1 day</Text>
          </View>
          <View style={styles.taskCard}>
            <Text style={styles.taskTitle}>Update documentation</Text>
            <Text style={styles.taskDeadline}>Due: 3 days</Text>
          </View>
        </ScrollView>
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
  topSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  newTaskButton: {
    ...theme.styles.button.primary,
  },
  newTaskButtonText: {
    color: theme.colors.text,
    fontSize: theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.semibold,
  },
  mainContent: {
    flex: 1,
  },
  taskCard: {
    ...theme.styles.card,
    marginBottom: theme.spacing.md,
  },
  taskTitle: {
    ...theme.styles.text.body,
    marginBottom: theme.spacing.xs,
  },
  taskDeadline: {
    ...theme.styles.text.caption,
    color: theme.colors.warning,
  },
  controlsSection: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  controlButton: {
    ...theme.styles.button.secondary,
    paddingVertical: theme.spacing.sm,
  },
  controlButtonText: {
    color: theme.colors.text,
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.medium,
  },
});
