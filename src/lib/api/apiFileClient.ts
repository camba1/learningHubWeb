import { error } from '@sveltejs/kit';
import { ExternalURLs } from '$lib/server/utils/externalUrls';

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

		const full_url = `${this.baseURL}/${filename}`; // url/_
		const response = await fetch(full_url, {
			method: 'GET',
			headers: this.getHeaders(),
		});

		if (!response.ok) {
			throw error(response.status, await response.text());
		}

		const blob = await response.blob(); // Get the file as a Blob
		const dataUrl = URL.createObjectURL(blob); // Create a URL for the blob

		return new Response(JSON.stringify({ dataUrl }), {
			headers: {
				'Content-Type': 'application/json'
			}
		})
	}

}


