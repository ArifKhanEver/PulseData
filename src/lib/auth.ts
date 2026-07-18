import { betterAuth } from "better-auth";

export const auth = betterAuth({
  // Dummy database config for Next.js build to pass
  database: {
    provider: "sqlite",
    url: ":memory:",
  },
  emailAndPassword: {
    enabled: true,
  },
});
