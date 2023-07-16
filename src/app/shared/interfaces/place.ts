export interface Place {
  id?: string;
  name: string;
  nickname: string | null;
  generalDescription: string;
  content: string;
  image: string | null;
  storyId: string | null;
  feelAtributes: FeelAtributes;
}

interface FeelAtributes {
  view: string | null;
  smell: string | null;
  sound: string | null;
}
