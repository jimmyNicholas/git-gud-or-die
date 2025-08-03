import { storage, STORAGE_KEYS } from '../utils';
import { type Character, type CreateCharacterInput } from '../types';

// Character service interface (future-proof for AWS)
export interface CharacterService {
  getCharacter(): Promise<Character | null>;
  // eslint-disable-next-line no-unused-vars
  createCharacter(input: CreateCharacterInput): Promise<Character>;
  // eslint-disable-next-line no-unused-vars
  updateCharacter(updates: Partial<Character>): Promise<Character>;
  killCharacter(): Promise<Character>;
  resurrectCharacter(): Promise<Character>;
  incrementQuestsCompleted(): Promise<Character>;
  getCharacterStats(): Promise<{
    totalDeaths: number;
    totalQuestsCompleted: number;
    currentStreak: number;
  }>;
}

// Local implementation using AsyncStorage
export class LocalCharacterService implements CharacterService {
  async getCharacter(): Promise<Character | null> {
    return await storage.get<Character>(STORAGE_KEYS.CHARACTER);
  }

  async createCharacter(input: CreateCharacterInput): Promise<Character> {
    const newCharacter: Character = {
      id: this.generateId(),
      name: input.name,
      deaths: 0,
      questsCompleted: 0,
      createdAt: new Date().toISOString(),
      isAlive: true,
    };

    await storage.set(STORAGE_KEYS.CHARACTER, newCharacter);
    return newCharacter;
  }

  async updateCharacter(updates: Partial<Character>): Promise<Character> {
    const character = await this.getCharacter();

    if (!character) {
      throw new Error('No character found. Create a character first.');
    }

    const updatedCharacter = { ...character, ...updates };
    await storage.set(STORAGE_KEYS.CHARACTER, updatedCharacter);
    return updatedCharacter;
  }

  async killCharacter(): Promise<Character> {
    const character = await this.getCharacter();

    if (!character) {
      throw new Error('No character found to kill.');
    }

    const killedCharacter: Character = {
      ...character,
      deaths: character.deaths + 1,
      lastDeathAt: new Date().toISOString(),
      isAlive: false,
    };

    await storage.set(STORAGE_KEYS.CHARACTER, killedCharacter);
    return killedCharacter;
  }

  async resurrectCharacter(): Promise<Character> {
    const character = await this.getCharacter();

    if (!character) {
      throw new Error('No character found to resurrect.');
    }

    const resurrectedCharacter: Character = {
      ...character,
      isAlive: true,
    };

    await storage.set(STORAGE_KEYS.CHARACTER, resurrectedCharacter);
    return resurrectedCharacter;
  }

  async incrementQuestsCompleted(): Promise<Character> {
    const character = await this.getCharacter();

    if (!character) {
      throw new Error('No character found.');
    }

    const updatedCharacter: Character = {
      ...character,
      questsCompleted: character.questsCompleted + 1,
    };

    await storage.set(STORAGE_KEYS.CHARACTER, updatedCharacter);
    return updatedCharacter;
  }

  async getCharacterStats(): Promise<{
    totalDeaths: number;
    totalQuestsCompleted: number;
    currentStreak: number;
  }> {
    const character = await this.getCharacter();

    if (!character) {
      return {
        totalDeaths: 0,
        totalQuestsCompleted: 0,
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
      totalDeaths: character.deaths,
      totalQuestsCompleted: character.questsCompleted,
      currentStreak: daysSinceLastEvent,
    };
  }

  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }
}
