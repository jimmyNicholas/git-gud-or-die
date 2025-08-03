// Character data structure
export interface Character {
  id: string;
  name: string;
  deaths: number;
  questsCompleted: number;
  createdAt: string; // ISO string format
  lastDeathAt?: string; // ISO string format
  isAlive: boolean;
}

// Input type for creating new characters
export interface CreateCharacterInput {
  name: string;
}
