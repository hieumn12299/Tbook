export interface StoryDetail {
  title: string;
  bodyHTML: string;
  createdAt: string;
  author: {
    name: string;
    avatar: string;
    url: string;
  };
}

export interface StoryPost {
  id?: number;
  url?: string;
  discussionUrl?: string;
  title: string;
  html?: string;
  bodyText: string;
  chapters: string[];
  createdAt: string;
  lastEdited?: string | null;
  author: {
    name: string;
    avatar: string;
    url: string;
  };
}
