// src/utils/slugGenerator.ts
export function generateUniqueSlug(): string {
    // Generate a random 10-character slug using crypto
    const timestamp = Date.now().toString(36);
    const randomPart = crypto.randomUUID().slice(0, 8).replace(/-/g, '');
    return `${timestamp}-${randomPart}`;
  }
  