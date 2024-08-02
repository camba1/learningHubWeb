import { superValidate, fail, message } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { FileSchema } from '$lib/fileUpload'
import { APIFileClient} from '$lib/api/apiFileClient';
import { ExternalURLs } from '$lib/server/utils/externalUrls';


export const load = async () => {
	return {
		form: await superValidate(zod(FileSchema))
	}
};

export const actions = {
	default: async ({ request }) => {

		const form = await superValidate(request, zod(FileSchema));

		if (!form.valid) {
			return fail(400, { form });
		}

		const file = form.data.file;
		const formData = new FormData();
		formData.append('file', file);

		const api_client = new APIFileClient(ExternalURLs.upload_file);

		const response = await api_client.upload_file(formData);
		console.log(response)

		return message(form, 'Upload complete');
	}
};