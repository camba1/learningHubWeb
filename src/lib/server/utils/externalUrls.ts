import { env } from '$env/dynamic/private'

const backendUrl:string= env.BACKEND_URL

export const ExternalURLs = {
	backendUrl: backendUrl,
	documents: backendUrl.concat("/documents"),
	document_details: backendUrl.concat("/document_details"),
	users: backendUrl.concat("/users"),
	organizations: backendUrl.concat("/organizations")
}