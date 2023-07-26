import { CollectionTypes, ResourceInterfaces } from "../shared/classes/types";
import { ChangesData } from "./changes-data";

export interface Evolution {
  id?: string;
  date?: string;
  reason: string;
  order: number;
  elementName: CollectionTypes;
  data: ResourceInterfaces;
  changedData: ChangesData[];
}
