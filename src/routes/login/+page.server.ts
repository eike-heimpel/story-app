import type { PageServerLoad } from './$types';
import { error, redirect } from '@sveltejs/kit';

export const actions = {
	default: async ({ request, locals }) => {
		const body = Object.fromEntries(await request.formData());

		try {
			const auth = await locals.pb.collection('users').authWithPassword(body.userName, body.password);
            console.log
			if (!locals.pb?.authStore?.model?.verified) {
				locals.pb.authStore.clear();
				return {
					notVerified: true
				};
			}
		} catch (err) {
			console.log('Error: ', err);
			throw error(500, 'Something went wrong logging in');
		}

		throw redirect(303, '/');
	}}