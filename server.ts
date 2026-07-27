import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "25mb" }));

// Initialize GoogleGenAI lazily with fallback check
let aiClient: GoogleGenAI | null = null;
function getAI() {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is missing.");
    }
    aiClient = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// Helper to convert image URL or Base64 to InlineData part
async function processImageInput(imageUrl?: string, imageBase64?: string, mimeType?: string) {
  if (imageBase64) {
    const cleanBase64 = imageBase64.replace(/^data:image\/\w+;base64,/, "");
    const detectedMime = mimeType || "image/jpeg";
    return {
      inlineData: {
        data: cleanBase64,
        mimeType: detectedMime,
      },
    };
  }

  if (imageUrl) {
    if (imageUrl.startsWith("data:")) {
      const matches = imageUrl.match(/^data:(image\/\w+);base64,(.+)$/);
      if (matches) {
        return {
          inlineData: {
            mimeType: matches[1],
            data: matches[2],
          },
        };
      }
    }

    // Fetch remote image
    const response = await fetch(imageUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch image from URL: ${response.statusText}`);
    }
    const contentType = response.headers.get("content-type") || "image/jpeg";
    const arrayBuffer = await response.arrayBuffer();
    const base64Data = Buffer.from(arrayBuffer).toString("base64");
    return {
      inlineData: {
        mimeType: contentType.split(";")[0],
        data: base64Data,
      },
    };
  }

  return null;
}

// 1. AI Species & Wildlife Identifier
app.post("/api/ai/identify", async (req, res) => {
  try {
    const { imageUrl, imageBase64, mimeType, promptHint } = req.body;
    const imagePart = await processImageInput(imageUrl, imageBase64, mimeType);

    if (!imagePart) {
      return res.status(400).json({ error: "Please provide an image URL or base64 image data." });
    }

    const ai = getAI();
    const textPrompt = promptHint
      ? `Identify the animal, plant, or organism in this nature photograph. Additional context: "${promptHint}". Provide detailed biological & field guide information in JSON.`
      : "Identify the animal, plant, or organism in this nature photograph. Provide detailed biological & field guide information in JSON format.";

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: {
        parts: [imagePart, { text: textPrompt }],
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            speciesName: { type: Type.STRING, description: "Common name of the species" },
            scientificName: { type: Type.STRING, description: "Binomial scientific name (Genus species)" },
            confidenceScore: { type: Type.NUMBER, description: "Estimated confidence score between 0 and 100" },
            category: { type: Type.STRING, description: "Category e.g. Mammals, Birds, Reptiles, Amphibians, Ocean, Flora" },
            conservationStatus: { type: Type.STRING, description: "IUCN status e.g. Critically Endangered, Vulnerable, Least Concern" },
            habitat: { type: Type.STRING, description: "Primary natural habitat and global regions" },
            diet: { type: Type.STRING, description: "Dietary habits e.g. Carnivore, Herbivore, Omnivore" },
            fieldTraits: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Key physical & field identification traits",
            },
            interestingFacts: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Fascinating biological or behavioral facts",
            },
            ethicalFieldAdvice: { type: Type.STRING, description: "Safety and ethical observation guidelines for wildlife photographers and enthusiasts" },
          },
          required: [
            "speciesName",
            "scientificName",
            "category",
            "conservationStatus",
            "habitat",
            "diet",
            "fieldTraits",
            "interestingFacts",
            "ethicalFieldAdvice",
          ],
        },
      },
    });

    if (!response.text) {
      throw new Error("No response returned from Gemini AI.");
    }

    const result = JSON.parse(response.text);
    return res.json({ success: true, data: result });
  } catch (error: any) {
    console.error("AI Identify Error:", error);
    return res.status(500).json({ error: error.message || "Failed to identify species." });
  }
});

// 2. AI Field Guide Naturalist Chat
app.post("/api/ai/chat", async (req, res) => {
  try {
    const { messages, prompt } = req.body;
    const ai = getAI();

    let userPrompt = prompt;
    if (!userPrompt && Array.isArray(messages) && messages.length > 0) {
      const lastMsg = messages[messages.length - 1];
      userPrompt = lastMsg.text || lastMsg.content;
    }

    if (!userPrompt) {
      return res.status(400).json({ error: "Prompt or message is required." });
    }

    const chat = ai.chats.create({
      model: "gemini-3.6-flash",
      config: {
        systemInstruction:
          "You are NatureLens AI Naturalist, an elite wildlife biologist, conservation scientist, and master nature photographer. Answer questions about animal behavior, plant taxonomy, ecology, tracking ethics, and camera settings with warmth, scientific accuracy, and engaging prose. Keep responses formatting structured with clear sections and bullet points where helpful.",
      },
    });

    const response = await chat.sendMessage({ message: userPrompt });

    return res.json({
      success: true,
      text: response.text,
    });
  } catch (error: any) {
    console.error("AI Chat Error:", error);
    return res.status(500).json({ error: error.message || "Failed to process naturalist chat query." });
  }
});

// 3. AI Photo Critique & Editorial Storyteller
app.post("/api/ai/critique", async (req, res) => {
  try {
    const { imageUrl, imageBase64, mimeType, speciesContext } = req.body;
    const imagePart = await processImageInput(imageUrl, imageBase64, mimeType);

    const ai = getAI();
    const promptText = `Analyze this nature photograph ${speciesContext ? `featuring ${speciesContext}` : ""}. 
Provide editorial critique, recommended camera EXIF settings (aperture, shutter speed, ISO, focal length), composition review, and a compelling conservation story for publication.`;

    const contents = imagePart
      ? { parts: [imagePart, { text: promptText }] }
      : { parts: [{ text: promptText }] };

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            photoTitle: { type: Type.STRING, description: "An evocative title for the photograph" },
            editorialCaption: { type: Type.STRING, description: "Professional magazine-style caption" },
            suggestedCameraSettings: { type: Type.STRING, description: "Optimal camera settings e.g. f/4, 1/1600s, ISO 400, 500mm telephoto" },
            compositionAnalysis: { type: Type.STRING, description: "Analysis of lighting, framing, depth of field, and impact" },
            conservationStory: { type: Type.STRING, description: "A gripping 2-paragraph narrative about the species and habitat preservation" },
            tags: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Relevant photography and species tags",
            },
          },
          required: ["photoTitle", "editorialCaption", "suggestedCameraSettings", "compositionAnalysis", "conservationStory", "tags"],
        },
      },
    });

    if (!response.text) {
      throw new Error("No critique returned from Gemini AI.");
    }

    const result = JSON.parse(response.text);
    return res.json({ success: true, data: result });
  } catch (error: any) {
    console.error("AI Critique Error:", error);
    return res.status(500).json({ error: error.message || "Failed to generate photo critique." });
  }
});

// 4. AI Habitat & Field Journal Notes Generator
app.post("/api/ai/field-notes", async (req, res) => {
  try {
    const { speciesName, location, category } = req.body;
    if (!speciesName) {
      return res.status(400).json({ error: "Species name is required." });
    }

    const ai = getAI();
    const promptText = `Write an authentic, atmospheric field journal entry for an expedition observing ${speciesName} ${location ? `in ${location}` : ""}. Include expedition weather notes, behavioral observations, acoustic signals, threats, and field photography tips. Return as formatted JSON.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: promptText,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            journalTitle: { type: Type.STRING },
            expeditionDate: { type: Type.STRING },
            weatherAndTerrain: { type: Type.STRING },
            behavioralObservation: { type: Type.STRING },
            acousticSignals: { type: Type.STRING },
            threatsAndConservation: { type: Type.STRING },
            proPhotographyTip: { type: Type.STRING },
          },
          required: [
            "journalTitle",
            "expeditionDate",
            "weatherAndTerrain",
            "behavioralObservation",
            "acousticSignals",
            "threatsAndConservation",
            "proPhotographyTip",
          ],
        },
      },
    });

    if (!response.text) {
      throw new Error("No field notes returned.");
    }

    const result = JSON.parse(response.text);
    return res.json({ success: true, data: result });
  } catch (error: any) {
    console.error("AI Field Notes Error:", error);
    return res.status(500).json({ error: error.message || "Failed to generate field notes." });
  }
});

// Start Express Server with Vite Middleware
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
