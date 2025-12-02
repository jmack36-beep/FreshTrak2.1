import { GoogleGenAI, Type } from "@google/genai";
import { Shipment } from '../types';

// Initialize the client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const modelId = 'gemini-2.5-flash';

/**
 * Generates realistic mock shipment data for the demo.
 * USED FOR DEMO PURPOSES ONLY.
 */
export const generateDemoData = async (): Promise<Shipment[]> => {
  try {
    const prompt = `
      Generate 20 realistic fresh produce and floral shipment records for a grocery cooperative.
      
      CRITICAL REQUIREMENT:
      Assign a 'memberId' to each shipment randomly from this exact list: ['MEM-821', 'MEM-445', 'MEM-103'].
      Ensure there is a good distribution of shipments across these 3 member IDs.

      Each shipment should have a list of 'items' (e.g. ['Organic Strawberries', 'Blueberries']) and a 'description' summary.
      Varieties should include berries, leafy greens, cut flowers, tropicals, bananas, avocados etc.
      Locations should be various points in the US supply chain (highways, cities).
      Temperatures should mostly be between 33 and 38 F, with a few outliers (45+) indicating issues.
      Statuses: mostly 'On Time', some 'Delayed', 'Delivered', and 1 or 2 'Critical Temp'.
      Dates should be relative to today (current, recent past, near future).
      Return ONLY JSON.
    `;

    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              loadNumber: { type: Type.STRING },
              poNumber: { type: Type.STRING },
              description: { type: Type.STRING },
              items: { 
                type: Type.ARRAY,
                items: { type: Type.STRING }
              },
              shipDate: { type: Type.STRING },
              dueDate: { type: Type.STRING },
              location: { type: Type.STRING },
              temperature: { type: Type.NUMBER },
              status: { type: Type.STRING, enum: ['On Time', 'Delayed', 'Delivered', 'Critical Temp'] },
              lat: { type: Type.NUMBER },
              lng: { type: Type.NUMBER },
              trackingUrl: { type: Type.STRING },
              memberId: { type: Type.STRING, enum: ['MEM-821', 'MEM-445', 'MEM-103'] }
            }
          }
        }
      }
    });

    const data = JSON.parse(response.text || '[]');
    return data;
  } catch (error) {
    console.error("Failed to generate shipments via Gemini, using fallback.", error);
    // Fallback static data if API fails
    return [
      {
        id: '1',
        loadNumber: 'L-9823',
        poNumber: 'PO-4421',
        description: 'Organic Strawberries (Pallets)',
        items: ['Organic Strawberries 8x1lb', 'Organic Blueberries 12x6oz', 'Organic Raspberries 12x6oz'],
        shipDate: '2023-10-25',
        dueDate: '2023-10-28',
        location: 'I-5 Near Sacramento, CA',
        temperature: 34.2,
        status: 'On Time',
        lat: 38.58,
        lng: -121.49,
        trackingUrl: '#',
        memberId: 'MEM-821'
      },
      {
        id: '2',
        loadNumber: 'L-9825',
        poNumber: 'PO-4455',
        description: 'Mixed Cut Floral Bouquets',
        items: ['Mixed Seasonal Bouquets', 'Dozen Red Roses', 'Baby Breath Fillers'],
        shipDate: '2023-10-24',
        dueDate: '2023-10-27',
        location: 'Flagstaff, AZ',
        temperature: 46.1,
        status: 'Critical Temp',
        lat: 35.19,
        lng: -111.65,
        trackingUrl: '#',
        memberId: 'MEM-445'
      },
      {
        id: '3',
        loadNumber: 'L-9901',
        poNumber: 'PO-5512',
        description: 'Avocados - Hass',
        items: ['Hass Avocados 48s', 'Hass Avocados 60s'],
        shipDate: '2023-10-26',
        dueDate: '2023-10-29',
        location: 'El Paso, TX',
        temperature: 38.0,
        status: 'Delayed',
        lat: 31.76,
        lng: -106.48,
        trackingUrl: '#',
        memberId: 'MEM-821'
      },
      {
        id: '4',
        loadNumber: 'L-9902',
        poNumber: 'PO-5515',
        description: 'Bananas (Premium)',
        items: ['Premium Bananas', 'Plantains', 'Baby Bananas'],
        shipDate: '2023-10-25',
        dueDate: '2023-10-30',
        location: 'Mobile, AL',
        temperature: 58.0,
        status: 'On Time', // Bananas run warmer
        lat: 30.69,
        lng: -88.03,
        trackingUrl: '#',
        memberId: 'MEM-103'
      }
    ];
  }
};

/**
 * Analyzes the current shipment list to provide a daily briefing.
 */
export const getLogisticsBriefing = async (shipments: Shipment[]): Promise<string> => {
  try {
    const summaryPrompt = `
      You are a logistics expert assistant for a grocery coop.
      Analyze this JSON list of shipments specifically for the logged-in member:
      ${JSON.stringify(shipments)}
      
      Provide a concise 3-sentence executive summary for the member.
      Highlight any critical temperature issues or major delays relevant to THEIR shipments.
      If the list is empty, say "No active shipments found."
      Tone: Professional, helpful, concise.
    `;

    const response = await ai.models.generateContent({
      model: modelId,
      contents: summaryPrompt,
    });

    return response.text || "No briefing available.";
  } catch (error) {
    return "Unable to generate AI briefing at this time.";
  }
};

/**
 * Drafts a response acknowledging a user's inquiry about a PO.
 */
export const draftInquiryResponse = async (inquiry: string, shipment: Shipment): Promise<string> => {
  try {
    const prompt = `
      The user (member) is asking about this shipment:
      ${JSON.stringify(shipment)}
      
      User's question: "${inquiry}"
      
      Draft a polite, automated immediate acknowledgement email text from the "Co-op Logistics Team".
      Mention that a human agent has been notified.
    `;

    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
    });

    return response.text || "Your request has been received.";
  } catch (error) {
    return "Request received. Team notified.";
  }
};

/**
 * Generates a "Field Flash" market summary.
 */
export const getMarketFlash = async (): Promise<string> => {
  try {
    const prompt = `
      Write a "Field Flash" executive summary for a produce buyer.
      Summarize current market conditions for: Avocados (Mexico transition), Berries (California rain impact), and Leafy Greens (Yuma transition).
      Keep it to 2 short paragraphs. Professional, urgency-driven tone.
      Mention "Opportunity Buys" available on the portal.
    `;
    
    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
    });
    return response.text || "Market conditions are stable.";
  } catch (error) {
    return "Unable to load live market data.";
  }
}