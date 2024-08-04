import { error, json } from '@sveltejs/kit';

export class APIFileClient {
	baseURL: string;

	constructor(baseURL: string) {
		this.baseURL = baseURL;
	}

	private getHeader() {
		const headers = new Headers();
		headers.append('x-token', 'secret-token');
		return headers;
	}

	async upload_file( form_data:  FormData ) {

		const options: RequestInit = {
			method: 'POST',
			headers: this.getHeader(),
			body: form_data
		};
		const response = await fetch(this.baseURL, options);

		if (!response.ok) {
			throw error(response.status, await response.text());
		}
		return await response.json();
	}

	async download_file( filename: string) {

		try {
			const headers = this.getHeader();
			headers.append('accept',  'application/json')

			const response = await fetch(`${this.baseURL}/${filename}`, {
				headers: headers
			});

			if (!response.ok) {
				// throw new Error(`Error fetching PDF: ${response.status}`);
				console.error('Error proxying PDF:', await response.text());
				return json({ error: 'Error fetching PDF' }, { status: response.status });
			}

			const pdfBlob = await response.blob();

			return new Response(pdfBlob.stream(), {
				headers: {
					'Content-Type': 'application/pdf',
					'Content-Disposition': `inline; filename="${filename}"`
				}
			});
		} catch (error) {
			console.error('Error proxying PDF:', error);
			return json({ error: 'Failed to load PDF.' }, { status: 500 });
		}
	}

}


