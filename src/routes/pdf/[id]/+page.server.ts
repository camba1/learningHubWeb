import { error } from '@sveltejs/kit';
import fs from 'fs/promises';
import path from 'path';

export async function load({ params }) {
	const filename = params.id;
	const pdfPath = path.join('uploads', `${filename}.pdf`);
	console.log(params);

	try {
		const pdfBuffer = await fs.readFile(pdfPath);
		const base64EncodedPDF = pdfBuffer.toString('base64');

		return {
			body: {
				pdfData: base64EncodedPDF,
			},
		};
	} catch (err) {
		if ((err as NodeJS.ErrnoException).code === 'ENOENT') {
			throw error(404, 'PDF not found');
		} else {
			throw error(500, 'Error loading PDF');
		}
	}
}