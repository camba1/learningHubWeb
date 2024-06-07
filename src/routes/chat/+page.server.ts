import {messages, type MessageDB} from '$lib/message';


export const load = async ( ) => {
	const form: MessageDB = {
		name: "user",
		msg: "",
		role: "user",
		time: "12:45",
		status: "delivered"
	}

	return { form, messages };
}