import { z } from 'zod';
import type { RecordDescription } from '$lib/collection_schemas/type_helpers';
import type { CollectionParam } from "./type_helpers";
import {UserInputCollections} from "./user_input_collections";

export const CharactersSchema = z.object({
	name: z.string().max(40),
	one_line_description: z.string().min(5).max(200),
    age: z.number().int().min(0).max(9999),
	short_description: z.string().min(200).max(400).optional(),
	long_description: z.string().min(400).max(4000).optional(),
	core_cast: z.boolean().optional(),
	birthdate: z.string().optional(),
	plots: z.array(z.string()).optional(),
	user: z.string().optional()
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