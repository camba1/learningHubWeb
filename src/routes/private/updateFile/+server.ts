import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { ExternalURLs } from '$lib/server/utils/externalUrls';
import { APIFileClient } from '$lib/api/apiFileClient';
import { getAuthToken } from '$lib/server/utils/headers';
import { type UpdateFileSchemaType } from '$lib/schemas/files'
import { stringToEncoded } from '$lib/server/utils/fetchUtils';


export const POST: RequestHandler = async ({ request, cookies }) => {
	const { filename, content, fileCategory, parentFilename } = await request.json();
	try {
		const api_client = new APIFileClient(ExternalURLs.update_file);
		const update_body: UpdateFileSchemaType = {
			content,
			fileCategory,
			parentFilename
		}

		return await api_client.update_file(stringToEncoded(filename), update_body, getAuthToken(cookies));
	} catch (err) {

		return error (500, 'Error updating content for file ' + filename);
	}
};
