export type IComment = {
  id: string;
  id_chapter: string;
  id_story: string;
  content: string;
  created_at: {
    seconds: number;
    nanoseconds: number;
  };
  name: string;
  parent_id: string | null;
  child_comments?: IComment[];
  uid: string;
  img: string;
};
