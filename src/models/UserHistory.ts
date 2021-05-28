export interface UserHistory {
  user_id: string;
  histories: {
    [key: string]: { class: string; top_k: number; final_rank?: string };
  };
}
