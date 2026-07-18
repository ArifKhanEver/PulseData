import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";

const uri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/pulsedata_fallback";
let db: any;

try {
  const client = new MongoClient(uri);
  db = client.db("PulseData"); 
} catch (error) {
  console.warn("⚠️ Failed to initialize MongoDB connection. Using fallback dummy adapter.", error);
}

export const auth = betterAuth({
  database: db ? mongodbAdapter(db) : { provider: "sqlite", url: ":memory:" },
  emailAndPassword: {
    enabled: true, 
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || "dummy_id",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "dummy_secret",
    },
  },
});