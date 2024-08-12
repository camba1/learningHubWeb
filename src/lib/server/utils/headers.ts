export function getMainHeader(content_type: string | null = null) {
	const headers = new Headers();
	if (content_type) {
		headers.append('Content-Type', content_type);
	}
	headers.append('x-token', 'secret-token');
	return headers;
}