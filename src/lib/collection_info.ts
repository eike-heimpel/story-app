import type {CharactersRecord, PlotsRecord, UsersRecord, PreviousChatsRecord, TestRecord} from "./pocketbase_types"
import {Collections} from "./pocketbase_types"


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
                    "description": "A one line description of the character"
                },
                "short_description": {
                    "type": "string",
                    "description": "A short description of the character"
                },
                "long_description": {
                    "type": "string",
                    "description": "A long description of the character"
                },
                "age": {
                    "type": "integer",
                    "description": "The age of the character"
                },
                "birthdate": {
                    "type": "string",
                    "description": "The birthdate of the character",
                },
                "core_cast": {
                    "type": "boolean",
                    "description": "Is the character part of the core cast?"
                },
                "plots": {
                    "type": "array",
                    "description": "The plots the characters are a part of."
                }
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