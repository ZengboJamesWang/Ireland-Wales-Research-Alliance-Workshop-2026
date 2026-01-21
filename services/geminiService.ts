
import { GoogleGenAI, Type } from "@google/genai";
import { FeedbackResponse } from "../types";

// Fix: Always use process.env.API_KEY directly for initialization as per guidelines
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const checkAbstractAlignment = async (title: string, abstractText: string): Promise<FeedbackResponse> => {
  const model = "gemini-3-flash-preview";
  
  const prompt = `
    Analyze this scientific abstract for a workshop on "Nanoparticles for Drug Delivery and Therapy: Photothermal, Optical and Translational Perspectives".
    
    Workshop Scope:
    - Carbon-based nanomaterials (CNOs, CNTs, graphene, nanodiamonds)
    - Nanoparticles for drug delivery and controlled release
    - Photothermal and photodynamic therapy
    - Laser–nanoparticle interaction and light-to-heat conversion
    - Optical, thermal, and spectroscopic characterisation
    - Translational challenges in nanomedicine
    - Industry perspectives and clinical pathways

    Abstract Title: ${title}
    Abstract Content: ${abstractText}

    Please provide:
    1. A score from 0-100 on how well it aligns with the workshop scope.
    2. Short constructive suggestions for improvement.
    3. A brief statement on its alignment with specific workshop topics.
  `;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            score: { type: Type.NUMBER },
            suggestions: { type: Type.STRING },
            alignment: { type: Type.STRING },
          },
          required: ["score", "suggestions", "alignment"],
        },
      },
    });

    // Fix: Access response.text directly (property, not a method)
    const text = response.text || "{}";
    return JSON.parse(text) as FeedbackResponse;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return {
      score: 0,
      suggestions: "Unable to analyze at this moment. Please ensure your abstract focuses on nanoparticles and therapy.",
      alignment: "Unknown error occurred during analysis."
    };
  }
};
