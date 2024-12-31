import { fetchDocumentDetailPages } from '$lib/api/documentDetailPages';
import { fetchDocumentDetail } from '$lib/api/documentDetails';
import { getAuthToken } from '$lib/server/utils/headers';
import { fetchDocumentImageLookup } from '$lib/api/documents';
import { type Cookies, error } from '@sveltejs/kit';
import type { PageSchemaType } from '$lib/schemas/documentDetailPages';
import type { DocumentImageSchemaType } from '$lib/schemas/documentImages';

export async function getViewerData(editable: boolean = false, document_key: string,
																		docDetail_key: string, parentFilename: string, cookies: Cookies) {
	let docDetailPages = null;
	let docImages = null;
	let docDetail = null;

	if (document_key) {
		[docDetail, docDetailPages, docImages] = await Promise.all([
			fetchDocumentDetail(docDetail_key, getAuthToken(cookies)),
			fetchDocumentDetailPages(getAuthToken(cookies),0, 10, "created_at", "desc", docDetail_key),
			fetchDocumentImageLookup(document_key, getAuthToken(cookies),0,0, 1000, "pageNumber")
		]);
	}
	if (!docDetail || !docDetail.filename) throw error(404, 'Document details not found.');
	if (docDetailPages && docDetailPages.length > 1) throw error(404, 'Found more than one pages detail record');

	let availableFiles: PageSchemaType[] = [];
	let number_of_pages = 0;
	if (docDetailPages && docDetailPages.length == 1) {
		availableFiles = docDetailPages[0].pages
		availableFiles.sort((a, b) => a.number - b.number);
		number_of_pages = availableFiles.length
	}

	let availableImages: DocumentImageSchemaType[] = [];
	if (docImages) {
		availableImages = docImages;
	}

	return {
		editable: editable,
		parentFilename: parentFilename,
		number_of_pages: number_of_pages,
		availableFiles: availableFiles,
		availableImages: availableImages,
		filename:docDetail.filename
	};
}