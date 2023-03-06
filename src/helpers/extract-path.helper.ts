/**
 * Extracts the last segment of a URL matching the pattern "uploads/FILENAME.EXTENSION".
 * If no match is found, returns "uploads/".
 * @param url The URL to extract the path from.
 * @returns The path extracted from the URL.
 */
export const extractPath = (url: string): string => {
    const pattern = /uploads\/[^/]+\.[^/]+$/;
    return url.match(pattern)?.[0] || 'uploads/';
  };
  