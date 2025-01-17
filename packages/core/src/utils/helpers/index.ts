import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { ChatPromptTemplate, MessagesPlaceholder } from '@langchain/core/prompts';
import { Agent } from '../../agent/Agents';
import { Action } from '../../types/action.interface';
import { z } from 'zod';
import axios from 'axios';
import { MessageContent } from '@langchain/core/messages';
import { DEFAULT_CONFIG } from '../../config/default';
import { IResImageContent } from '../../config/types/config.types';

/**
 * @name ContentGenerator
 * @description: Content Generator class for generating text and images using AI models and APIs
 * @class ContentGenerator
 * @param agent: Agent
 * @method generateText
 * @method generateImage
 * @author oobe-protocol
 */
class ContentGenerator {
    private agent: Agent;

    constructor(
        agent: Agent,
    ) {
        this.agent = agent;
    }

    async generateText(prompt: string): Promise<MessageContent | undefined> {
        try {
            const response = await this.agent.google_ai?.invoke(prompt)
            return response?.content;
        } catch (error) {
            console.error('Error generating text:', error);
            throw error;
        }
    }

    public async generateImage
        (
            agent: Agent,
            prompt: string,
            model: string,
            size: string // 256x256, 512x512, 1024x1024, 1792x1024, 1024x1792
        ): Promise<IResImageContent | undefined> {
        try {
            const width = parseInt(size.split('x')[0]);
            const height = parseInt(size.split('x')[1]);
            const seed = Math.floor(Math.random() * 105643);
            const apiUrl = `${DEFAULT_CONFIG.pollinationsApiUrl}${encodeURIComponent(prompt)}?width=${width}&height=${height}&seed=${seed ?? Math.floor(Math.random() * 105643)}&nologo=${true}&model=${model}`;

            let attempts = 0;
            const maxAttempts = 5;
            const delayMs = 1000;

            while (attempts < maxAttempts) {
                try {
                    const response = await axios.get(apiUrl, { responseType: 'arraybuffer' });
                    if (response.status !== 200) {
                        throw new Error(`Failed to generate image: ${response.statusText}`);
                    }
                    const data = Buffer.from(response.data, 'binary');
                    const imageUrl = `${DEFAULT_CONFIG.pollinationsApiUrl}${encodeURIComponent(prompt)}?width=${width}&height=${height}&seed=${seed ?? Math.floor(Math.random() * 105643)}&nologo=${true}&model=${model}`;
                    return { url: imageUrl, image: data };
                } catch (e) {
                    console.error(`Error generating image (attempt ${attempts + 1}):`, e);
                    attempts++;
                    if (attempts >= maxAttempts) {
                        throw new Error('Failed to generate image after multiple attempts.');
                    }
                    await new Promise(resolve => setTimeout(resolve, delayMs));
                }
            }
        } catch (error) {
            console.error('Error generating image:', error);
            throw error;
        }
    }
}

export default ContentGenerator;