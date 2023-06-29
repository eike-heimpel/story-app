import { z } from 'zod';
import type { RecordDescription } from '$lib/collection_schemas/type_helpers';
import type { CollectionParam } from "./user_input_collections";
import {UserInputCollections} from "./user_input_collections";
import { commonZodFields } from './shared_zod_objects';


export const PlotsSchema = z.object({
	name: commonZodFields.name,
	one_line_description: commonZodFields.one_line_description,
	short_description: commonZodFields.short_description.optional(),
	long_description: commonZodFields.long_description.optional(),
    user: commonZodFields.user.optional(),
	date: z.string().optional(),
	characters: z.array(z.string()).optional(),
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
            // "date": {
            //     "type": "string", // assuming IsoDateString is string type
            //     "description": "The date of the plot"
            // },
            // "characters": {
            //     "type": "array", // assuming RecordIdString[] is an array type
            //     "description": "The characters involved in the plot"
            // },
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