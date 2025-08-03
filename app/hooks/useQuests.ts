import { useState, useEffect, useCallback, useMemo } from 'react';
import {
  LocalQuestService,
  type Quest,
  type CreateQuestInput,
} from '../services';

export const useQuests = () => {
  // State
  const [quests, setQuests] = useState<Quest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Service instance
  const questService = useMemo(() => new LocalQuestService(), []);

  // Load quests on mount
  useEffect(() => {
    loadQuests();
  }, []);

  // Core functions
  const loadQuests = useCallback(async () => {
    try {
      setLoading(true);
      const loadedQuests = await questService.getQuests();
      setQuests(loadedQuests);
    } catch {
      setError('Failed to load quests');
    } finally {
      setLoading(false);
    }
  }, [questService]);

  const addQuest = useCallback(
    async (input: CreateQuestInput) => {
      try {
        const newQuest = await questService.createQuest(input);
        setQuests(prev => [...prev, newQuest]);
        return newQuest;
      } catch (err) {
        setError('Failed to create quest');
        throw err;
      }
    },
    [questService]
  );

  const updateQuest = useCallback(
    async (id: string, updates: Partial<Quest>) => {
      try {
        const updatedQuest = await questService.updateQuest(id, updates);
        setQuests(prev =>
          prev.map(quest => (quest.id === id ? updatedQuest : quest))
        );
        return updatedQuest;
      } catch (err) {
        setError('Failed to update quest');
        throw err;
      }
    },
    [questService]
  );

  const deleteQuest = useCallback(
    async (id: string) => {
      try {
        await questService.deleteQuest(id);
        setQuests(prev => prev.filter(quest => quest.id !== id));
      } catch (err) {
        setError('Failed to delete quest');
        throw err;
      }
    },
    [questService]
  );

  const completeQuest = useCallback(
    async (id: string) => {
      try {
        const completedQuest = await questService.completeQuest(id);
        setQuests(prev =>
          prev.map(quest => (quest.id === id ? completedQuest : quest))
        );
        return completedQuest;
      } catch (err) {
        setError('Failed to complete quest');
        throw err;
      }
    },
    [questService]
  );

  // Computed values
  const activeQuests = useMemo(
    () => quests.filter(quest => !quest.completed),
    [quests]
  );

  const completedQuests = useMemo(
    () => quests.filter(quest => quest.completed),
    [quests]
  );

  const overdueQuests = useMemo(
    () =>
      quests.filter(quest => {
        if (quest.completed) return false;
        return new Date(quest.deadline) < new Date();
      }),
    [quests]
  );

  return {
    // State
    quests,
    loading,
    error,

    // Actions
    addQuest,
    updateQuest,
    deleteQuest,
    completeQuest,
    loadQuests,

    // Computed
    activeQuests,
    completedQuests,
    overdueQuests,

    // Utilities
    clearError: () => setError(null),
  };
};
