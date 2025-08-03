import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { theme } from '../theme';
import { type Quest, type CreateQuestInput } from '../types';
import { formatDateTime } from '../utils';

interface QuestModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (quest: CreateQuestInput) => void;
  quest?: Quest; // If provided, we're editing; if not, we're creating
}

export const QuestModal: React.FC<QuestModalProps> = ({
  visible,
  onClose,
  onSave,
  quest,
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedDate, setSelectedDate] = useState(
    new Date(Date.now() + 2 * 60 * 60 * 1000)
  ); // Default 2 hours from now
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const isEditing = !!quest;

  // Reset form when modal opens/closes or quest changes
  useEffect(() => {
    if (visible) {
      if (quest) {
        // Editing existing quest
        setTitle(quest.title);
        setDescription(quest.description || '');
        setSelectedDate(new Date(quest.deadline));
      } else {
        // Creating new quest
        setTitle('');
        setDescription('');
        setSelectedDate(new Date(Date.now() + 2 * 60 * 60 * 1000)); // 2 hours from now
      }
    }
  }, [visible, quest]);

  const handleSave = () => {
    if (!title.trim()) {
      Alert.alert('Error', 'Quest title is required');
      return;
    }

    const now = new Date();
    if (selectedDate <= now) {
      Alert.alert('Error', 'Deadline must be in the future');
      return;
    }

    const questData: CreateQuestInput = {
      title: title.trim(),
      description: description.trim() || undefined,
      deadline: selectedDate.toISOString(),
    };

    // Format deadline for confirmation dialog
    const formatDeadlineForConfirmation = (date: Date): string => {
      const now = new Date();
      const diffMs = date.getTime() - now.getTime();
      const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
      const diffHours = Math.floor(
        (diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

      let timeString = '';
      if (diffDays > 0) {
        timeString += `${diffDays}d `;
      }
      if (diffHours > 0) {
        timeString += `${diffHours}h `;
      }
      if (diffMinutes > 0) {
        timeString += `${diffMinutes}m`;
      }

      return `${formatDateTime(date)} (${timeString.trim()} from now)`;
    };

    // Show confirmation dialog for quest creation/editing
    const isCreating = !isEditing;
    const dialogTitle = isCreating
      ? 'Confirm Quest Creation'
      : 'Confirm Quest Update';
    const dialogMessage = isCreating
      ? `Are you sure you want to create this quest?\n\n` +
        `Title: ${questData.title}\n` +
        `Deadline: ${formatDeadlineForConfirmation(selectedDate)}\n\n` +
        `⚠️ WARNING: Missing this deadline will result in character death and quest deletion!`
      : `Are you sure you want to update this quest?\n\n` +
        `Title: ${questData.title}\n` +
        `Deadline: ${formatDeadlineForConfirmation(selectedDate)}\n\n` +
        `⚠️ WARNING: Missing this deadline will result in character death and quest deletion!`;
    const confirmText = isCreating ? 'Create Quest' : 'Update Quest';

    Alert.alert(dialogTitle, dialogMessage, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: confirmText,
        style: 'destructive',
        onPress: () => {
          onSave(questData);
          onClose();
        },
      },
    ]);
  };

  const handleDateChange = (event: unknown, date?: Date) => {
    setShowDatePicker(false);
    if (date) {
      setSelectedDate(date);
    }
  };

  const handleTimeChange = (event: unknown, time?: Date) => {
    setShowTimePicker(false);
    if (time) {
      const newDate = new Date(selectedDate);
      newDate.setHours(time.getHours());
      newDate.setMinutes(time.getMinutes());
      setSelectedDate(newDate);
    }
  };

  const handleCancel = () => {
    Alert.alert(
      'Cancel Quest',
      'Are you sure you want to cancel? Any changes will be lost.',
      [
        { text: 'Keep Editing', style: 'cancel' },
        { text: 'Cancel', style: 'destructive', onPress: onClose },
      ]
    );
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={handleCancel}
    >
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>
            {isEditing ? 'Edit Quest' : 'New Quest'}
          </Text>
          <TouchableOpacity style={styles.closeButton} onPress={handleCancel}>
            <Text style={styles.closeButtonText}>✕</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Title Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Quest Title *</Text>
            <TextInput
              style={styles.textInput}
              value={title}
              onChangeText={setTitle}
              placeholder="Enter quest title..."
              placeholderTextColor={theme.colors.textDim}
              maxLength={100}
            />
          </View>

          {/* Description Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Description (Optional)</Text>
            <TextInput
              style={[styles.textInput, styles.textArea]}
              value={description}
              onChangeText={setDescription}
              placeholder="Enter quest description..."
              placeholderTextColor={theme.colors.textDim}
              multiline
              numberOfLines={4}
              maxLength={500}
            />
          </View>

          {/* Deadline Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Deadline *</Text>

            {/* Date/Time Display */}
            <View style={styles.deadlineDisplay}>
              <Text style={styles.deadlineText}>
                {formatDateTime(selectedDate)}
              </Text>
            </View>

            {/* Date/Time Picker Buttons */}
            <View style={styles.deadlineButtons}>
              <TouchableOpacity
                style={styles.deadlineButton}
                onPress={() => setShowDatePicker(true)}
              >
                <Text style={styles.deadlineButtonText}>📅 Pick Date</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.deadlineButton}
                onPress={() => setShowTimePicker(true)}
              >
                <Text style={styles.deadlineButtonText}>🕐 Pick Time</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>

        {/* Footer */}
        <View style={styles.footer}>
          <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>
              {isEditing ? 'Update Quest' : 'Create Quest'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Date Picker */}
      {showDatePicker && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display="default"
          onChange={handleDateChange}
          minimumDate={new Date()}
        />
      )}

      {/* Time Picker */}
      {showTimePicker && (
        <DateTimePicker
          value={selectedDate}
          mode="time"
          display="default"
          onChange={handleTimeChange}
        />
      )}
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.primary,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  headerTitle: {
    ...theme.styles.text.title,
    color: theme.colors.accent,
  },
  closeButton: {
    padding: theme.spacing.sm,
  },
  closeButtonText: {
    color: theme.colors.text,
    fontSize: theme.typography.fontSize.xl,
    fontWeight: theme.typography.fontWeight.bold,
  },
  content: {
    flex: 1,
    padding: theme.spacing.lg,
  },
  inputGroup: {
    marginBottom: theme.spacing.xl,
  },
  label: {
    ...theme.styles.text.subtitle,
    marginBottom: theme.spacing.sm,
  },
  textInput: {
    backgroundColor: theme.colors.primaryLight,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    color: theme.colors.text,
    fontSize: theme.typography.fontSize.base,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },

  deadlineDisplay: {
    backgroundColor: theme.colors.primary,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    alignItems: 'center',
  },
  deadlineText: {
    ...theme.styles.text.subtitle,
    color: theme.colors.secondary,
    fontWeight: theme.typography.fontWeight.semibold,
  },
  deadlineButtons: {
    flexDirection: 'row',
    gap: theme.spacing.md,
    marginBottom: theme.spacing.lg,
  },
  deadlineButton: {
    flex: 1,
    backgroundColor: theme.colors.primaryLight,
    borderWidth: 1,
    borderColor: theme.colors.secondary,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    alignItems: 'center',
  },
  deadlineButtonText: {
    ...theme.styles.text.body,
    color: theme.colors.secondary,
    fontWeight: theme.typography.fontWeight.medium,
  },
  footer: {
    flexDirection: 'row',
    gap: theme.spacing.md,
    padding: theme.spacing.lg,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: theme.colors.primaryLight,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    alignItems: 'center',
  },
  cancelButtonText: {
    ...theme.styles.text.body,
    color: theme.colors.text,
    fontWeight: theme.typography.fontWeight.medium,
  },
  saveButton: {
    flex: 1,
    backgroundColor: theme.colors.secondary,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    alignItems: 'center',
  },
  saveButtonText: {
    ...theme.styles.text.body,
    color: theme.colors.text,
    fontWeight: theme.typography.fontWeight.semibold,
  },
});
