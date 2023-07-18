export interface Character {
  id?: string;
  basic: charBasic;
  appearance: charAppearance;
  personality: charPersonality;
  reactions: charReactions;
  home: charHome;
  relations: charRelations;
  aspirations: charAspirations;
  storyRole: charStoryRole;
  other: {
    label: string;
    data: string;
  }|null
}

export interface charBasic {
  name: string;
  lastname: string;
  nickname: string|null;
  age: string|null;
  gender: string|null;
  birthdate: string|null;
  birthPlace: string|null;
  storyId: string|null;
  image: string|null;
}

export interface charAppearance {
  height: string|null;
  weight: string|null;
  skin: string|null;
  eyes: string|null;
  hair: string|null;
  distinguishableTraits: string|null;
  posture: string|null;
  storyId: string|null;
  image: string|null;
  otherPhysicalTrait: string|null;
  outfit: string|null;
  accessories: string|null
}

export interface charPersonality {
  generalPersonality: string|null;
  qualities: string|null;
  defects: string|null;
  intelligence: string|null;
  habits: string|null;
  fears: string|null;
  skills: string|null;
  weaknesses: string|null;
}

export interface charReactions {
  fear: string|null;
  sorprise: string|null;
  sadness: string|null;
  rejection: string|null;
  madness: string|null;
  anger: string|null;
  hapiness: string|null;
  anotherReaction: string|null;
  doubtPhrases: string|null;
  hapinessPhrases: string|null;
  sadnessPhrases: string|null;
  enthusiasmPhrases: string|null;
  angerPhrases: string|null;
  anotherPhrases: string|null;
}

export interface charHome {
  country: string|null;
  province: string|null;
  neighborhood: string|null;
  homeDescription: string|null;
  neighbors: string|null;
}

export interface charRelations {
  character: charRelationData[]
}

//export type RelationshipStatus = 'perfect'|'verygood'|'good'|'regular'|'bad'|'verybad'|'appalling'
export interface charRelationData {
  name: string;
  relationship: 1|2|3|4|5|6|7;
  relationType: string;
}

export interface charAspirations {
  hobbies: string|null;
  dislike: string|null;
  professionOrStudies: string|null;
  goals: string|null;
}

export type RolType = 'mainProtagonist'|'protagonist'|'side'|'antagonist'|'mainAntagonist'
export interface charStoryRole {
  rol: RolType|null;
  importantEvent: string|null
  bestMemories: string|null;
  worstMemories: string|null;
}
