import { storage, STORAGE_KEYS } from '../utils';
import { type Quest, type CreateQuestInput } from '../types';

// Quest service interface (future-proof for AWS)
export interface QuestService {
  getQuests(): Promise<Quest[]>;
  // eslint-disable-next-line no-unused-vars
  createQuest(quest: CreateQuestInput): Promise<Quest>;
  // eslint-disable-next-line no-unused-vars
  updateQuest(id: string, updates: Partial<Quest>): Promise<Quest>;
  // eslint-disable-next-line no-unused-vars
  deleteQuest(id: string): Promise<void>;
  // eslint-disable-next-line no-unused-vars
  completeQuest(id: string): Promise<Quest>;
  getOverdueQuests(): Promise<Quest[]>;
}

// Local implementation using AsyncStorage
export class LocalQuestService implements QuestService {
  async getQuests(): Promise<Quest[]> {
    const quests = await storage.get<Quest[]>(STORAGE_KEYS.QUESTS);
    return quests || [];
  }

  async createQuest(input: CreateQuestInput): Promise<Quest> {
    const quests = await this.getQuests();

    const newQuest: Quest = {
      id: this.generateId(),
      title: input.title,
      description: input.description,
      deadline: input.deadline,
      completed: false,
      createdAt: new Date().toISOString(),
    };

    const updatedQuests = [...quests, newQuest];
    await storage.set(STORAGE_KEYS.QUESTS, updatedQuests);

    return newQuest;
  }

  async updateQuest(id: string, updates: Partial<Quest>): Promise<Quest> {
    const quests = await this.getQuests();
    const questIndex = quests.findIndex(quest => quest.id === id);

    if (questIndex === -1) {
      throw new Error(`Quest with id ${id} not found`);
    }

    const updatedQuest = { ...quests[questIndex], ...updates };
    quests[questIndex] = updatedQuest;

    await storage.set(STORAGE_KEYS.QUESTS, quests);
    return updatedQuest;
  }

  async deleteQuest(id: string): Promise<void> {
    const quests = await this.getQuests();
    const filteredQuests = quests.filter(quest => quest.id !== id);
    await storage.set(STORAGE_KEYS.QUESTS, filteredQuests);
  }

  async completeQuest(id: string): Promise<Quest> {
    return this.updateQuest(id, {
      completed: true,
      completedAt: new Date().toISOString(),
    });
  }

  async getOverdueQuests(): Promise<Quest[]> {
    const quests = await this.getQuests();
    const now = new Date();

    return quests.filter(quest => {
      if (quest.completed) return false;
      const deadline = new Date(quest.deadline);
      return deadline < now;
    });
  }

  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }
}
