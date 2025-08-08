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
import { type Quest } from '../types';
import CountdownTimer from './CountdownTimer';
import { HealthBar } from './HealthBar';
import { useCountdownTimer } from '../hooks/useCountdownTimer';

// Props interface
interface QuestCardProps {
  quest: Quest;
  onUpdate?: (
    questId: string,
    updates: { title?: string; description?: string }
  ) => void;
  onDelete?: (questId: string) => void;
  onExpand?: (questId: string) => void;
  onCancel?: () => void;
  isExpanded: boolean;
}

export const QuestCard: React.FC<QuestCardProps> = ({
  quest,
  onUpdate,
  onDelete,
  onExpand,
  onCancel,
  isExpanded,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(quest.title);
  const [editDescription, setEditDescription] = useState(
    quest.description || ''
  );

  const timeRemaining = useCountdownTimer(quest.deadline);

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
          <CountdownTimer timeRemaining={timeRemaining} />
        </Text>
      </TouchableOpacity>

      {/* Health Bar */}
      <HealthBar deadline={quest.deadline} createdAt={quest.createdAt} timeRemaining={timeRemaining}/>

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
              <>
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={handleEditPress}
                >
                  <Text style={styles.actionButtonText}>Edit</Text>
                </TouchableOpacity>
                {onDelete && (
                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => onDelete(quest.id)}
                  >
                    <Text style={styles.deleteButtonText}>Delete</Text>
                  </TouchableOpacity>
                )}
              </>
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
  deleteButton: {
    flex: 1,
    backgroundColor: theme.colors.error,
    borderRadius: theme.borderRadius.sm,
    padding: theme.spacing.sm,
    alignItems: 'center',
  },
  deleteButtonText: {
    ...theme.styles.text.body,
    color: theme.colors.text,
    fontWeight: theme.typography.fontWeight.medium,
  },
});
