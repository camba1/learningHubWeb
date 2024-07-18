import { error } from '@sveltejs/kit';
import { ExternalURLs } from '$lib/server/utils/externalUrls';
import { z } from 'zod';
import { DocumentSchema } from '$lib/documents';

export type Document = z.infer<typeof DocumentSchema>;

const DOCUMENTS_URL = ExternalURLs.documents;
const DOCUMENT_DETAILS_URL = ExternalURLs.document_details_lookup;

const DEFAULT_SKIP = 0;
const DEFAULT_LIMIT = 25;



function get_header() {
	const headers = new Headers();
	headers.append('Content-Type', 'application/json');
	headers.append('x-token','secret-token');
	return headers;
}

export async function fetchDocument(id: string) {
	const response = await fetch(`${DOCUMENTS_URL}/${id}`,
		{ headers: get_header() }
		);
	if (!response.ok) {
		throw error(response.status, await response.text());
	}
	return response.json();
}

export async function createDocument(data: Document) {
	const response = await fetch(`${DOCUMENTS_URL}`, {
		method: 'POST',
		headers: get_header(),
		body: JSON.stringify(data)
	});
	if (!response.ok) {
		throw error(response.status, await response.text());
	}
	return response.json();
}

export async function updateDocument(id: string, data: Document) {
	const response = await fetch(`${DOCUMENTS_URL}/${id}`, {
		method: 'PUT',
		headers: get_header(),
		body: JSON.stringify(data)
	});
	if (!response.ok) {
		throw error(response.status, await response.text());
	}
	return response.json();
}

export async function deleteDocument(id: string) {
	const response = await fetch(`${DOCUMENTS_URL}/${id}`, {
		method: 'DELETE',
		headers: get_header()
	});
	if (!response.ok) {
		throw error(response.status, await response.text());
	}
	return response.status;
}

export async function fetchDocumentDetailsLookup(id: string) {
	const url = DOCUMENT_DETAILS_URL.replace('{document_key}', id);
	const response = await fetch(url,
		{ headers: get_header() }
	);
	if (!response.ok) {
		throw error(response.status, await response.text());
	}
	return response.json();
}

export async function fetchDocuments( skip = DEFAULT_SKIP, limit = DEFAULT_LIMIT,
																			 sort_by: string = '', sort_order = 'asc',
																			 title: string = '', age_group: string = '', type: string = '',
																			 created_by: string = '', updated_by: string = '' ) {
	const params = new URLSearchParams();

	params.append('skip', skip.toString());
	params.append('limit', limit.toString());
	if (sort_by) params.append('sort_by', sort_by);
	if (sort_order) params.append('sort_order', sort_order);
	if (title) params.append('title', title);
	if (age_group) params.append('age_group', age_group);
	if (type) params.append('type', type);
	if (created_by) params.append('created_by', created_by);
	if (updated_by) params.append('updated_by', updated_by);

	const response = await fetch(`${DOCUMENTS_URL}?${params.toString()}`,
		{ headers: get_header() }
	);

	if (!response.ok) {
		throw error(response.status, await response.text());
	}

	return response.json();
}