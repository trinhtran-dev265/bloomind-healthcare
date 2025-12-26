// services/journal.service.ts
import {
  doc,
  setDoc,
  serverTimestamp,
  query,
  collection,
  where,
  orderBy,
  getDocs,
  getDoc,
  deleteDoc,
} from "firebase/firestore";
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

export const getJournalsByYear = async (year: number) => {
  const user = getAuth().currentUser;
  if (!user) throw new Error("Not authenticated");

  const q = query(
    collection(firestore, "users", user.uid, "journals"),
    where("year", "==", year),
    orderBy("date", "desc")
  );

  const snap = await getDocs(q);
  return snap.docs.map((d) => d.data());
};

export const getJournalById = async (journalId: string) => {
  const user = getAuth().currentUser;
  if (!user) throw new Error("Not authenticated");

  const ref = doc(firestore, "users", user.uid, "journals", journalId);
  const snap = await getDoc(ref);

  if (!snap.exists()) return null;
  return snap.data();
};

export const deleteJournalById = async (journalId: string) => {
  const user = getAuth().currentUser;
  if (!user) throw new Error("Not authenticated");

  const ref = doc(firestore, "users", user.uid, "journals", journalId);
  await deleteDoc(ref);
};
