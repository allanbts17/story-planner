import { Collections } from "../enums/collections";
import { Object } from "../interfaces/object";
import { Place } from "../interfaces/place";
import { Series } from "../interfaces/series";
import { Story } from "../interfaces/story";

export type CollectionTypes = `${Collections}`;

export type ResourceInterfaces = Story | Series | Place | Object