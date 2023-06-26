/**
* This file was @generated using pocketbase-typegen
*/

export enum Collections {
	Characters = "characters",
	Plots = "plots",
	PreviousChats = "previous_chats",
	Test = "test",
	Users = "users",
}

// Alias types for improved usability
export type IsoDateString = string
export type RecordIdString = string
export type HTMLString = string

// System fields
export type BaseSystemFields<T = never> = {
	id: RecordIdString
	created: IsoDateString
	updated: IsoDateString
	collectionId: string
	collectionName: Collections
	expand?: T
}

export type AuthSystemFields<T = never> = {
	email: string
	emailVisibility: boolean
	username: string
	verified: boolean
} & BaseSystemFields<T>

// Record types for each collection

export type CharactersRecord = {
	core_cast?: boolean
	age?: number
	long_description?: string
	short_description?: string
	one_line_description?: string
	name?: string
	birthdate?: IsoDateString
	plots?: RecordIdString[]
}

export type PlotsRecord = {
	name?: string
	short_description?: string
	one_line_description?: string
	long_description?: string
	date?: IsoDateString
	chracters?: RecordIdString[]
}

export type PreviousChatsRecord<Tmessages = unknown> = {
	messages?: null | Tmessages
}

export type TestRecord = {
	test?: string
}

export type UsersRecord = {
	name?: string
	avatar?: string
}

// Response types include system fields and match responses from the PocketBase API
export type CharactersResponse<Texpand = unknown> = Required<CharactersRecord> & BaseSystemFields<Texpand>
export type PlotsResponse<Texpand = unknown> = Required<PlotsRecord> & BaseSystemFields<Texpand>
export type PreviousChatsResponse<Tmessages = unknown, Texpand = unknown> = Required<PreviousChatsRecord<Tmessages>> & BaseSystemFields<Texpand>
export type TestResponse<Texpand = unknown> = Required<TestRecord> & BaseSystemFields<Texpand>
export type UsersResponse<Texpand = unknown> = Required<UsersRecord> & AuthSystemFields<Texpand>

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
	characters: CharactersRecord
	plots: PlotsRecord
	previous_chats: PreviousChatsRecord
	test: TestRecord
	users: UsersRecord
}

export type CollectionResponses = {
	characters: CharactersResponse
	plots: PlotsResponse
	previous_chats: PreviousChatsResponse
	test: TestResponse
	users: UsersResponse
}