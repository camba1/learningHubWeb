import { error, fail, redirect } from '@sveltejs/kit';
import { DocumentDetailSchema } from '$lib/schemas/documentDetails';
import { documentDetails } from '$lib/schemas/documentDetails';
import { message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { DocumentVoices } from '$lib/schemas/documentAudio';
import { fetchDocumentDetail, updateDocumentDetail} from "$lib/api/documentDetails";

const availableFiles = [
	{ friendlyName: 'Page 1', filename: 'Three Billy Goats Gruff – CKF_0.txt', audioFilename: 'Three Billy Goats Gruff – CKF_17.flac', speaker: 'Thalia' },
	{ friendlyName: 'Page 2', filename: 'Three Billy Goats Gruff – CKF_1.txt', audioFilename: 'Three Billy Goats Gruff – CKF_18.flac', speaker: 'Jane' },
	{ friendlyName: 'Page 3', filename: 'Three Billy Goats Gruff – CKF_2.txt', audioFilename: 'Three Billy Goats Gruff – CKF_17.flac', speaker: 'Maria' },
	{ friendlyName: 'Page 4', filename: 'Three Billy Goats Gruff – CKF_3.txt', audioFilename: 'Three Billy Goats Gruff – CKF_17.flac', speaker: 'Thalia' },
	{ friendlyName: 'Page 5', filename: 'Three Billy Goats Gruff – CKF_4.txt', audioFilename: 'Three Billy Goats Gruff – CKF_17.flac', speaker: 'Thalia' }
];

const updateDocumentProcessedSchema = DocumentDetailSchema.extend({
	id: DocumentDetailSchema.shape._key.optional(),
	documentId: DocumentDetailSchema.shape.docMain_key.optional(),
	filename: DocumentDetailSchema.shape.filePath.optional(),
});

export async function load({ params, url }) {
	// const docDetails = documentDetails.find((d) => d._key == params.id);
	if (!url.searchParams.has("filename")) throw error(404, 'Filename not found.');

	const docDetails = await fetchDocumentDetail(params.id);
	if (params.id && !docDetails) throw error(404, 'Document details not found.');

	const form = await superValidate(docDetails, zod(DocumentDetailSchema));

	const docVoices = docDetails ? getAudio(docDetails?.docMain_key) : undefined;

	const filename = url.searchParams.get("filename") || "";

	return {
		form,
		filename: filename,
		docVoices,
		availableFiles
	};

}

function getAudio(id: string){
	const docVoices = DocumentVoices.filter((d) => d.documentsProcessedId == id);

	return docVoices
}

export const actions = {
	default: async ({ request }) => {

		const formData = await request.formData();
		const form = await superValidate(formData, zod(updateDocumentProcessedSchema));

		if (!form.valid) return fail(400, { form });

		if (!form.data._key) {
			throw error(405, 'New records cannot be created in this form as they are created automatically');

		} else {
			// Modify docDetails
			const index = documentDetails.findIndex((d) => d._key == form.data._key);
			// if (index == -1) throw error(404, 'Document not found.');

			if (formData.has('delete')) {
				console.log("DELETE")
				// DELETE docDetail
				const parentDocumentId = documentDetails[index].docMain_key
				documentDetails.splice(index, 1);
				throw redirect(303, '/document/'.concat(parentDocumentId));

			} else {

				console.log("UPDATE")
				console.log(form.data);
				const docDetail = await updateDocumentDetail(form.data._key, form.data);
				const updatedForm = await superValidate(docDetail, zod(DocumentDetailSchema));

				if (!updatedForm.valid) return fail(400, { updatedForm });
				return message(updatedForm, 'Document updated');
			}
		}

		// return { form };
	}
};