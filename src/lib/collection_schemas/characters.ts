import { z } from 'zod';
import type { RecordDescription } from '$lib/collection_schemas/type_helpers';
import type { CollectionParam } from "./user_input_collections";
import {UserInputCollections} from "./user_input_collections";
import { commonZodFields } from './shared_zod_objects';

export const CharactersSchema = z.object({
	name: commonZodFields.name,
	one_line_description: commonZodFields.one_line_description,
    age: commonZodFields.age,
	short_description: commonZodFields.short_description.optional(),
	long_description: commonZodFields.long_description.optional(),
    user: commonZodFields.user.optional(),
	core_cast: z.boolean().optional(),
	birthdate: z.string().optional(),
	plots: z.array(z.string()).optional(),
});

export type CharactersRecord = z.infer<typeof CharactersSchema>;

type CharactersRecordDescription = RecordDescription<CharactersRecord>;

export const charactersRecordDescription: CharactersRecordDescription = {
    "name": "get_character_details",
    "description": "Get the details of a character",
    "parameters": {
        "type": "object",
        "properties": {
            "name": {
                "type": "string",
                "description": "The name of the character",
            },
            "one_line_description": {
                "type": "string",
                "description": "A one line description of the character, maximum of 200 characters"
            },
            "short_description": {
                "type": "string",
                "description": "A short description of the character, minimum of 200, maximum of 400 characters"
            },
            "long_description": {
                "type": "string",
                "description": "A long description of the character, minimum of 400, maximum of 4000 characters"
            },
            "age": {
                "type": "integer",
                "description": "The age of the character, at most 9999 years old"
            },
            "birthdate": {
                "type": "string",
                "description": "The birthdate of the character",
            },
            "core_cast": {
                "type": "boolean",
                "description": "Is the character part of the core cast?"
            },
            // "plots": {
            //     "type": "array",
            //     "description": "The plots the characters are a part of."
            // }
        },
        "required": ["name", "one_line_description", "age"],
    },
}

export type CharactersCollectionParam = CollectionParam<UserInputCollections.Characters>;

export const charactersCollection: CharactersCollectionParam = {
    collectionName: UserInputCollections.Characters,
    headlineFields: ["name", "age"],
    infoField: "one_line_description",
};