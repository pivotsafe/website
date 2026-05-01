import { createClient, ContentfulClientApi } from "contentful";

const space = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID;
const accessToken = process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN;
const environment =
  process.env.NEXT_PUBLIC_CONTENTFUL_ENVIRONMENT || "master";

/**
 * `client` is `null` when Contentful credentials are not configured (e.g.
 * during a fresh production build where blogs are intentionally hidden).
 * Service functions short-circuit on `null` and return empty results so the
 * static build does not crash.
 */
export const client: ContentfulClientApi<undefined> | null =
  space && accessToken
    ? createClient({ space, accessToken, environment })
    : null;
