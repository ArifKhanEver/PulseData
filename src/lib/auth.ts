import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";

/**
 * Better Auth server configuration.
 *
 * ── MongoDB connection ───────────────────────────────────────────────────
 * We use a module-level singleton so the connection is reused across
 * hot-reloads in dev (Next.js caches module state in the Node.js runtime).
 */
const uri =
  process.env.MONGO_URI ||
  "mongodb://127.0.0.1:27017/pulsedata_fallback";

// Persist the MongoClient across hot-reloads in dev
const globalForMongo = global as typeof globalThis & {
  _mongoClient?: MongoClient;
};

if (!globalForMongo._mongoClient) {
  globalForMongo._mongoClient = new MongoClient(uri);
}

const client = globalForMongo._mongoClient;
const db = client.db("PulseData");

/**
 * ── Auth instance ────────────────────────────────────────────────────────
 * `trustedOrigins` must include the Express server URL so that
 * cross-origin /api/auth/get-session calls (used by auth.middleware.ts)
 * are accepted by Better Auth and the session cookie is validated.
 */
export const auth = betterAuth({
  database: mongodbAdapter(db),

  // Accept requests from the Express back-end when it verifies sessions
  trustedOrigins: [
    "http://localhost:5000",
    "https://pulsedata-server.vercel.app",
  ],

  emailAndPassword: {
    enabled: true,
  },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    },
  },
});