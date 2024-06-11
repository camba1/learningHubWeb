import { z } from 'zod';

export const RoleEnum = z.enum(['assistant', 'user']);
export const StatusEnum = z.enum(['sent', 'delivered', 'read']);

export const AssistName: string = "LearningHub AI";
export const maxNumberOfMessagesKept: number = 20;

export const MessageSchema = z.object({
	name: z.string(),
	messageText: z.string(),
	role: RoleEnum,
	time: z.string(),
	status: StatusEnum,
});

export type MessageDB = z.infer<typeof MessageSchema>


export const messages: MessageDB[] = [
	{
		name: "Trini AI",
		messageText: "You were the Chosen One!",
		role: "assistant",
		time: "12:45",
		status: "delivered"
	},
	{
		name: "Anakin Skywalker",
		messageText: "I am your father!",
		role: "user",
		time: "12:50",
		status: "delivered"
	}
]