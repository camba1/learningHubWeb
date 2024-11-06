import { error, json } from '@sveltejs/kit';
import { getMainHeader } from '$lib/server/utils/headers';
import { type UpdateFileSchemaType } from '$lib/schemas/files'

export class APIFileClient {
	baseURL: string;

	constructor(baseURL: string) {
		this.baseURL = baseURL;
	}

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

	async download_file( filename: string, auth:string | undefined,
											 file_category: string = 'document', parent_filename: string = '' ) {

		try {
			const headers = getMainHeader(auth);
			headers.append('accept',  'application/json')

			let url = `${this.baseURL}/${file_category}/${filename}`

			if (parent_filename) {
				url = `${this.baseURL}/${file_category}/${filename}?parent_filename=${parent_filename}`
			}
			const response = await fetch(url, {
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
			return json({ error: 'Failed to load file.' }, { status: 500 });
		}
	}
	async update_file( filename: string, update_file_info:  UpdateFileSchemaType,
										 auth:string | undefined ) {

		const options: RequestInit = {
			method: 'POST',
			headers: getMainHeader(auth, 'application/json'),
			body: JSON.stringify(update_file_info)
		};
		const response = await fetch(`${this.baseURL}/${filename}`, options);

		if (!response.ok) {
			throw error(response.status, await response.text());
		}

		// return await response.json()
		return response;
	}
}
