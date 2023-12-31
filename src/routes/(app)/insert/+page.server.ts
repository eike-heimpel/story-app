import { error, redirect } from '@sveltejs/kit';

export const load = ({ locals }) => {
	if (!locals.pb.authStore.isValid) {
		throw redirect(303, '/login');
	}
};

export const actions = {
	create: async ({ request, locals }) => {

		const formData = await request.formData();
		formData.append('user', locals.user.id);
		try {
			await locals.pb.collection(formData.get("collectionName")).create(formData);
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
