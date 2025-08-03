import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
} from 'react-native';
import { theme } from '../theme';
import { formatTimeRemaining } from '../utils';
import { type Quest } from '../types';

// Props interface
interface QuestCardProps {
  quest: Quest;
  onUpdate?: (
    questId: string,
    updates: { title?: string; description?: string }
  ) => void;
  onExpand?: (questId: string) => void;
  onCancel?: () => void;
  isExpanded: boolean;
}

export const QuestCard: React.FC<QuestCardProps> = ({
  quest,
  onUpdate,
  onExpand,
  onCancel,
  isExpanded,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(quest.title);
  const [editDescription, setEditDescription] = useState(
    quest.description || ''
  );

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

  const handleCardPress = () => {
    if (isEditing) return; // Don't expand if editing
    if (onExpand) {
      onExpand(quest.id);
    }
  };

  const handleEditPress = () => {
    setIsEditing(true);
    setEditTitle(quest.title);
    setEditDescription(quest.description || '');
  };

  const handleSaveEdit = () => {
    if (!editTitle.trim()) {
      Alert.alert('Error', 'Quest title is required');
      return;
    }

    if (onUpdate) {
      onUpdate(quest.id, {
        title: editTitle.trim(),
        description: editDescription.trim() || undefined,
      });
    }

    setIsEditing(false);
    // Card will be collapsed by parent component
  };

  const handleCancelEdit = () => {
    setEditTitle(quest.title);
    setEditDescription(quest.description || '');
    setIsEditing(false);
    if (onCancel) {
      onCancel(); // Notify parent to collapse card
    }
  };

  const healthBarData = getHealthBarData(quest.deadline);

  return (
    <View style={[styles.questCard, isExpanded && styles.questCardExpanded]}>
      {/* Main Quest Info */}
      <TouchableOpacity style={styles.questHeader} onPress={handleCardPress}>
        <View style={styles.questTitleContainer}>
          {isEditing ? (
            <TextInput
              style={styles.questTitleInput}
              value={editTitle}
              onChangeText={setEditTitle}
              placeholder="Quest title..."
              placeholderTextColor={theme.colors.textDim}
              maxLength={100}
            />
          ) : (
            <Text style={styles.questTitle}>{quest.title}</Text>
          )}
        </View>
        <Text style={styles.questCountdown}>
          {formatTimeRemaining(quest.deadline)}
        </Text>
      </TouchableOpacity>

      {/* Health Bar */}
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

      {/* Expanded Content */}
      {isExpanded && (
        <View style={styles.expandedContent}>
          {/* Description */}
          <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionLabel}>Description:</Text>
            {isEditing ? (
              <TextInput
                style={styles.descriptionInput}
                value={editDescription}
                onChangeText={setEditDescription}
                placeholder="Add description..."
                placeholderTextColor={theme.colors.textDim}
                multiline
                numberOfLines={3}
                maxLength={500}
              />
            ) : (
              <Text style={styles.descriptionText}>
                {quest.description || 'No description'}
              </Text>
            )}
          </View>

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            {isEditing ? (
              <>
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={handleCancelEdit}
                >
                  <Text style={styles.actionButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.saveButton}
                  onPress={handleSaveEdit}
                >
                  <Text style={styles.saveButtonText}>Save</Text>
                </TouchableOpacity>
              </>
            ) : (
              <TouchableOpacity
                style={styles.actionButton}
                onPress={handleEditPress}
              >
                <Text style={styles.actionButtonText}>Edit</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  questCard: {
    ...theme.styles.card,
    marginBottom: theme.spacing.md,
    padding: theme.spacing.md,
  },
  questCardExpanded: {
    paddingBottom: theme.spacing.lg,
  },
  questHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  questTitleContainer: {
    flex: 1,
    marginRight: theme.spacing.sm,
  },
  questTitle: {
    ...theme.styles.text.body,
  },
  questTitleInput: {
    ...theme.styles.text.body,
    backgroundColor: theme.colors.primaryLight,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.borderRadius.sm,
    padding: theme.spacing.xs,
    color: theme.colors.text,
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
  expandedContent: {
    marginTop: theme.spacing.md,
    paddingTop: theme.spacing.md,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
  descriptionContainer: {
    marginBottom: theme.spacing.md,
  },
  descriptionLabel: {
    ...theme.styles.text.caption,
    color: theme.colors.textDim,
    marginBottom: theme.spacing.xs,
  },
  descriptionText: {
    ...theme.styles.text.body,
    color: theme.colors.textDim,
  },
  descriptionInput: {
    ...theme.styles.text.body,
    backgroundColor: theme.colors.primaryLight,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.borderRadius.sm,
    padding: theme.spacing.sm,
    color: theme.colors.text,
    textAlignVertical: 'top',
    minHeight: 80,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  actionButton: {
    flex: 1,
    backgroundColor: theme.colors.primaryLight,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.borderRadius.sm,
    padding: theme.spacing.sm,
    alignItems: 'center',
  },
  actionButtonText: {
    ...theme.styles.text.body,
    color: theme.colors.text,
    fontWeight: theme.typography.fontWeight.medium,
  },
  saveButton: {
    flex: 1,
    backgroundColor: theme.colors.secondary,
    borderRadius: theme.borderRadius.sm,
    padding: theme.spacing.sm,
    alignItems: 'center',
  },
  saveButtonText: {
    ...theme.styles.text.body,
    color: theme.colors.text,
    fontWeight: theme.typography.fontWeight.semibold,
  },
});
