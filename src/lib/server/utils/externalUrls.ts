import { env } from '$env/dynamic/private'

const backendUrl:string= env.BACKEND_URL //? env.BACKEND_URL:"http://127.0.0.1:8000"

export const ExternalURLs = {
	backendUrl: backendUrl,
	agent: backendUrl.concat("/agent")
}