
import { json } from '@sveltejs/kit'
import { error, redirect } from '@sveltejs/kit';


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

export const POST = async ( {request, locals}) => {

    const { collectionName, infoToSave } = await request.json()

    if (!locals.pb) {
        return json({})
    }

    infoToSave.user = locals.user.id;

    try {
        await locals.pb.collection(collectionName).create(infoToSave);
        return json({"message": "success"}, { status: 201 })
    } catch (err) {
        return json({"message": "unable to create entry", "error": JSON.stringify(err)}, { status: 422 })
    }

}