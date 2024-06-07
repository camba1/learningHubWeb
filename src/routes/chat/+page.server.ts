import { superValidate } from 'sveltekit-superforms';
import { fail } from '@sveltejs/kit';
import { zod } from 'sveltekit-superforms/adapters';
import {type MessageDB, MessageSchema} from '$lib/message';


const messages: MessageDB[] = [];

export const load = async () => {
	const form: MessageDB = {messageText: '', role: 'assistant', status: 'delivered', name: 'LearningHub AI', time: '12:45'}
	return {
		form,
		messages
	};
};

export const actions = {
	default: async ({ request }) => {

		const formData = await request.formData();
		const form = await superValidate(formData, zod(MessageSchema));

		if (!form.valid) return fail(400, { form });

		messages.push({ 'messageText': form.data.messageText, 'role': 'user' , status: 'delivered', name: 'LearningHub AI', time: '12:45'});
		await new Promise((resolve) => setTimeout(resolve, 1000));
		messages.push({ 'messageText': 'This is a response', 'role': 'assistant' , status: 'delivered', name: 'LearningHub AI', time: '12:45'});

		return {
			form,
			messages
		};
	}
};