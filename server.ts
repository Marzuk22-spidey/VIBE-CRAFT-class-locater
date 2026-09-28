import express from 'express';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = parseInt(process.env.PORT || '3000', 10);

app.use(express.json());

// Initialize Google GenAI client if key exists
const apiKey = process.env.GEMINI_API_KEY;
let aiClient: GoogleGenAI | null = null;
if (apiKey && apiKey !== 'MY_GEMINI_API_KEY') {
  try {
    aiClient = new GoogleGenAI({ apiKey });
  } catch (err) {
    console.warn('Could not initialize GoogleGenAI with provided key:', err);
  }
}

// Endpoint: AI search query understanding with Gemini 2.5/3.8 Flash
app.post('/api/ai-search', async (req, res) => {
  const { query, currentTime, todayDate } = req.body;
  if (!query || typeof query !== 'string') {
    return res.status(400).json({ error: 'Query string is required' });
  }

  // If Gemini client is available, use structured prompt extraction
  if (aiClient) {
    try {
      const prompt = `You are the AI assistant for VIBECRAFT Free Class Locator at a university.
Extract the user requirements from this query into JSON format.

AUTOMATIC FLOOR DETECTION RULE:
When the user mentions a room or venue such as "IST 503", "IST 612", "IST 211", "IST 416":
Extract the room number and determine the floor from the first digit of the room number:
- IST 503 -> Room 503 -> 5th Floor
- IST 612 -> Room 612 -> 6th Floor
- IST 211 -> Room 211 -> 2nd Floor
- IST 416 -> Room 416 -> 4th Floor
If the venue does not follow this numbering pattern, do not guess the floor; mark it as "Floor Unknown".

User Query: "${query}"
Current Time: "${currentTime || '10:45'}"
Today's Date: "${todayDate || '2026-09-28'}"

Return ONLY valid JSON matching this schema with NO markdown fences:
{
  "floor": "Ground Floor" | "1st Floor" | "2nd Floor" | "3rd Floor" | "4th Floor" | "5th Floor" | "6th Floor" | "7th Floor" | "Floor Unknown" | "Any",
  "specificRoom": string | null, // e.g. "503" or "IST 503" if mentioned
  "acRequired": true | false | null,
  "minCapacity": number | null,
  "durationMinutes": number, // default 60 if not stated
  "startTime": "HH:mm", // 24-hour time format, use current time if 'now' is requested
  "date": "YYYY-MM-DD",
  "day": "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday",
  "summary": string,
  "confidence": number
}`;

      const response = await aiClient.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          temperature: 0.1,
          responseMimeType: 'application/json'
        }
      });

      const text = response.text?.trim() || '{}';
      const cleanJson = text.replace(/```json/gi, '').replace(/```/g, '').trim();
      const parsed = JSON.parse(cleanJson);
      return res.json({ parsed, source: 'gemini' });
    } catch (error: any) {
      console.error('Gemini extraction error details:', error?.message || error);
      return res.json({ parsed: null, source: 'fallback', error: error?.message });
    }
  }

  // Fallback indicator
  res.json({ parsed: null, source: 'fallback' });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    app: 'VIBECRAFT Free Class Locator',
    hasGeminiKey: Boolean(apiKey && apiKey !== 'MY_GEMINI_API_KEY')
  });
});

async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    // Serve production build
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`VIBECRAFT Server listening on http://0.0.0.0:${port}`);
  });
}

startServer();
