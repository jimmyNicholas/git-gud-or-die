import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { theme } from '../theme';
import { QuestCard, QuestModal } from '../components';
import { type Quest, type CreateQuestInput } from '../types';
import { useQuests } from '../hooks/useQuests';
import { tryCatch } from '../utils/tryCatch';

export default function TodosScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [editingQuest, setEditingQuest] = useState<Quest | undefined>(
    undefined
  );
  const [expandedQuestId, setExpandedQuestId] = useState<string | null>(null);

  const { quests, loading, error, addQuest, updateQuest, deleteQuest } =
    useQuests();

  const handleNewQuest = () => {
    setEditingQuest(undefined);
    setModalVisible(true);
  };

  const handleSaveQuest = async (_questData: CreateQuestInput) => {
    const { title, description, deadline } = _questData;
    if (editingQuest) {
      const { error } = await tryCatch(
        updateQuest(editingQuest.id, { title, description })
      );
      error ? Alert.alert('Error updating quest:', error.message) : "Unable to update quest";
    } else {
      const { error } = await tryCatch(
        addQuest({ title, description, deadline })
      );
      error ? Alert.alert('Error adding quest:', error.message) : "Unable to add quest";
    }
  };

  const handleUpdateQuest = async (
    _questId: string,
    _updates: { title?: string; description?: string }
  ) => {
    const { error } = await tryCatch(
      updateQuest(_questId, _updates)
    );
    error ? Alert.alert('Error updating quest:', error.message) : "Unable to update quest";
    setExpandedQuestId(null); // Collapse card after update
  };

  const handleQuestCancel = () => {
    setExpandedQuestId(null); // Collapse card after cancel
  };

  const handleQuestExpand = (questId: string) => {
    setExpandedQuestId(expandedQuestId === questId ? null : questId);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setEditingQuest(undefined);
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }
  if (error) {
    return <Text>Error: {error}</Text>;
  }

  const handleDeleteQuest = async (questId: string) => {
    const { error } = await tryCatch(deleteQuest(questId));
    if (error) {
      Alert.alert('Error deleting quest:', error.message);
    }
  };

  return (
    <View style={styles.container}>
      {/* Top Section - New Task Button and Controls */}
      <View style={styles.topSection}>
        <TouchableOpacity style={styles.newTaskButton} onPress={handleNewQuest}>
          <Text style={styles.newTaskButtonText}>+ New Quest</Text>
        </TouchableOpacity>
        <View style={styles.controlsSection}>
          <TouchableOpacity style={styles.controlButton}>
            <Text style={styles.controlButtonText}>Sort</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.controlButton}>
            <Text style={styles.controlButtonText}>Filter</Text>
          </TouchableOpacity>
          {/* debug button for deleting a quest */}
          <TouchableOpacity
            style={styles.controlButton}
            onPress={() => handleDeleteQuest(quests[0].id)}
          >
            <Text style={styles.controlButtonText}>x</Text>
          </TouchableOpacity>
        </View>
      </View>

      {quests.length === 0 && (
        <TouchableOpacity
          style={styles.noQuestsContainer}
          onPress={handleNewQuest}
        >
          <Text style={styles.noQuestsText}>No quests yet...</Text>
          <Text style={styles.noQuestsText}>🏕️</Text>
        </TouchableOpacity>
      )}

      {/* Main Content Area - Quest Cards */}
      <View style={styles.mainContent}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {quests.map(quest => (
            <QuestCard
              key={quest.id}
              quest={quest}
              onUpdate={handleUpdateQuest}
              onExpand={handleQuestExpand}
              onCancel={handleQuestCancel}
              isExpanded={expandedQuestId === quest.id}
            />
          ))}
        </ScrollView>
      </View>

      {/* Quest Modal */}
      <QuestModal
        visible={modalVisible}
        onClose={handleCloseModal}
        onSave={handleSaveQuest}
        quest={editingQuest}
      />
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
  noQuestsContainer: {
    height: '30%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.text,
    padding: theme.spacing.lg,
    borderRadius: theme.spacing.sm,
  },
  noQuestsText: {
    color: theme.colors.text,
    fontSize: theme.typography.fontSize['2xl'],
    fontWeight: theme.typography.fontWeight.semibold,
    textAlign: 'center',
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
