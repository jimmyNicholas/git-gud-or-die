import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { theme } from '../theme';
import { formatTimeRemaining } from '../utils';
import { type Quest } from '../types';

// Props interface
interface QuestCardProps {
  quest: Quest;
  onPress: (quest: Quest) => void;
}

export const QuestCard: React.FC<QuestCardProps> = ({ quest, onPress }) => {
  // Calculate health bar percentage and color based on time remaining
  const getHealthBarData = (
    deadline: string
  ): { percentage: number; color: string } => {
    const timeRemaining = new Date(deadline).getTime() - Date.now();
    const totalTime = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
    const percentage = (timeRemaining / totalTime) * 100;
    const clampedPercentage = Math.max(0, Math.min(100, percentage));

    // Color progression based on urgency
    let color: string = theme.colors.success; // Green
    if (clampedPercentage <= 25) {
      color = theme.colors.error; // Red
    } else if (clampedPercentage <= 50) {
      color = theme.colors.secondaryLight; // Orange
    } else if (clampedPercentage <= 75) {
      color = theme.colors.warning; // Yellow
    }

    return { percentage: clampedPercentage, color };
  };

  const healthBarData = getHealthBarData(quest.deadline);

  return (
    <TouchableOpacity style={styles.questCard} onPress={() => onPress(quest)}>
      <View style={styles.questHeader}>
        <Text style={styles.questTitle}>{quest.title}</Text>
        <Text style={styles.questCountdown}>
          {formatTimeRemaining(quest.deadline)}
        </Text>
      </View>
      <View style={styles.healthBarContainer}>
        <View style={styles.healthBar}>
          <View
            style={[
              styles.healthBarFill,
              {
                width: `${healthBarData.percentage}%`,
                backgroundColor: healthBarData.color,
              },
            ]}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  questCard: {
    ...theme.styles.card,
    marginBottom: theme.spacing.md,
    padding: theme.spacing.md,
  },
  questHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  questTitle: {
    ...theme.styles.text.body,
    flex: 1,
    marginRight: theme.spacing.sm,
  },
  questCountdown: {
    ...theme.styles.text.caption,
    color: theme.colors.secondary,
    fontWeight: theme.typography.fontWeight.semibold,
  },
  healthBarContainer: {
    marginTop: theme.spacing.xs,
  },
  healthBar: {
    height: 8,
    backgroundColor: theme.colors.textDark,
    borderRadius: 4,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  healthBarFill: {
    height: '100%',
    borderRadius: 3,
  },
});
