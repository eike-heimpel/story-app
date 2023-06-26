import type { Writable } from "svelte/store";
import {writable} from "svelte/store";
import type PocketBase from "pocketbase";
import type { CollectionRecords, CharactersResponse, PlotsResponse, CollectionResponses } from "$lib/pocketbase-types";
import  {Collections} from "$lib/pocketbase-types";

export const collectionResponseMap: Record<Collections, keyof CollectionResponses> = {
  [Collections.Characters]: 'characters',
  [Collections.Plots]: 'plots',
  [Collections.Responses]: 'responses',
  [Collections.Users]: 'users',
};

export type CollectionDataUnion = CharactersResponse | PlotsResponse; // add new responses as they come along

export type CollectionParam<T extends Collections> = {
    collectionName: T,
    headlineFields: (keyof CollectionRecords[T])[],
    infoField: keyof CollectionRecords[T],

};

export type CollectionPramUnion = CollectionParams<Collections.Characters> | CollectionParam<Collections.Plots>

export const collections: (CollectionParam<Collections.Characters> | CollectionParam<Collections.Plots>)[] = [
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

export const websocket: Writable<WebSocket | null> = writable(null);
export const pb: Writable<PocketBase | null> = writable(null);

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

export const STORY_PRE_PROMT = writable(`"Here is a summary of the story so far: 
    SUMMARY:
    In 'The Chronicles of Sunnyside,' 
    a close-knit village faces various challenges, with each narrative highlighting the unique abilities and personalities of its residents. 
    The vibrant characters range from Evelyn, the wise elder, to Samuel, the diligent carpenter, each providing a unique skill set and perspective that contributes to the prosperity of Sunnyside. 
    As they navigate severe droughts, harsh winters, and missing pets, they learn to leverage their shared histories and individual strengths to overcome hardship. 
    This heartwarming novel unfolds against a backdrop of camaraderie, adventure, and the resilience of the human spirit, exploring the power of unity and friendship in the face of adversity."
    ------
`)