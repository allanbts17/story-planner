import { Collections } from "../enums/collections";
import { CollectionTypes } from "./types";

export const Resources = [
  {
    name: 'Series',
    collection: Collections.SERIES,
    id: 'series'
  },
  {
    name: 'Historias',
    collection: Collections.STORY,
    id: 'story'
  },
  {
    name: 'Personajes',
    collection: Collections.CHARACTER,
    id: 'character'
  },
  {
    name: 'Lugares',
    collection: Collections.PLACE,
    id: 'place'
  },
  {
    name: 'Objetos',
    collection: Collections.OBJECT,
    id: 'object'
  },
]

export const getResourceCollectionById = (id: string): CollectionTypes => {
  return <CollectionTypes>Resources.find(res => res.id == id)?.collection
}