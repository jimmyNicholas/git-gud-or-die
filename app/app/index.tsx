import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { theme } from '../theme';
import { QuestCard } from '../components';
import { type Quest } from '../types';

export default function TodosScreen() {
  // Sample quest data for testing
  const sampleQuests: Quest[] = [
    {
      id: '1',
      title: 'Complete project proposal',
      deadline: new Date(Date.now() + 17 * 60 * 60 * 1000).toISOString(), // 17 hours from now
      completed: false,
      createdAt: new Date().toISOString(),
    },
    {
      id: '2',
      title: 'Review code changes',
      deadline: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 1 day from now
      completed: false,
      createdAt: new Date().toISOString(),
    },
    {
      id: '3',
      title: 'Update documentation',
      deadline: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days from now
      completed: false,
      createdAt: new Date().toISOString(),
    },
    {
      id: '4',
      title: 'Critical bug fix',
      deadline: new Date(Date.now() + 30 * 60 * 1000).toISOString(), // 30 minutes from now
      completed: false,
      createdAt: new Date().toISOString(),
    },
    {
      id: '5',
      title: 'Team meeting prep',
      deadline: new Date(Date.now() + 8 * 60 * 60 * 1000).toISOString(), // 8 hours from now
      completed: false,
      createdAt: new Date().toISOString(),
    },
  ];

  const handleQuestPress = (quest: Quest) => {
    Alert.alert(
      'Quest Details',
      `Title: ${quest.title}\nDeadline: ${quest.deadline}`
    );
  };

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

      {/* Main Content Area - Quest Cards */}
      <View style={styles.mainContent}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {sampleQuests.map(quest => (
            <QuestCard
              key={quest.id}
              quest={quest}
              onPress={handleQuestPress}
            />
          ))}
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
