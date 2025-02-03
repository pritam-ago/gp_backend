import express from 'express';
import OpenAI from 'openai';

const router = express.Router();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY.trim });

router.post('/generate', async (req, res) => {
    try {
        const { prompt, platforms } = req.body;

        if (!prompt || !platforms || platforms.length === 0) {
            return res.status(400).json({ error: "Prompt and at least one platform are required." });
        }

        console.log("Generating post for:", { prompt, platforms });

        const generatedContent = {};

        for (const platform of platforms) {
            console.log(`Generating for platform: ${platform}`);
            
            const response = await openai.chat.completions.create({
                model: "gpt-3.5-turbo",
                messages: [{ role: "system", content: `Generate a social media post for ${platform} about: ${prompt}` }],
                max_tokens: 100
            });

            console.log(`OpenAI Response for ${platform}:`, response);

            if (!response.choices || response.choices.length === 0) {
                console.error(`OpenAI returned no choices for ${platform}`);
                return res.status(500).json({ error: `OpenAI returned no response for ${platform}` });
            }

            generatedContent[platform] = {
                content: response.choices[0].message.content,
                hashtags: [`#${platform}`, "#Generated", "#AI"]
            };
        }

        console.log("Final generated content:", generatedContent);
        res.json({ platforms: generatedContent });

    } catch (error) {
        console.error("Error generating post:", error);
        res.status(500).json({ error: error.message || "Failed to generate post" });
    }
});

export default router;
