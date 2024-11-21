import { env } from '$env/dynamic/private'

/**
 * The URL of the backend server, retrieved from environment variables.
 */
const backendUrl:string= env.BACKEND_URL || "http://127.0.0.1:8000/private"

/*
 * The token used to authenticate with the backend server. This is needed in addition to the user jwt.
 */
export const backendXToken = env.BL_BACKEND_API_KEY || "secret-token"

/**
 * A collection of external URLs related to the different backend APIs.
 */
export const ExternalURLs = {
	backendUrl: backendUrl,
	agent: backendUrl.concat("/agent"),
	characters: backendUrl.concat("/characters"),
	characters_documents: backendUrl.concat("/characters/characters_documents/"),
	characters_documents_by_character: backendUrl.concat("/characters/{key}/documents_by_character_lookup/"),
	chat: backendUrl.concat("/chat"),
	documents: backendUrl.concat("/documents"),
	document_characters: backendUrl.concat("/document_characters"),
	document_character_lookup: backendUrl.concat("/documents/{key}/document_character_lookup"),
	document_details_lookup: backendUrl.concat("/documents/{key}/document_details_lookup"),
	document_details: backendUrl.concat("/document_details"),
	document_detail_pages: backendUrl.concat("/document_details_page"),
	document_details_from_doc: backendUrl.concat("/documents/{key}/document_details_from_doc"),
	document_locations: backendUrl.concat("/document_locations"),
	document_location_lookup: backendUrl.concat("/documents/{key}/document_location_lookup"),
	document_images: backendUrl.concat("/document_images"),
	document_image_lookup: backendUrl.concat("/documents/{key}/document_image_lookup"),
	download_file: backendUrl.concat("/download_file"),
	organizations: backendUrl.concat("/organizations"),
	upload_file: backendUrl.concat("/upload_file"),
	users: backendUrl.concat("/users"),
	update_file: backendUrl.concat("/update_file"),
}