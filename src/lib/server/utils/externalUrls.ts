import { env } from '$env/dynamic/private'

export const DEFAULT_SKIP = 0;
export const DEFAULT_LIMIT = 25;

const backendUrl:string= env.BACKEND_URL

export const ExternalURLs = {
	backendUrl: backendUrl,
	documents: backendUrl.concat("/documents"),
	document_details_lookup: backendUrl.concat("/documents/{key}/document_details_lookup"),
	document_details: backendUrl.concat("/document_details"),
	users: backendUrl.concat("/users"),
	organizations: backendUrl.concat("/organizations"),
	agent: backendUrl.concat("/agent"),
	chat: backendUrl.concat("/chat")
}