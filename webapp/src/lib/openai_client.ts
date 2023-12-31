// import { SECRET_OPENAI_API_KEY } from '$env/static/private';
import { Configuration, OpenAIApi, type ChatCompletionRequestMessage } from 'openai';

const configuration = new Configuration({
	// apiKey: SECRET_OPENAI_API_KEY
	apiKey: "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"
});

// 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
// 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

const openai = new OpenAIApi(configuration);

export async function createChatCompletion(
	document: string[],
	question: string
): Promise<string | null> {
	let messages = [];
	// let systemContent = `You are a Rust programming language AI helper, you are an expert in Rust programming language. 
	// 	You get your knowledge about Rust from the following information delimited between three ticks.`;

	let systemContent = `Eres una inteligencia antificial ayudante que sabe mucho del libro sangre de campeon , conoces todo acerca de la historia de felipe y su hermano. 
	Obtiene su conocimiento sobre Felipe a partir de la siguiente información delimitada entre tres marcas.`;

	systemContent += '\n\n```';
	for (let i = 0; i < document.length; i++) {
		systemContent += '\n' + document[i];
	}
	systemContent +=
		'\n```\n\nThe user will ask you questions about Rust programming language and you should reply in a concise way and include code snippets whenever you can.';

	messages.push({
		role: 'system',
		content: systemContent
	} satisfies ChatCompletionRequestMessage);

	let prompt = question;

	messages.push({
		role: 'user',
		content: prompt
	} satisfies ChatCompletionRequestMessage);

	console.log("los mensajeeeeessss : ",messages);
	try {
		let response = await openai.createChatCompletion({
			model: 'gpt-3.5-turbo',
			messages: messages,
			temperature: 1,
			max_tokens: 1000
		});

		if (response.data.choices.length > 0) {
			return response.data.choices[0].message!.content;
		} else {
			return null;
		}
	} catch (error: any) {
		if (error.response) {
			console.log(error.response.status);
			console.log(error.response.data);
		} else {
			console.log(error.message);
		}
		return null;
	}
}
