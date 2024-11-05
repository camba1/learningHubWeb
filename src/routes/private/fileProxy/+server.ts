import { error } from '@sveltejs/kit';
import { ExternalURLs } from '$lib/server/utils/externalUrls';
import { APIFileClient } from '$lib/api/apiFileClient';
import { getAuthToken } from '$lib/server/utils/headers';
import { stringToEncoded } from '$lib/server/utils/fetchUtils';

export const GET = async ({ request,cookies }) => {
	const url = new URL(request.url);
	const filename = url.searchParams.get('filename') || "";
	const file_category = url.searchParams.get('file_category') || "document";
	const parent_filename = url.searchParams.get('parent_filename') || "";
	if (filename == "") throw error(404, 'Filename not found.');

	const encodedFilename = stringToEncoded(filename)
	const encodedFileCategory = stringToEncoded(file_category)
	const api_client = new APIFileClient(ExternalURLs.download_file);

	return api_client.download_file(encodedFilename, getAuthToken(cookies), encodedFileCategory, parent_filename);
};
