import { Collections } from "../enums/collections";
import { Series } from "../interfaces/series";
import { Story } from "../interfaces/story";

export type CollectionTypes = `${Collections}`;

export type ResourceInterfaces = Story | Series