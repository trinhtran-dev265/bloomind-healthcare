import { JournalBlock, TextBlock } from "../types/journal";

export function buildPreviewText(blocks: JournalBlock[]): string {
  const textBlock = blocks.find(
    (b): b is TextBlock => b.type === "text" && b.text.trim().length > 0
  );

  if (!textBlock) return "";

  return textBlock.text.slice(0, 120);
}

export function hasImageBlock(blocks: JournalBlock[]): boolean {
  return blocks.some((b) => b.type === "image");
}

export const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const getTitleAndPreview = (blocks: any[]) => {
  const textBlocks = blocks.filter((b) => b.type === "text");

  const title = textBlocks[0]?.text || "";
  const preview = textBlocks[1]?.text || "";

  return { title, preview };
};

export const formatTime = (date: any) => {
  const d = date?.toDate ? date.toDate() : new Date(date);

  return d
    .toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
};
