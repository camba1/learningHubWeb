import { superValidate, fail, message } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { FileSchema } from '$lib/fileUpload'
import { writeFile } from 'node:fs/promises';
import path from 'node:path';


export const load = async () => {
	return {
		form: await superValidate(zod(FileSchema))
	}
};

export const actions = {
	default: async ({ request }) => {
	// default: async ({ request }: { request: Request }) => {
		const form = await superValidate(request, zod(FileSchema));

		if (!form.valid) {
			return fail(400, { form });
		}

		// console.log(form.data.file);

		//Save file to uploads directory
		const file = form.data.file
		const filename = path.join('uploads', file.name)
		await writeFile(filename, Buffer.from(await file.arrayBuffer()));

		return message(form, 'Upload complete');
	}
};