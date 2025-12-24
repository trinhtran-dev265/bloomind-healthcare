// types/journal.ts
export type JournalBlock = TextBlock | ImageBlock | EmojiBlock;

export type TextBlock = {
  id: string;
  type: "text";
  text: string;
  style?: {
    variant?: "title" | "body";
    bold?: boolean;
  };
};

export type ImageBlock = {
  id: string;
  type: "image";
  url: string;
};

export type EmojiBlock = {
  id: string;
  type: "emoji";
  emoji: string;
};

export type Journal = {
  id: string;
  userId: string;

  date: Date;
  year: number;
  month: number;
  day: number;

  blocks: JournalBlock[];

  previewText: string;
  hasImage: boolean;

  createdAt: Date;
  updatedAt: Date;
};
