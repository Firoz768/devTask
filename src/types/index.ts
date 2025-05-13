
export type UserRole = 'admin' | 'leader';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar?: string;
}

export interface DevotionalPlace {
  id: string;
  name: string;
  location: string;
  description: string;
  image?: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  placeId: string;
  assignedTo?: string;
  progress: number;
  status: 'pending' | 'in-progress' | 'completed' | 'approved' | 'paid';
  startDate: string;
  endDate: string;
  startImage?: string;
  endImage?: string;
  expenses: Expenses;
}

export interface Expenses {
  food: number;
  accommodation: number;
  water: number;
  other: number;
}

export interface DayMusic {
  day: string;
  deity: string;
  musicUrl: string;
}
