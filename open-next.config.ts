import { defineCloudflareConfig } from "@opennextjs/cloudflare";

/**
 * OpenNext configuration for deploying the Next.js app to Cloudflare Workers.
 * Minimal setup: no incremental cache or queue backends wired yet. Add them
 * later (R2/KV/D1) if/when we need ISR or tag revalidation.
 */
export default defineCloudflareConfig();
