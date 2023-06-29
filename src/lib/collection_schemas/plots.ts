import { z } from 'zod';
import type { RecordDescription } from '$lib/collection_schemas/type_helpers';
import type { CollectionParam } from "./type_helpers";
import {UserInputCollections} from "./user_input_collections";


export const PlotsSchema = z.object({
	name: z.string(),
	one_line_description: z.string(),
	short_description: z.string().optional(),
	long_description: z.string().optional(),
	date: z.string().optional(),
	characters: z.array(z.string()).optional(),
	user: z.string().optional()
});

export type PlotsRecord = z.infer<typeof PlotsSchema>;

type PlotsRecordDescription = RecordDescription<PlotsRecord>;

export const plotsRecordDescription: PlotsRecordDescription = {
    "name": "get_plot_details",
    "description": "Get the details of a plot",
    "parameters": {
        "type": "object",
        "properties": {
            "name": {
                "type": "string",
                "description": "The name of the plot",
            },
            "one_line_description": {
                "type": "string",
                "description": "A one line description of the plot"
            },
            "short_description": {
                "type": "string",
                "description": "A short description of the plot"
            },
            "long_description": {
                "type": "string",
                "description": "A long description of the plot"
            },
            "date": {
                "type": "string", // assuming IsoDateString is string type
                "description": "The date of the plot"
            },
            "characters": {
                "type": "array", // assuming RecordIdString[] is an array type
                "description": "The characters involved in the plot"
            },
        },
        "required": ["name", "one_line_description"],
    },
};

export type PlotsCollectionParam = CollectionParam<UserInputCollections.Plots>;

export const plotsCollection: PlotsCollectionParam = {
    collectionName: UserInputCollections.Plots,
    headlineFields: ["name"],
    infoField: "one_line_description",
};