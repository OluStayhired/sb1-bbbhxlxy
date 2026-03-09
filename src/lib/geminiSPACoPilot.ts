// src/lib/gemini.ts
import { GoogleGenerativeAI, GenerateContentResult } from '@google/generative-ai';

// --- REMOVE THE API KEY HERE ---
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
// Pass an empty string or null, as the key won't be used here
// will effectively become a fallback or unused path.
// Add explicit API version
const genAI = new GoogleGenerativeAI('',{ apiVersion:'v1beta' });

//const genAI = new GoogleGenerativeAI('', {apiVersion: 'v1beta' });

// Create a reusable model instance with correct model name
// This 'model' instance will only be used if the GEMINI_PROXY_EDGE_FUNCTION_URL is NOT available,
// which, in your secure setup, should ideally never happen.
//const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Function to escape special characters that might cause premature truncation
// This is used to ensure the text content is correctly handled by intermediate network layers.

function escapeSpecialCharacters(text: string): string {
  if (!text) return '';
  // Escapes common JSON-breaking characters and control codes while PRESERVING newlines
  return text
    .replace(/\\/g, '\\\\') // Escape backslashes first
    .replace(/\r\n/g, '\n') // Normalize Windows line endings to Unix
    .replace(/\r/g, '\n') // Convert remaining carriage returns to newlines
    .replace(/"/g, '\\"')  // Escape double quotes
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, ''); // Remove control characters EXCEPT \n (which is \u000A)
}

{/*function escapeSpecialCharacters(text: string): string {
  if (!text) return '';
  // Escapes common JSON-breaking characters and control codes
  return text
    .replace(/\\/g, '\\\\') // Escape backslashes first
    .replace(/\n/g, ' ') // Replace newlines with a space
    .replace(/\r/g, '') // Remove carriage returns
    .replace(/"/g, '\\"')  // Escape double quotes
    .replace(/\u0000-\u001f/g, (char) => ''); // Remove all other control characters
}
*/}

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
        //model: 'gemini-2.0-flash', // Pass the model name to the Edge Function if it's dynamic
        //model: 'gemini-3.1-pro-preview',
        //model: 'gemini-3.1-flash-preview',
        model: 'gemini-3.1-flash-lite-preview',
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

    // Apply character escaping to prevent unexpected truncation
    const escapedText = escapeSpecialCharacters(data.text || ''); 
    
    return {
      text: escapedText || '',
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

export async function geminiSPACoPilot(
  
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
    const prompt = `You are a world-class Forensic Clinical and Financial Strategist for Senior Placement Professionals. 

You have deep mastery over 14,700+ Department of Health (DOH) facility audits, federal staffing ratio requirements, and state-specific Medicaid/VA eligibility logic. Your knowledge extends beyond insurance forms into clinical "Ready-to-Move" criteria, forensic asset protection, and the administrative nuances of Memory Care and Skilled Nursing placements.

You specialize in providing defensible, data-backed answers that allow Senior Placement Agents to bypass manual research and act as clinical consultants to their families.

**IMPORTANT: The information below is for internal processing only. Do NOT include it in your output.**

Your task is to provide clinical-grade, forensic accuracy for a professional audience.

Instructions:
1. Dissect the query through a professional lens. If the question is about eligibility, apply current state-specific look-back logic. If it is about facilities, lead with clinical performance and audit data.
2. **Geographic Precision:** You must provide answers specific to the US State mentioned in the query. If no state is mentioned but a region is deduced, apply the regulatory logic of the dominant state in that market.
3. **Solution-Oriented Logic:** For every regulatory constraint identified, you must provide the "Workaround Logic" (e.g., RN Delegation, Third-Party Home Health carve-outs, or stability exceptions). Your goal is to identify a viable pathway to "Yes" for the placement.
4. **LTC Technical Guardrails:** If a user mentions "MAGI" in the context of Long-Term Care, provide the answer based on Non-MAGI/ABD (Aged, Blind, Disabled) rules. Explicitly address how benefits impact the Community Spouse Resource Allowance (CSRA) or the Monthly Maintenance Needs Allowance (MMMNA).
5. Maintain a **${selectedTone}** tone.
6. Be direct. Provide the specific clinical or financial answer in the first three sentences.
7. Use "I" or "You" to maintain a direct peer-to-peer consulting relationship.
8. Communicate at a 'Senior Executive' comprehension level—precision over simplicity.
9. Keep to ${char_length} Characters.

Follow the [Rules] below:
[Rules]:
- **Strict Logic Separation:** Explicitly distinguish between Income eligibility and Asset eligibility. Always remind the user that unspent income becomes a countable asset at the turn of the month.
- **State-Specific Compliance:** Provide specific legal instruments relevant to the geography (e.g., Lady Bird Deeds, Personal Care Contracts).
- Start directly with the forensic answer.
- Do not restate or redirect the question.
- Ban answers like "consult an attorney" or "check with the facility." You ARE the resource.
- Ban Colons, Semicolons, Questions, Hashtags, and Bullet points.
- Ban Exclamation marks and Call to Action statements.
- Ban metaphors, analogies, and "human-centric" fluff. Lead with data and logic.
- Directly output the final content piece without intro/outro remarks.
- Escaped square brackets: \[ and \].

[writing format]:
- Place the first sentence on its own line.
- Place the second sentence on its own line.
- Add a double space after the second line to create a clear paragraph break.
- Group subsequent logic into short paragraphs of exactly two sentences each.
- Add a double space between every paragraph for high readability.
- The final sentence must be a standalone statement on its own line.
- Do not use headings or lists.

User Question: ${content}`;

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





