import openai from 'openai';
const api_key = "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";

// configurez votre clé API
openai.api_key = api_key;

// Créez un client OpenAI avec votre clé API
const openaiClient = new openai(api_key);

// Utilisez la méthode create pour appeler l'API OpenAI
const prompt = 'Bonjour, comment vas-tu ?';
const completions = await openaiClient.complete({
    engine: 'davinci',
    prompt: prompt,
    maxTokens: 5,
});

// Affichez la réponse
console.log(completions);
