const { app } = require('@azure/functions');
const { OpenAIClient, AzureKeyCredential } = require("@azure/openai");

app.http('getimage', {
    methods: ['POST'],
    authLevel: 'anonymous',
    handler: async (request, context) => {

        data = await request.json()

        const endpoint = data.endpoint;
        const apikey = data.apiKey;
        const prompt = data.message;

        const size = "1024x1024";
        const n = 1;

        const client = new OpenAIClient(endpoint, new AzureKeyCredential(apikey));
        const deploymentName = "Dalle3";
        const results = await client.getImages(deploymentName, prompt, { n, size });

        let imageUrl;
        let revisedPrompt;
        for (const image of results.data) {
          imageUrl = image.url;
          revisedPrompt = image.revisedPrompt;
        }

        const image = {
            "url":imageUrl,
            "prompt":revisedPrompt
        }

        return { body: JSON.stringify(image) };
    }
});
