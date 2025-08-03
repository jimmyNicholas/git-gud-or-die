// Quest data structure with deadline requirements
export interface Quest {
  id: string;
  title: string;
  description?: string;
  deadline: string; // ISO string format
  completed: boolean;
  createdAt: string; // ISO string format
  completedAt?: string; // ISO string format
}

// Input type for creating new quests
export interface CreateQuestInput {
  title: string;
  description?: string;
  deadline: string; // ISO string format
}
