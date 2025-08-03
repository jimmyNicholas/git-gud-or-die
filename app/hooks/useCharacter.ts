import { useState, useEffect, useCallback, useMemo } from 'react';
import { LocalCharacterService } from '../services';
import { type Character, type CreateCharacterInput } from '../types';

export const useCharacter = () => {
  // State
  const [character, setCharacter] = useState<Character | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Service instance
  const characterService = useMemo(() => new LocalCharacterService(), []);

  // Load character on mount
  useEffect(() => {
    loadCharacter();
  }, []);

  // Core functions
  const loadCharacter = useCallback(async () => {
    try {
      setLoading(true);
      const loadedCharacter = await characterService.getCharacter();
      setCharacter(loadedCharacter);
    } catch {
      setError('Failed to load character');
    } finally {
      setLoading(false);
    }
  }, [characterService]);

  const createCharacter = useCallback(
    async (input: CreateCharacterInput) => {
      try {
        const newCharacter = await characterService.createCharacter(input);
        setCharacter(newCharacter);
        return newCharacter;
      } catch (err) {
        setError('Failed to create character');
        throw err;
      }
    },
    [characterService]
  );

  const updateCharacter = useCallback(
    async (updates: Partial<Character>) => {
      try {
        const updatedCharacter =
          await characterService.updateCharacter(updates);
        setCharacter(updatedCharacter);
        return updatedCharacter;
      } catch (err) {
        setError('Failed to update character');
        throw err;
      }
    },
    [characterService]
  );

  const killCharacter = useCallback(async () => {
    try {
      const killedCharacter = await characterService.killCharacter();
      setCharacter(killedCharacter);
      return killedCharacter;
    } catch (err) {
      setError('Failed to kill character');
      throw err;
    }
  }, [characterService]);

  const resurrectCharacter = useCallback(async () => {
    try {
      const resurrectedCharacter = await characterService.resurrectCharacter();
      setCharacter(resurrectedCharacter);
      return resurrectedCharacter;
    } catch (err) {
      setError('Failed to resurrect character');
      throw err;
    }
  }, [characterService]);

  const incrementQuestsCompleted = useCallback(async () => {
    try {
      const updatedCharacter =
        await characterService.incrementQuestsCompleted();
      setCharacter(updatedCharacter);
      return updatedCharacter;
    } catch (err) {
      setError('Failed to increment quests completed');
      throw err;
    }
  }, [characterService]);

  // Computed values
  const isAlive = useMemo(() => character?.isAlive ?? false, [character]);
  const isDead = useMemo(() => !isAlive, [isAlive]);
  const hasCharacter = useMemo(() => character !== null, [character]);

  const stats = useMemo(() => {
    if (!character) {
      return {
        deaths: 0,
        questsCompleted: 0,
        currentStreak: 0,
      };
    }

    // Calculate current streak (days since last death or creation)
    const lastEvent = character.lastDeathAt || character.createdAt;
    const lastEventDate = new Date(lastEvent);
    const now = new Date();
    const daysSinceLastEvent = Math.floor(
      (now.getTime() - lastEventDate.getTime()) / (1000 * 60 * 60 * 24)
    );

    return {
      deaths: character.deaths,
      questsCompleted: character.questsCompleted,
      currentStreak: daysSinceLastEvent,
    };
  }, [character]);

  return {
    // State
    character,
    loading,
    error,

    // Actions
    createCharacter,
    updateCharacter,
    killCharacter,
    resurrectCharacter,
    incrementQuestsCompleted,
    loadCharacter,

    // Computed
    isAlive,
    isDead,
    hasCharacter,
    stats,

    // Utilities
    clearError: () => setError(null),
  };
};
