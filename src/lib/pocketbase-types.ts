/**
* This file was @generated using pocketbase-typegen
*/

export enum Collections {
	Characters = "characters",
	Plots = "plots",
	Responses = "responses",
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
	name: string
	long_description: string
	birthdate?: IsoDateString
	age?: number
	core_cast?: boolean
	short_description?: string
	one_line_description?: string
}

export type PlotsRecord = {
	long_description: string
	date?: IsoDateString
	short_description?: string
	one_line_description?: string
	name: string
}

export type ResponsesRecord = {
	message?: string
}

export type UsersRecord = {
	name?: string
	avatar?: string
}

// Response types include system fields and match responses from the PocketBase API
export type CharactersResponse<Texpand = unknown> = Required<CharactersRecord> & BaseSystemFields<Texpand>
export type PlotsResponse<Texpand = unknown> = Required<PlotsRecord> & BaseSystemFields<Texpand>
export type ResponsesResponse<Texpand = unknown> = Required<ResponsesRecord> & BaseSystemFields<Texpand>
export type UsersResponse<Texpand = unknown> = Required<UsersRecord> & AuthSystemFields<Texpand>

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
	characters: CharactersRecord
	plots: PlotsRecord
	responses: ResponsesRecord
	users: UsersRecord
}

export type CollectionResponses = {
	characters: CharactersResponse
	plots: PlotsResponse
	responses: ResponsesResponse
	users: UsersResponse
}