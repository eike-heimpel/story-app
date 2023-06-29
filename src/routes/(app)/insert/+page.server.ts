import { error, redirect } from '@sveltejs/kit';
import type { InsertCollectionUnion } from "$lib/collection_info";
import { z } from 'zod';

export const load = ({ locals }) => {
	if (!locals.pb.authStore.isValid) {
		throw redirect(303, '/login');
	}
};

function sanitizeData(data: any) {
    const sanitizedData: any = {};

    Object.keys(data).forEach(key => {
        if (data[key] != null && data[key] !== '') { // checks both for null and undefined, and also removes empty strings
            sanitizedData[key] = data[key];
        }
    });

    return sanitizedData;
}

export const actions = {
	create: async ({ request, locals }) => {

		const formData = await request.formData();
		const collectionName = formData.get("collectionName")
		if (!collectionName) {
			throw error(500, "unable to extract collection name")
		}

		
		let insertData:InsertCollectionUnion = Object.fromEntries(formData)
		insertData = sanitizeData(insertData);


		insertData.user =  locals.user.id;
		try {
			await locals.pb.collection(collectionName).create(insertData);
		} catch (err) {
			console.log('Error: ', err);
			throw error(err.status, err.message);
		}

		throw redirect(303, '/summary');
	}
};


        // const collectionData = await locals.pb.collection(body.collectionName).getFullList({
        //     sort: "-created",
        // })
