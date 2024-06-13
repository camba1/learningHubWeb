import { superValidate, fail, message } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { FileSchema } from '$lib/fileUpload'
import { writeFile } from 'node:fs/promises';
import path from 'node:path';
import { uploadPath } from '$lib/utils/filePath';


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

		//Save file to uploads directory
		const file = form.data.file
		const filename = path.join(uploadPath, file.name)


		await writeFile(filename, Buffer.from(await file.arrayBuffer()));

		return message(form, 'Upload complete');
	}
};