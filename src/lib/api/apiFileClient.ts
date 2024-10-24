import { error, json } from '@sveltejs/kit';
import { getMainHeader } from '$lib/server/utils/headers';

export class APIFileClient {
	baseURL: string;

	constructor(baseURL: string) {
		this.baseURL = baseURL;
	}

	// private getHeader() {
	// 	return getMainHeader();
	// }

	async upload_file( form_data:  FormData, auth:string | undefined ) {

		const options: RequestInit = {
			method: 'POST',
			headers: getMainHeader(auth),
			body: form_data
		};
		const response = await fetch(this.baseURL, options);

		if (!response.ok) {
			throw error(response.status, await response.text());
		}
		return await response.json();
	}

	async download_file( filename: string, auth:string | undefined, file_category: string = 'document' ) {

		try {
			const headers = getMainHeader(auth);
			headers.append('accept',  'application/json')

			const response = await fetch(`${this.baseURL}/${file_category}/${filename}`, {
				headers: headers
			});

			if (!response.ok) {
				// throw new Error(`Error fetching PDF: ${response.status}`);
				console.error('Error proxying file:', await response.text());
				return json({ error: 'Error fetching file' }, { status: response.status });
			}

			const contentType = response.headers.get('content-type') || 'application/octet-stream';
			const pdfBlob = await response.blob();

			return new Response(pdfBlob.stream(), {
				headers: {
					'Content-Type': contentType,
					'Content-Disposition': `inline; filename="${filename}"`
				}
			});
		} catch (error) {
			console.error('Error proxying file:', error);
			return json({ error: 'Failed to load file.' }, { status: 500 });
		}
	}

}


