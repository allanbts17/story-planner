import { Definition } from "src/app/interfaces/definition";
import { Collections } from "../enums/collections";
import { Chapter } from "../interfaces/chapter";
import { Character } from "../interfaces/character";
import { Object } from "../interfaces/object";
import { Place } from "../interfaces/place";
import { Series } from "../interfaces/series";
import { Story } from "../interfaces/story";
import { Evolution } from "src/app/interfaces/evolution";

export type CollectionTypes = `${Collections}`;

export type ResourceInterfaces = Story | Series | Place | Object | Character | Chapter | Definition | Evolution