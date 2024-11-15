import { superValidate, fail, message } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { FileSchema } from '$lib/fileUpload'
import { APIFileClient} from '$lib/api/apiFileClient';
import { ExternalURLs } from '$lib/server/utils/externalUrls';
import { redirect } from '@sveltejs/kit';
import { InternalURLs } from '$lib/utils/urls';
import { getAuthToken } from "$lib/server/utils/headers";




export const load = async () => {
	return {
		form: await superValidate(zod(FileSchema))
	}
};

export const actions = {
	default: async ({ request, cookies }) => {

		const form = await superValidate(request, zod(FileSchema));

		if (!form.valid) {
			return fail(400, { form });
		}

		const file = form.data.file;
		const formData = new FormData();
		formData.append('file', file);

		const api_client = new APIFileClient(ExternalURLs.upload_file);

		const response = await api_client.upload_file(formData, getAuthToken(cookies));
		// console.log(response._key)
		if (response._key) {
			redirect(307, InternalURLs.document + '/' + response._key);
		}

		return message(form, 'Uploaded');
	}
};