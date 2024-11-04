export enum JokeStatus {
  PENDING = "pending",
  APPROVED = "approved",
  REJECTED = "rejected",
}

export interface Joke {
  id: string | number;
  content: string;
  type: string;
  createdAt?: string;
  submittedAt?: string;
  status: JokeStatus;
}

export interface JokeSubmission {
  content: string;
  type: string;
}

export interface AdminCredentials {
  email: string;
  password: string;
}

export interface PendingJoke {
  id: number;
  content: string;
  type: string;
  createdAt: string;
}

export interface JokeSubmission {
  content: string;
  type: string;
}
