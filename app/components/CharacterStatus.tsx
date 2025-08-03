import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { theme } from '../theme';
import { type Character } from '../types';

interface CharacterStatusProps {
  character: Character | null;
  onCreateCharacter: () => void;
  onKillCharacter?: () => void;
  onResurrectCharacter?: () => void;
}

export const CharacterStatus: React.FC<CharacterStatusProps> = ({
  character,
  onCreateCharacter,
  onKillCharacter,
  onResurrectCharacter,
}) => {
  if (!character) {
    return (
      <View style={styles.container}>
        <View style={styles.noCharacterContainer}>
          <Text style={styles.noCharacterTitle}>No Character</Text>
          <Text style={styles.noCharacterMessage}>
            Create a character to begin your journey
          </Text>
          <TouchableOpacity
            style={styles.createButton}
            onPress={onCreateCharacter}
          >
            <Text style={styles.createButtonText}>Create Character</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  const getStatusColor = () => {
    return character.isAlive ? theme.colors.success : theme.colors.error;
  };

  const getStatusText = () => {
    return character.isAlive ? 'ALIVE' : 'DEAD';
  };

  return (
    <View style={styles.container}>
      {/* Character Header */}
      <View style={styles.header}>
        <View style={styles.nameContainer}>
          <Text style={styles.characterName}>{character.name}</Text>
          <View
            style={[styles.statusBadge, { backgroundColor: getStatusColor() }]}
          >
            <Text style={styles.statusText}>{getStatusText()}</Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actions}>
          {character.isAlive && onKillCharacter && (
            <TouchableOpacity
              style={styles.killButton}
              onPress={onKillCharacter}
            >
              <Text style={styles.killButtonText}>💀 Kill</Text>
            </TouchableOpacity>
          )}
          {!character.isAlive && onResurrectCharacter && (
            <TouchableOpacity
              style={styles.resurrectButton}
              onPress={onResurrectCharacter}
            >
              <Text style={styles.resurrectButtonText}>⚡ Resurrect</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Character Stats */}
      <View style={styles.statsContainer}>
        <View style={styles.statRow}>
          <Text style={styles.statLabel}>Deaths</Text>
          <Text style={styles.statValue}>{character.deaths}</Text>
        </View>
        <View style={styles.statRow}>
          <Text style={styles.statLabel}>Quests Completed</Text>
          <Text style={styles.statValue}>{character.questsCompleted}</Text>
        </View>
        <View style={styles.statRow}>
          <Text style={styles.statLabel}>Created</Text>
          <Text style={styles.statValue}>
            {new Date(character.createdAt).toLocaleDateString()}
          </Text>
        </View>
        {character.lastDeathAt && (
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Last Death</Text>
            <Text style={styles.statValue}>
              {new Date(character.lastDeathAt).toLocaleDateString()}
            </Text>
          </View>
        )}
      </View>

      {/* Permadeath Warning */}
      {character.isAlive && (
        <View style={styles.warningContainer}>
          <Text style={styles.warningTitle}>⚠️ Permadeath Active</Text>
          <Text style={styles.warningMessage}>
            Missing quest deadlines will result in character death and quest
            deletion
          </Text>
        </View>
      )}

      {/* Death Message */}
      {!character.isAlive && (
        <View style={styles.deathContainer}>
          <Text style={styles.deathTitle}>💀 YOU DIED</Text>
          <Text style={styles.deathMessage}>
            Your character has fallen. All quests have been lost.
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...theme.styles.card,
    marginBottom: theme.spacing.lg,
  },
  noCharacterContainer: {
    alignItems: 'center',
    padding: theme.spacing.xl,
  },
  noCharacterTitle: {
    ...theme.styles.text.title,
    color: theme.colors.textDim,
    marginBottom: theme.spacing.sm,
  },
  noCharacterMessage: {
    ...theme.styles.text.body,
    color: theme.colors.textDim,
    textAlign: 'center',
    marginBottom: theme.spacing.lg,
  },
  createButton: {
    backgroundColor: theme.colors.secondary,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
  },
  createButtonText: {
    ...theme.styles.text.body,
    color: theme.colors.text,
    fontWeight: theme.typography.fontWeight.semibold,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  nameContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
  },
  characterName: {
    ...theme.styles.text.title,
    color: theme.colors.accent,
  },
  statusBadge: {
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.sm,
  },
  statusText: {
    ...theme.styles.text.caption,
    color: theme.colors.text,
    fontWeight: theme.typography.fontWeight.bold,
  },
  actions: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  killButton: {
    backgroundColor: theme.colors.error,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.sm,
  },
  killButtonText: {
    ...theme.styles.text.caption,
    color: theme.colors.text,
    fontWeight: theme.typography.fontWeight.medium,
  },
  resurrectButton: {
    backgroundColor: theme.colors.warning,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.sm,
  },
  resurrectButtonText: {
    ...theme.styles.text.caption,
    color: theme.colors.text,
    fontWeight: theme.typography.fontWeight.medium,
  },
  statsContainer: {
    marginBottom: theme.spacing.lg,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: theme.spacing.xs,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  statLabel: {
    ...theme.styles.text.body,
    color: theme.colors.textDim,
  },
  statValue: {
    ...theme.styles.text.body,
    color: theme.colors.text,
    fontWeight: theme.typography.fontWeight.medium,
  },
  warningContainer: {
    backgroundColor: theme.colors.warning + '20',
    borderWidth: 1,
    borderColor: theme.colors.warning,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
  },
  warningTitle: {
    ...theme.styles.text.subtitle,
    color: theme.colors.warning,
    marginBottom: theme.spacing.xs,
  },
  warningMessage: {
    ...theme.styles.text.caption,
    color: theme.colors.textDim,
  },
  deathContainer: {
    backgroundColor: theme.colors.error + '20',
    borderWidth: 1,
    borderColor: theme.colors.error,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    alignItems: 'center',
  },
  deathTitle: {
    ...theme.styles.text.title,
    color: theme.colors.error,
    marginBottom: theme.spacing.sm,
  },
  deathMessage: {
    ...theme.styles.text.body,
    color: theme.colors.textDim,
    textAlign: 'center',
  },
});
