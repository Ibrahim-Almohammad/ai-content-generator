// utils/wordCount.ts
export const wordCount = (text: string | null): number => {
    return text ? text.trim().split(/\s+/).length : 0;
  };
  