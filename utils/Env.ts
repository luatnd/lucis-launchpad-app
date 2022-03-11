export const isClient = typeof window !== "undefined";
export const isDevMode = process.env.NODE_ENV === "development";
export const isClientDevMode = isDevMode && isClient;
