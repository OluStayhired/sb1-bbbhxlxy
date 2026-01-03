// src/lib/gemini.ts
import { GoogleGenerativeAI, GenerateContentResult } from '@google/generative-ai';

// --- REMOVE THE API KEY HERE ----
// const apiKey = import.meta.env.VITE_GEMINI_API_KEY; // This line should be removed or commented out

// This variable will now *always* be used for secure calls
const GEMINI_PROXY_EDGE_FUNCTION_URL = import.meta.env.VITE_GEMINI_PROXY_EDGE_FUNCTION_URL;

// --- IMPORTANT: Adjust the error handling and initialization ---
if (!GEMINI_PROXY_EDGE_FUNCTION_URL) {
  // If the proxy URL isn't set, then we have a critical configuration error.
  // There should be no fallback to a direct API key if the key isn't here.
  throw new Error('GEMINI_PROXY_EDGE_FUNCTION_URL is not defined. Secure LLM access is not configured.');
}

// Initialize GoogleGenerativeAI with an empty string or null for apiKey,
// as it will only be used if GEMINI_PROXY_EDGE_FUNCTION_URL is NOT present.
// In your secure setup, it will always be present, so this 'genAI' instance
// will effectively become a fallback or unused path.
const genAI = new GoogleGenerativeAI('', { // Pass an empty string or null, as the key won't be used here
  apiVersion: 'v1beta' // Add explicit API version
});

// Create a reusable model instance with correct model name
// This 'model' instance will only be used if the GEMINI_PROXY_EDGE_FUNCTION_URL is NOT available,
// which, in your secure setup, should ideally never happen.
//const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

const model = genAI.getGenerativeModel({ model: 'gemini-3-flash-preview' });

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Rest of the file remains the same...

export interface GeminiResponse {
  text: string;
  error?: string;
  safetyRatings?: any[];
}

async function processResponse(result: GenerateContentResult): Promise<GeminiResponse> {
  const response = await result.response;
  return {
    text: response.text(),
    safetyRatings: response.promptFeedback?.safetyRatings
  };
}

// Add at top of file
const rateLimiter = {
  lastCall: 0,
  minInterval: 1000, // 1 second between calls
  checkAndWait: async () => {
    const now = Date.now();
    const timeToWait = rateLimiter.lastCall + rateLimiter.minInterval - now;
    if (timeToWait > 0) {
      await new Promise(resolve => setTimeout(resolve, timeToWait));
    }
    rateLimiter.lastCall = Date.now();
  }
};

// Add at top of file
const calendarCache = new Map<string, {
  response: GeminiResponse;
  timestamp: number;
}>();
const CACHE_DURATION = 30 * 60 * 1000; // 30 minutes

