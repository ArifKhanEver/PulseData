import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";

// ডেটাবেস কানেকশন তৈরি করা হচ্ছে
const uri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/pulsedata_fallback";
let db: any;

try {
  const client = new MongoClient(uri);
  db = client.db(); // তোমার URI-তে থাকা ডেটাবেসটি অটোমেটিক সিলেক্ট করবে
} catch (error) {
  console.warn("⚠️ Failed to initialize MongoDB connection. Using fallback dummy adapter.", error);
}

export const auth = betterAuth({
  database: db ? mongodbAdapter(db) : { provider: "sqlite", url: ":memory:" },
  emailAndPassword: {
    enabled: true, // ডেমো লগিন বা ইমেইল লগিনের জন্য
  },
  // গুগলের API Key থাকলে এখানে বসবে (ভবিষ্যতের জন্য)
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || "dummy_id",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "dummy_secret",
    },
  },
});