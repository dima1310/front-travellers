export const truncateText = (text: string, len = 120) =>
  text.length > len ? text.slice(0, len) + "…" : text;
