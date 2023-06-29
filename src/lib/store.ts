import {writable} from "svelte/store";


export const collectionData = writable({}) // need to type this as key can onl ybe collection names and values ony CollectionDataUnion[]

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