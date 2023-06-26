import type { RequestHandler } from './$types';
import PocketBase from 'pocketbase';
import { json } from '@sveltejs/kit'


export const GET = async ( {url, locals} ) => {

    const params = url.searchParams;

    if (!locals.pb) {
        return json({})
    }
    const collectionData = await locals.pb.collection(params.get("collectionName")).getFullList({
        sort: "-created",
    })
    return json(collectionData)
};