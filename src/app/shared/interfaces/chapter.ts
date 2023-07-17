export interface Chapter {
  id?: string;
  storyId: string;
  order: number;
  title: string;
  summary: string;
}

export interface SelectableChapter {
  id?: string;
  storyId: string;
  order: number;
  title: string;
  summary: string;
  select?: boolean;
}
