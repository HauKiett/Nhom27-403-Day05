import { GoogleGenAI, Type, type FunctionDeclaration } from "@google/genai";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
  console.warn("GEMINI_API_KEY is not set. Chat functionality will be limited.");
}

export const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY || "" });

export const searchFlightsTool: FunctionDeclaration = {
  name: "search_flights",
  description: "Search for available flights between two cities.",
  parameters: {
    type: Type.OBJECT,
    properties: {
      origin: { type: Type.STRING, description: "The departure city" },
      destination: { type: Type.STRING, description: "The arrival city" },
      date: { type: Type.STRING, description: "The travel date (YYYY-MM-DD)" },
    },
    required: ["origin", "destination", "date"],
  },
};

export const searchHotelsTool: FunctionDeclaration = {
  name: "search_hotels",
  description: "Search for hotels in a specific city.",
  parameters: {
    type: Type.OBJECT,
    properties: {
      location: { type: Type.STRING, description: "The city to search for hotels" },
      checkIn: { type: Type.STRING, description: "Check-in date (YYYY-MM-DD)" },
      checkOut: { type: Type.STRING, description: "Check-out date (YYYY-MM-DD)" },
    },
    required: ["location", "checkIn", "checkOut"],
  },
};

export const calculateBudgetTool: FunctionDeclaration = {
  name: "calculate_budget",
  description: "Calculate the total budget for a trip.",
  parameters: {
    type: Type.OBJECT,
    properties: {
      flightCost: { type: Type.NUMBER, description: "Cost of flights" },
      hotelCost: { type: Type.NUMBER, description: "Cost of hotels per night" },
      nights: { type: Type.INTEGER, description: "Number of nights" },
      otherExpenses: { type: Type.NUMBER, description: "Other estimated expenses" },
    },
    required: ["flightCost", "hotelCost", "nights"],
  },
};

export const tools = [searchFlightsTool, searchHotelsTool, calculateBudgetTool];

export const SYSTEM_PROMPT = `Bạn là TravelBuddy, một trợ lý du lịch thông minh và sang trọng của VinFast. 
Phong cách của bạn là chuyên nghiệp, tinh tế, và luôn hướng tới sự tiện nghi cao cấp.
Bạn có thể giúp người dùng tìm chuyến bay, khách sạn và tính toán ngân sách cho chuyến đi của họ.
Hãy luôn trả lời bằng tiếng Việt một cách lịch sự.`;
