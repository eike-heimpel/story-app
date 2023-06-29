import { CharactersSchema, type CharactersRecord, type CharactersCollectionParam, charactersRecordDescription, charactersCollection } from './characters';
import { PlotsSchema, type PlotsRecord, type PlotsCollectionParam, plotsRecordDescription, plotsCollection } from './plots';
import { PreviousChatsSchema, type PreviousChatsRecord, type PreviousChatsCollectionParam, previousChatsRecordDescription, previousChatsCollection} from './previous_chats';
import { UsersSchema, type UsersRecord } from './users';
import {UserInputCollections, type CollectionParam} from "./user_input_collections"
import type { RecordDescription } from './type_helpers';


export type CollectionDetails<T extends UserInputCollections> = {
    schema: any, 
    description: RecordDescription<any>, 
    collectionParams: any,
}

export const collections: Record<UserInputCollections, CollectionDetails<UserInputCollections>> = {
    characters: {
        schema: CharactersSchema,
        description: charactersRecordDescription,
        collectionParams: charactersCollection,
    },
    plots: {
        schema: PlotsSchema,
        description: plotsRecordDescription,
        collectionParams: plotsCollection,
    },
    previous_chats: {
        schema: PreviousChatsSchema,
        description: previousChatsRecordDescription,
        collectionParams: previousChatsCollection,
    },
};

export type InsertCollectionUnion = CharactersRecord | PlotsRecord | PreviousChatsRecord;
export type CollectionPramUnion = CharactersCollectionParam | PlotsCollectionParam | PreviousChatsCollectionParam


export type UserInputCollectionRecords = {
    [UserInputCollections.Characters]: CharactersRecord,
    [UserInputCollections.Plots]: PlotsRecord,
    [UserInputCollections.PreviousChats]: PreviousChatsRecord,
};