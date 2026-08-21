import dotenv from "dotenv";

dotenv.config();

const required = ["MONGODB_URI", "GEMINI_API_KEY", "JWT_SECRET", "CLIENT_URL"];

export function validateEnv() {
  const missing = required.filter((key) => !process.env[key]?.trim());
  if (missing.length) {
    throw new Error(`Missing required environment variables: ${missing.join(", ")}`);
  }

  if (process.env.JWT_SECRET.length < 32) {
    throw new Error("JWT_SECRET must be at least 32 characters long");
  }
}

export const env = {
  port: Number(process.env.PORT || 5000),
  mongoUri: process.env.MONGODB_URI,
  geminiApiKey: process.env.GEMINI_API_KEY,
  embeddingModel: process.env.GEMINI_EMBEDDING_MODEL || "models/gemini-embedding-001",
  generationModel: process.env.GEMINI_GENERATION_MODEL || "models/gemini-flash-latest",
  jwtSecret: process.env.JWT_SECRET,
  clientUrl: process.env.CLIENT_URL,
  nodeEnv: process.env.NODE_ENV || "development",
};
