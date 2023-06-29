import { z } from 'zod';
import type { RecordDescription } from '$lib/collection_schemas/type_helpers';
import type { CollectionParam } from "./type_helpers";
import {UserInputCollections} from "./user_input_collections";



export const PreviousChatsSchema = z.object({
	// Note: `messages` is a JSON string
	messages: z.string().optional().refine(value => {
		try {
			JSON.parse(value);
			return true;
		} catch {
			return false;
		}
	}, {
		message: "Invalid JSON string",
		path: ['messages'] // field this error is attached to
	}),
	user: z.string().optional()
});

export type PreviousChatsRecord = z.infer<typeof PreviousChatsSchema>;

type PreviousChatsRecordDescription =  RecordDescription<PreviousChatsRecord>


export const previousChatsRecordDescription: PreviousChatsRecordDescription = {
    name: "get_previous_chats",
    description: "Get the previous chats",
    parameters: {
        type: "object",
        properties: {
            messages: {
                type: "string",
                description: "The messages in the chat in JSON format.",
            },
        },
        required: [],
    },
};

export type PreviousChatsCollectionParam = CollectionParam<UserInputCollections.PreviousChats>;

export const previousChatsCollection: PreviousChatsCollectionParam = {
    collectionName: UserInputCollections.PreviousChats,
    headlineFields: [],
    infoField: "messages"
};