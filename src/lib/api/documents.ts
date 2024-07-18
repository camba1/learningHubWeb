import { error } from '@sveltejs/kit';
import { ExternalURLs } from '$lib/server/utils/externalUrls';
import { z } from 'zod';
import { DocumentSchema } from '$lib/documents';
const DOCUMENTS_URL = ExternalURLs.documents;
const DOCUMENT_DETAILS_URL = ExternalURLs.document_details_lookup;

export type Document = z.infer<typeof DocumentSchema>;

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
