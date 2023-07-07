import { writable, type Writable } from "svelte/store";
import type { UserInputCollections } from "$lib//collection_schemas/user_input_collections";
import { type InsertCollectionUnion, collections } from "$lib/collection_schemas";

type ContextInfo = {
  inContext: boolean;
  contextField: string;
};

type CollectionItem = {
  contextInfo: {
    inContext: boolean;
    contextField: string;
  };
  data: InsertCollectionUnion;
};

export type CollectionDataStore = Partial<Record<UserInputCollections, CollectionItem[]>>;

const initialData: CollectionDataStore = Object.keys(collections).reduce((acc, key) => {
  acc[key as UserInputCollections] = [];
  return acc;
}, {} as CollectionDataStore);

export const collectionData: Writable<CollectionDataStore> = writable(initialData);

interface Message {
  role: "user" | "assistant";
  content: string;
}
type ChatHistory = Record<string, Message[]>;

const initialChatHistory: ChatHistory = {};

// Create the chatHistory store
export const chatHistory = writable<ChatHistory>(initialChatHistory);

export const currentMessages = writable([]);

export const loadingInfo = writable({ loading: false, message: "nothing is loading" });
