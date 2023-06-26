
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

export const POST = async ( {locals}) => {

    if (!locals.pb) {
        return json({})
    }
    console.log(pb)
    const collectionData = await locals.pb.collection(params.get("collectionName")).getFullList({
        sort: "-created",
    })
    return json({"message": "success"})

}