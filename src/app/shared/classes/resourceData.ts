import { Collections } from "../enums/collections";
import { CollectionTypes } from "./types";

export const Resources = [
  {
    name: 'Series',
    singularName: 'Serie',
    collection: Collections.SERIES,
    id: 'series'
  },
  {
    name: 'Historias',
    singularName: 'Historia',
    collection: Collections.STORY,
    id: 'story'
  },
  {
    name: 'Personajes',
    singularName: 'Personaje',
    collection: Collections.CHARACTER,
    id: 'character'
  },
  {
    name: 'Lugares',
    singularName: 'Lugar',
    collection: Collections.PLACE,
    id: 'place'
  },
  {
    name: 'Objetos',
    singularName: 'Objeto',
    collection: Collections.OBJECT,
    id: 'object'
  },
]

export const getResourceCollectionById = (id: string): CollectionTypes => {
  return <CollectionTypes>Resources.find(res => res.id == id)?.collection
}

export const getSingularName = (id: string): string => {
  return <string>Resources.find(res => res.id == id)?.singularName
}