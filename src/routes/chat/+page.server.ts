// import {messages, type MessageDB, MessageSchema} from '$lib/message';
// import { message, superValidate } from 'sveltekit-superforms';
// import { zod } from 'sveltekit-superforms/adapters';
//
//
// export const load = async ( ) => {
// 	const form: MessageDB = {
// 		name: "user",
// 		msg: "",
// 		role: "user",
// 		time: "12:45",
// 		status: "delivered"
// 	}
//
// 	return { form, messages };
// }
//
// export const actions = {
// 	default: async ({ request }) => {
// 		const formData = await request.formData();
// 		const form = await superValidate(formData, zod(MessageSchema));
// 		console.log(form.data.msg)
// 		return message(form, 'Document updated');
// 	}
// }

// +page.server.ts
import { superValidate } from 'sveltekit-superforms';
import { fail } from '@sveltejs/kit';
import { z } from 'zod';
// import type { Actions, PageServerLoad } from './$types';
import { zod } from 'sveltekit-superforms/adapters';



const schema = z.object({
	messageText: z.string().trim().min(1),
	role: z.enum(['user', 'assistant']),
});
export type myschema = z.infer<typeof schema>

const messages: myschema[] = [];

export const load = async () => {
	const form: myschema = {messageText: '', role: 'assistant'}
	return {
		form,
		messages
	};
};

export const actions = {
	default: async ({ request }) => {
		console.log('HERHEHREHE')
		const formData = await request.formData();
		const form = await superValidate(formData, zod(schema));
		console.log(form)
		if (!form.valid) return fail(400, { form });
		console.log('ASDASDA')
		messages.push({ 'messageText': form.data.messageText, 'role': 'user' });
		await new Promise((resolve) => setTimeout(resolve, 1000));
		messages.push({ 'messageText': 'This is a response', 'role': 'assistant' });
		console.log(form.data)
		return {
			form,
			messages
		};
	}
};