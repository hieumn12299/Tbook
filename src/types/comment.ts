export type IComment = {
  id_chapter: string;
  id_story: string;
  content: string;
  created_at: {
    seconds: number;
    nanoseconds: number;
  };
  name: string;
  parent_id: string | null;
};
