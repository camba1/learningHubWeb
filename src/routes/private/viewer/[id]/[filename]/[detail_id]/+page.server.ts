import { getViewerData } from '$lib/utils/viewerData';


export async function load({ params, cookies }) {
	return getViewerData(false, params.id ?? '', params.detail_id, params.filename, cookies)
}