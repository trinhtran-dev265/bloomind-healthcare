// helpers/journalHelpers.ts
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
