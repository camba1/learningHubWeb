import { error } from '@sveltejs/kit';
import { ExternalURLs } from '$lib/server/utils/externalUrls';
import { APIFileClient } from '$lib/api/apiFileClient';
import { getAuthToken } from '$lib/server/utils/headers';

export const GET = async ({ request,cookies }) => {
	const url = new URL(request.url);
	const filename = url.searchParams.get('filename') || "";
	const file_category = url.searchParams.get('file_category') || "document";
	const parent_filename = url.searchParams.get('parent_filename') || "";
	if (filename == "") throw error(404, 'Filename not found.');

	const encodedFilename = _stringToEncoded(filename)
	const encodedFileCategory = _stringToEncoded(file_category)
	const api_client = new APIFileClient(ExternalURLs.download_file);
	console.log("parent_filename: ", parent_filename)
	return api_client.download_file(encodedFilename, getAuthToken(cookies), encodedFileCategory, parent_filename);
};

function _stringToEncoded(str: string) {
	const urlEncodedRegex = /%[0-9A-Fa-f]{2}/;

	if(urlEncodedRegex.test(str)){
		return str;
	} else {
		return encodeURIComponent(str);
	}
}