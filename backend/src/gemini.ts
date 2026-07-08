import { GoogleGenerativeAI } from "@google/generative-ai";

console.log("Key loaded:", process.env.GEMINI_API_KEY?.substring(0, 10));

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY as string
);

export const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
});