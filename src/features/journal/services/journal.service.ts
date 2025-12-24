// services/journal.service.ts
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { nanoid } from "nanoid/non-secure";
import { JournalBlock } from "../types/journal";
import { firestore } from "../../../services/firebase/firebaseConfig";
import { buildPreviewText, hasImageBlock } from "./journal.helpers";

export const saveJournal = async (params: {
  journalId?: string;
  date: Date;
  blocks: JournalBlock[];
}) => {
  const user = getAuth().currentUser;
  if (!user) throw new Error("Not authenticated");

  const { journalId, date, blocks } = params;
  const id = journalId ?? nanoid();

  const journalRef = doc(firestore, "users", user.uid, "journals", id);

  await setDoc(
    journalRef,
    {
      id,
      userId: user.uid,

      date,
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),

      blocks,
      previewText: buildPreviewText(blocks),
      hasImage: hasImageBlock(blocks),

      updatedAt: serverTimestamp(),
      ...(journalId ? {} : { createdAt: serverTimestamp() }),
    },
    { merge: true }
  );

  return id;
};
