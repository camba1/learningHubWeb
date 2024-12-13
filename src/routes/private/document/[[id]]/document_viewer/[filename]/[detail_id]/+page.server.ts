import { error } from '@sveltejs/kit';
import { fetchDocumentDetailPages } from '$lib/api/documentDetailPages';
import type { PageSchemaType } from '$lib/schemas/documentDetailPages';
import { type DocumentImageSchemaType } from '$lib/schemas/documentImages';
import { getAuthToken } from "$lib/server/utils/headers";
import { fetchDocumentImageLookup } from '$lib/api/documents';


export async function load({ params, cookies, url }) {

	let docDetailPages = null;
	let docImages = null;

	let editable: boolean = false;
	if ((url.searchParams.has("edit")) && url.searchParams.get("edit")) {
		const edit_param = url.searchParams.get("edit") ?? "false";
		if (edit_param === "true") {
			editable = true;
		}
	}

	if (params.id) {
		[docDetailPages, docImages] = await Promise.all([
			fetchDocumentDetailPages(getAuthToken(cookies),0, 10, "created_at", "desc", params.detail_id),
			fetchDocumentImageLookup(params.id, getAuthToken(cookies),0,0, 1000, "pageNumber")
		]);
	}
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
		// availableImages.sort((a, b) => a.pageNumber - b.pageNumber);
	}

	return {
		editable: editable,
		parentFilename: params.filename,
		number_of_pages: number_of_pages,
		availableFiles: availableFiles,
		availableImages: availableImages
	};

}