import type { UserInputCollectionRecords } from "$lib/collection_schemas";
import type {UserInputCollections} from "./user_input_collections"


export type FieldDescription = {
    type: string,
    description: string,
};

export type Parameters<T> = {
    type: string,
    properties: {
        [P in keyof T]?: FieldDescription;
    },
    required: (keyof T)[],
};

export type RecordDescription<T> = {
    name: string,
    description: string,
    parameters: Parameters<T>,
};

export type CollectionParam<T extends UserInputCollections> = {
    collectionName: T,
    headlineFields: (keyof UserInputCollectionRecords[T])[],
    infoField: keyof UserInputCollectionRecords[T],
};