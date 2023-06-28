import type { Writable } from "svelte/store";
import {writable} from "svelte/store";
import type { CollectionRecords, CharactersResponse, PlotsResponse, CollectionResponses } from "$lib/pocketbase-types";
import  {Collections} from "$lib/pocketbase-types";

export const collectionResponseMap: Record<Collections, keyof CollectionResponses> = {
  [Collections.Characters]: 'characters',
  [Collections.Plots]: 'plots',
  [Collections.PreviousChats]: "previous_chats",
  [Collections.Users]: 'users',
  [Collections.Test]: "test"
};

export type CollectionDataUnion = CharactersResponse | PlotsResponse; // add new responses as they come along

export type CollectionParam<T extends Collections> = {
    collectionName: T,
    headlineFields: (keyof CollectionRecords[T])[],
    infoField: keyof CollectionRecords[T],

};

export type CollectionPramUnion = CollectionParam<Collections.Characters> | CollectionParam<Collections.Plots>

export const collections: (CollectionParam<Collections.Characters> | CollectionParam<Collections.Plots>)[] = [
  // if we allow users to add collections we need to make this a writable
  {
      collectionName: Collections.Characters,
      headlineFields: ["name", "age"],
      infoField: "one_line_description"
  },
  {
      collectionName: Collections.Plots,
      headlineFields: ["name"],
      infoField: "one_line_description"
  },
];

export const collectionData = writable({}) // need to type this as key can onl ybe collection names and values ony CollectionDataUnion[]

export const websocket: Writable<WebSocket | null> = writable(null);

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