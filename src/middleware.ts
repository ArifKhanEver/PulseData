// Next.js requires this file to be named `middleware.ts`.
// However, to keep our architecture clean and modern, we export our logic from `proxy.ts`.
export { proxy as middleware, config } from "./proxy";