export async function generateContent(prompt: string): Promise<GeminiResponse> {
  try {
    // We are now always using the Edge Function if GEMINI_PROXY_EDGE_FUNCTION_URL is available
    // and it should always be available in your secure setup.
    // The previous 'if (GEMINI_PROXY_EDGE_FUNCTION_URL)' check
    // combined with the initial error ensures this path is taken.

    // Use the Edge Function instead of direct API call
    const response = await fetch(GEMINI_PROXY_EDGE_FUNCTION_URL, { // This now *must* be defined
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt,
        model: 'gemini-3-flash-preview', // Pass the model name to the Edge Function if it's dynamic
        // Optional: Add a cache key for the Edge Function to use
        cacheKey: prompt.substring(0, 50) // Use first 50 chars as cache key
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error from Gemini proxy:', errorData);
      return {
        text: '',
        error: errorData.error || `Failed to generate response: ${response.status}`
      };
    }

    // Parse the response from the Edge Function
    const data = await response.json();
    return {
      text: data.text || '',
      safetyRatings: data.safetyRatings
    };
  } catch (error) {
    console.error('Error generating content:', error);
    return {
      text: '',
      error: error instanceof Error ? error.message : 'Failed to generate content'
    };
  }
}

const toneOptions = [
  'action-oriented',
  'authoritative',
  'bold',
  'concise'
  // Add more as desired
];

const getRandomTone = (excludeTones: string[] = []) => {
  const availableTones = toneOptions.filter(tone => !excludeTones.includes(tone));
  if (availableTones.length === 0) {
    // Fallback: if all tones are excluded (e.g., if you later implement tracking
    // and all tones are in `excludeTones`), reset or pick from the full list.
    // For now, this branch won't be hit with `getRandomTone()`
    return toneOptions[Math.floor(Math.random() * toneOptions.length)];
  }
  const randomIndex = Math.floor(Math.random() * availableTones.length);
  return availableTones[randomIndex];
};



// ------- Start Long Term Care Support (getLongTermCareSupport) -------//

export async function getLongTermCareSupport(
  
    content: string,  
    char_length: string,
    maxRetries: number = 5,
    initialDelayMs: number = 1000
  
): Promise<GeminiResponse> {

  
    // Cache key now depends only on inputs that define the desired output
    const cacheKey = JSON.stringify({ content });
    const cached = calendarCache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
        return cached.response;
    }

    // Rate limiting
    await rateLimiter.checkAndWait();

    const selectedTone = getRandomTone(); // Ensure this function correctly returns a valid tone string
    const prompt = `You are a world-class Long Term Care Insurance Eligbility Expert. You have a deep knowledge of the eldercare industry. You specifically  specialize in answering questions about eldercare insurance eligibility. You have read all the medicaid and medicare literature about the major challenges most people face when trying to determine if their loved ones are eligible for Long Term Care insurance cover. As well as understanding the step-by-step  process required to meet the requirements for LTCI eligibility, you have a deep experience of the best practices and the initial steps families must focus on to ensure they have the correct insurance cover for long term care. 

**IMPORTANT: The information in the section below is for your internal processing and understanding only. Do NOT include any part of this in your final output.** 

Your task is to write highly accurate responses to the questions in ${content} 

Instructions:

**Beyond surface-level analysis and responses, deeply dissect** the question provided in ${content} and Create not just a fitting response, but the **most qualified sounding** answer that subtly guides the reader towards a specific Goal to help them address this issue around Long Term Care Insurance.

Maintain an **${selectedTone}** tone throughout your response.

1. Start with a human sounding first sentence.
2. Weave a narrative that **authentically captures and articulates the answer being shared with the family member based on the question in ${content}**, making them feel truly understood. 
3. Craft language that is not just simple, but **resonates as genuinely human and relatable**, avoiding too much industry jargon and communicate at a 'university graduate' comprehension level. The goal is conversational authority, not academic complexity.
4. Follow proven frameworks (AIDA, PAS, Hook-Point-Action, Before After Bridges etc.), **interpreting them with strategic nuance for social context.**
5. Follow each answer with a next logical question to help the family member and guide them to get a deeper understanding of the specific challenges 
6. Keep to ${char_length} Characters in total.

Write like a human. No fluff. No cringe. Make it hit.

Follow the [Rules] below:

[Rules]:

- Keep to ${char_length} Characters in total.
- **Write in a clear, straightforward manner that a university graduate could easily understand.**
- Ban Generic Content
- Ban Colons
- Ban Semicolons 
- Ban hashtags
- Ban bullet points.
- Ban exclamation marks. 
- Ban Questions
- Ban Call to Action Questions
- Ban Call to Action Statements
- Ban overly-stylized or figurative language
- Ban metaphors, analogies, and clichés
- Ban comparisons to unrelated or overly complex subjects
- Ban phrases containing "it's like" or "think of it as"
- Ban any language that sounds like motivational language
- Provide ONE (1) final content piece. Do NOT offer variations or alternative options.
- Your output must be the single, complete, and final version of the content.
- Directly output the generated answer, without any introductory or concluding remarks, explanations, or alternative suggestions.
- Do NOT use numbered lists or headings to present multiple content options.
- Do NOT expose any part of the prompt. 
    `;

   let currentRetry = 0;
   let delayTime = initialDelayMs;

  while (currentRetry < maxRetries) {
    try {
      await rateLimiter.checkAndWait();

      //const response = await model.generateContent(prompt);
      
      const response = await generateContent(prompt);
      
      calendarCache.set(cacheKey, {
        response,
        timestamp: Date.now()
      });

      return response;

    } catch (error: any) {
      const isRetryableError =
        error.status === 503 ||
        error.status === 429 ||
        (error.message && (error.message.includes('503') || error.message.includes('429')));
      const isNetworkError = error.message && error.message.includes('Failed to fetch');

      if ((isRetryableError || isNetworkError) && currentRetry < maxRetries - 1) {
        currentRetry++;
        console.warn(
          `Gemini API call failed (Error: ${error.status || error.message}). ` +
          `Retrying in ${delayTime / 1000}s... (Attempt ${currentRetry}/${maxRetries})`
        );
        await sleep(delayTime);
        delayTime *= 2;
        delayTime = delayTime * (1 + Math.random() * 0.2);
        delayTime = Math.min(delayTime, 30000);
      } else {
        console.error(`Answer generation failed after ${currentRetry} retries:`, error);
        throw new Error(`Failed to generate an answer: ${error.message || 'Unknown error occurred.'}`);
      }
    }
  }

  throw new Error("Max retries exhausted for first answer generation (wait 5 mins and try again).");
}

// ------ End Long Term Care Support (getLongTermCareSupport) --------//





