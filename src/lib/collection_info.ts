import { z } from 'zod';


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


export const TestSchema = z.object({
	test: z.string().optional()
});

export type TestRecord = z.infer<typeof TestSchema>;


export const UsersSchema = z.object({
	name: z.string().optional(),
	avatar: z.string().optional()
});

export type UsersRecord = z.infer<typeof UsersSchema>;

export type InsertCollectionUnion = CharactersRecord | PlotsRecord | PreviousChatsRecord | TestRecord

export enum Collections {
	Characters = "characters",
	Plots = "plots",
	PreviousChats = "previous_chats",
	Test = "test",
	Users = "users",
}


export const collectionToSchemaMap = {
    [Collections.Characters]: CharactersSchema,
    [Collections.Plots]: PlotsSchema,
    [Collections.PreviousChats]: PreviousChatsSchema,
    [Collections.Test]: TestSchema,
    [Collections.Users]: UsersSchema,
};

type FieldDescription = {
    type: string,
    description: string,
};

type Parameters<T> = {
    type: string,
    properties: {
        [P in keyof T]?: FieldDescription;
    },
    required: (keyof T)[],
};

type RecordDescription<T> = {
    name: string,
    description: string,
    parameters: Parameters<T>,
};

type CharactersRecordDescription = RecordDescription<CharactersRecord>;
type PlotsRecordDescription = RecordDescription<PlotsRecord>;

type UsersRecordDescription = RecordDescription<UsersRecord>

type PreviousChatsRecordDescription =  RecordDescription<PreviousChatsRecord>

type TestRecordDescription = RecordDescription<TestRecord>


const charactersRecordDescription: CharactersRecordDescription = {
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
const usersRecordDescription: UsersRecordDescription = {
    name: "get_user_details",
    description: "Get the details of a user",
    parameters: {
        type: "object",
        properties: {
            name: {
                type: "string",
                description: "The name of the user",
            },
            avatar: {
                type: "string",
                description: "The avatar of the user",
            },
        },
        required: [],
    },
};

const previousChatsRecordDescription: PreviousChatsRecordDescription = {
    name: "get_previous_chats",
    description: "Get the previous chats",
    parameters: {
        type: "object",
        properties: {
            messages: {
                type: ["null", "array"],
                description: "The messages in the chat",
            },
        },
        required: [],
    },
};

const testRecordDescription: TestRecordDescription = {
    name: "get_test_data",
    description: "Get the test data",
    parameters: {
        type: "object",
        properties: {
            test: {
                type: "string",
                description: "The test value",
            },
        },
        required: [],
    },
};

export const descriptionsMap = {
    [Collections.Characters]: charactersRecordDescription,
    [Collections.Plots]: plotsRecordDescription,
    [Collections.Users]: usersRecordDescription,
    [Collections.PreviousChats]: previousChatsRecordDescription,
    [Collections.Test]: testRecordDescription,
};