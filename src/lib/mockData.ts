export interface Joke {
  id: string;
  content: string;
  type: string;
  status: "pending" | "approved" | "rejected";
  submittedAt: string;
}

export const mockJokes: Joke[] = [
  {
    id: "1",
    content:
      "Why don't scientists trust atoms? Because they make up everything!",
    type: "science",
    status: "pending",
    submittedAt: new Date().toISOString(),
  },
  {
    id: "2",
    content:
      "Why did the scarecrow win an award? Because he was outstanding in his field!",
    type: "pun",
    status: "pending",
    submittedAt: new Date().toISOString(),
  },
  {
    id: "3",
    content: "What do you call a bear with no teeth? A gummy bear!",
    type: "children",
    status: "pending",
    submittedAt: new Date().toISOString(),
  },
];

export const mockJokeTypes = [
  "pun",
  "science",
  "programming",
  "dad-joke",
  "children",
  "wordplay",
];
