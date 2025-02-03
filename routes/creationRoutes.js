import express from 'express';
import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();
const router = express.Router();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const generateContent = async (prompt, platform) => {
    const response = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
            { role: "system", content: `Generate social media content and hashtags for ${platform}.` },
            { role: "user", content: prompt }
        ]
    });

    const content = response.choices[0]?.message?.content.trim();
    const hashtags = content.match(/#[a-zA-Z0-9_]+/g) || []; 

    return { content, hashtags };
};

router.post('/generate', async (req, res) => {
    const { prompt, platforms } = req.body;

    if (!prompt || !Array.isArray(platforms) || platforms.length === 0) {
        return res.status(400).json({ error: "Please provide a prompt and at least one platform." });
    }

    try {
        const generatedPlatforms = {};
        
        for (const platform of platforms) {
            generatedPlatforms[platform] = await generateContent(prompt, platform);
        }

        res.json({ platforms: generatedPlatforms });
    } catch (error) {
        console.error("Error generating post:", error);
        res.status(500).json({ error: "Failed to generate post" });
    }
});

export default router;
