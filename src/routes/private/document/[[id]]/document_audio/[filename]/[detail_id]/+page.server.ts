import { getAuthToken } from '$lib/server/utils/headers';
import { fetchDocumentDetailPages } from '$lib/api/documentDetailPages';
import { error } from '@sveltejs/kit';
import type { PageSchemaType } from '$lib/schemas/documentDetailPages';

export async function load({ params, cookies, url }) {

	let initial_page_number: number = 0
	if ((url.searchParams.has("page")) && url.searchParams.get("page")) {
		initial_page_number = +(url.searchParams.get("page") ?? 0);
	}

	const docDetailPages = await fetchDocumentDetailPages(getAuthToken(cookies),0, 10, "created_at", "desc", params.detail_id)

	if (docDetailPages && docDetailPages.length > 1) throw error(404, 'Found more than one pages detail record');

	let availableFiles: PageSchemaType[] = [];
	if (docDetailPages.length == 1) {
		availableFiles = docDetailPages[0].pages
		availableFiles = availableFiles.filter(file => file.number === initial_page_number);
	}

	return {
		filename: params.filename,
		availableFiles: availableFiles
	};
}