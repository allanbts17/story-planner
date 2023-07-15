import { Series } from "./series";

export interface Story {
  id?: string;
  title: string;
  image: string|null;
  series: Series|null;
  genre: string[];
  synopsis: string;
}
