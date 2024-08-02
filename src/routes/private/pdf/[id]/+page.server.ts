import { error, fail, redirect } from '@sveltejs/kit';
import fs from 'fs/promises';
import path from 'path';
import { DocumentDetailSchema } from '$lib/documentDetails';
import { documentDetails } from '$lib/documentDetails';
import { message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { DocumentVoices } from '$lib/documentAudio';
import { outputPath } from '$lib/utils/filePath';
import { fetchDocumentDetail, updateDocumentDetail, deleteDocumentDetail} from "$lib/api/documentDetails";



const updateDocumentProcessedSchema = DocumentDetailSchema.extend({
	id: DocumentDetailSchema.shape._key.optional(),
	documentId: DocumentDetailSchema.shape.docMain_key.optional(),
	filename: DocumentDetailSchema.shape.filePath.optional(),
});

export async function load({ params }) {
	// const docDetails = documentDetails.find((d) => d._key == params.id);
	const docDetails = await fetchDocumentDetail(params.id);

	if (params.id && !docDetails) throw error(404, 'Document details not found.');

	const form = await superValidate(docDetails, zod(DocumentDetailSchema));

	const filePath = docDetails?.filePath;
	const base64EncodedPDF = filePath ? await getPdf(filePath) : undefined
	const docVoices = docDetails ? getAudio(docDetails?.docMain_key) : undefined;
	return {
		form,
		pdfData: base64EncodedPDF,
		docVoices,
	};

}

function getAudio(id: string){
	const docVoices = DocumentVoices.filter((d) => d.documentsProcessedId == id);

	return docVoices
}

async function getPdf(filePath: string) {
	const pdfPath = path.join(outputPath, `${filePath}`);
	try {
		const pdfBuffer = await fs.readFile(pdfPath);
		return pdfBuffer.toString('base64')

	} catch (err) {
		if ((err as NodeJS.ErrnoException).code === 'ENOENT') {
			throw error(404, 'PDF not found');
		} else {
			throw error(500, 'Error loading PDF');
		}
	}
}

export const actions = {
	default: async ({ request }) => {

		const formData = await request.formData();
		const form = await superValidate(formData, zod(updateDocumentProcessedSchema));

		if (!form.valid) return fail(400, { form });

		console.log("HERE")
		if (!form.data._key) {
			throw error(405, 'New records cannot be created in this form as they are created automatically');

		} else {
			console.log("MOD")
			// Modify docDetails
			// const index = documentDetails.findIndex((d) => d._key == form.data._key);
			// if (index == -1) throw error(404, 'Document not found.');

			if (formData.has('delete')) {
				console.log("DELETE")
				// DELETE docDetail
				const parentDocumentId = documentDetails[index].docMain_key
				documentDetails.splice(index, 1);
				throw redirect(303, '/document/'.concat(parentDocumentId));

			} else {

				console.log("UPDATE")
				// documentDetails[index].docText = form.data.docText;
				// documentDetails[index].updatedAt = new Date();
				console.log(form.data);
				const docDetail = await updateDocumentDetail(form.data._key, form.data);
				// const updatedForm = await superValidate(documentDetails[index], zod(DocumentDetailSchema));
				const updatedForm = await superValidate(docDetail, zod(DocumentDetailSchema));

				if (!updatedForm.valid) return fail(400, { updatedForm });
				return message(updatedForm, 'Document updated');
			}
		}

		// return { form };
	}
};