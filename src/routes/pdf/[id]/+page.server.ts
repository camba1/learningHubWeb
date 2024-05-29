import { error, fail, redirect } from '@sveltejs/kit';
import fs from 'fs/promises';
import path from 'path';
import { DocumentsProcessedSchema } from '$lib/documentsProcessed';
import { documentsProcessed } from '$lib/documentsProcessed';
import { message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';




const updateDocumentProcessedSchema = DocumentsProcessedSchema.extend({
	id: DocumentsProcessedSchema.shape.id.optional(),
	documentId: DocumentsProcessedSchema.shape.documentId.optional(),
	pageCount: DocumentsProcessedSchema.shape.pageCount.optional(),
	filename: DocumentsProcessedSchema.shape.filename.optional(),
});

export async function load({ params }) {
	const docDetails = documentsProcessed.find((d) => d.id == params.id);

	if (params.id && !docDetails) throw error(404, 'Document details not found.');

	const form = await superValidate(docDetails, zod(DocumentsProcessedSchema));
	const filename = docDetails?.filename;
	const base64EncodedPDF = filename ? await getPdf(filename) : undefined
	return {
		form,
		// docDetails,
		pdfData: base64EncodedPDF,
	};

}

async function getPdf(filename: string) {
	const pdfPath = path.join('uploads', `${filename}`);
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
		console.log('HERHEHREHE')
		const formData = await request.formData();
		const form = await superValidate(formData, zod(updateDocumentProcessedSchema));

		if (!form.valid) return fail(400, { form });

		if (!form.data.id) {
			throw error(405, 'New records cannot be created in this form as they are created automatically');

		} else {
			// UPDATE user
			const index = documentsProcessed.findIndex((d) => d.id == form.data.id);
			if (index == -1) throw error(404, 'Document not found.');

			if (formData.has('delete')) {
				// DELETE user
				const parentDocumentId = documentsProcessed[index].documentId
				documentsProcessed.splice(index, 1);
				throw redirect(303, '/document/'.concat(parentDocumentId));

			} else {
				documentsProcessed[index].docText = form.data.docText;
				documentsProcessed[index].updatedAt = new Date();

				const updatedForm = await superValidate(documentsProcessed[index], zod(DocumentsProcessedSchema));

				if (!updatedForm.valid) return fail(400, { updatedForm });
				return message(updatedForm, 'Document updated');
			}
		}

		// return { form };
	}
};