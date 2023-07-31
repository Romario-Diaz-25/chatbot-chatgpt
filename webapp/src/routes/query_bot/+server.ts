import { createChatCompletion } from '$lib/openai_client';
import { json, type RequestHandler } from '@sveltejs/kit';

export const POST = (async ({ request }: any) => {

	// console.log("esto le estamos preguntando a la api : ", request)

	let data = await request.json();

	
	if (data) {
		let query = data.query;
		let documents = data.documents;

		let completion = await createChatCompletion(documents, query);
		if (completion) {
			return json({ answer: completion });
		}
		// return json(data)
	}
	throw new Error('Invalid request');
}) satisfies RequestHandler;
