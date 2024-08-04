import { error } from '@sveltejs/kit';
import { ExternalURLs } from '$lib/server/utils/externalUrls';
import { APIFileClient } from '$lib/api/apiFileClient';

export const GET = async ({ request }) => {
	const url = new URL(request.url);
	const filename = url.searchParams.get('filename') || "";
	if (filename == "") throw error(404, 'Filename not found.');

	const encodedFilename = _stringToEncoded(filename)
	const api_client = new APIFileClient(ExternalURLs.download_file);
	return api_client.download_file(encodedFilename);
};

function _stringToEncoded(str: string) {
	const urlEncodedRegex = /%[0-9A-Fa-f]{2}/;

	if(urlEncodedRegex.test(str)){
		return str;
	} else {
		return encodeURIComponent(str);
	}
}