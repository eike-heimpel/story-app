import type { CharactersRecord } from "./characters";
import type { PlotsRecord } from "./plots";
import type { PreviousChatsRecord } from "./previous_chats";


export enum UserInputCollections {
	Characters = "characters",
	Plots = "plots",
	PreviousChats = "previous_chats",
}

export type UserInputCollectionRecords = {
    [UserInputCollections.Characters]: CharactersRecord,
    [UserInputCollections.Plots]: PlotsRecord,
    [UserInputCollections.PreviousChats]: PreviousChatsRecord,
};

export type CollectionParam<T extends UserInputCollections> = {
    collectionName: T,
    headlineFields: (keyof UserInputCollectionRecords[T])[],
    infoField: keyof UserInputCollectionRecords[T],
};