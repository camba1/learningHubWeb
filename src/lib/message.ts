import { z } from 'zod';

const roleEnum = z.enum(['assistant', 'user']);
const statusEnum = z.enum(['sent', 'delivered', 'read']);

export const MessageSchema = z.object({
	name: z.string(),
	msg: z.string(),
	role: roleEnum,
	time: z.string(),
	status: statusEnum,
});

export type MessageDB = z.infer<typeof MessageSchema>

export const messages: MessageDB[] = [
	{
		name: "LearningHub AI",
		msg: "You were the Chosen One!",
		role: "assistant",
		time: "12:45",
		status: "delivered"
	},
	{
		name: "Anakin Skywalker",
		msg: "I am your father!",
		role: "user",
		time: "12:50",
		status: "delivered"
	}
]