import {writable, type Writable} from "svelte/store";
import type { UserInputCollections } from "$lib//collection_schemas/user_input_collections";
import type { InsertCollectionUnion } from "$lib/collection_schemas";

export type UserInputCollectionData = Partial<Record<UserInputCollections, InsertCollectionUnion[]>>;

export const collectionData: Writable<UserInputCollectionData> = writable({});
interface Message {
  role: "user" | "assistant";
  content: string;
}
type ChatHistory = Record<string, Message[]>;

const initialChatHistory: ChatHistory = {};

// Create the chatHistory store
export const chatHistory = writable<ChatHistory>(initialChatHistory);

export const selectedContextInfo = writable({
  characters: {},
  plots: {},
});


export const currentMessages = writable([])

export const loadingInfo = writable({ loading: false, message: "nothing is loading" })