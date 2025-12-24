// src/services/chat.service.ts

import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
  limit,
  getDocs,
  doc,
  updateDoc,
} from "firebase/firestore";
import { firestore } from "../../../services/firebase/firebaseConfig";

export type ChatRole = "user" | "assistant" | "system";
export type MessageType = "ai" | "degraded" | "crisis" | "system";

export interface ChatMessage {
  role: ChatRole;
  content: string;
}

// Create new conversation
export async function createConversation(
  uid: string,
  firstMessage: string
): Promise<string> {
  const ref = await addDoc(
    collection(firestore, "users", uid, "conversations"),
    {
      title: "A conversation about feelings",
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      lastMessage: firstMessage,
    }
  );

  return ref.id;
}

// Save a message
export async function saveMessage(
  uid: string,
  conversationId: string,
  role: ChatRole,
  content: string,
  type: MessageType
) {
  await addDoc(
    collection(
      firestore,
      "users",
      uid,
      "conversations",
      conversationId,
      "messages"
    ),
    {
      role,
      content,
      type,
      createdAt: serverTimestamp(),
    }
  );

  await updateDoc(
    doc(firestore, "users", uid, "conversations", conversationId),
    {
      lastMessage: content,
      updatedAt: serverTimestamp(),
    }
  );
}

// Get last 10 messages for context
export async function getRecentMessages(
  uid: string,
  conversationId: string
): Promise<ChatMessage[]> {
  const q = query(
    collection(
      firestore,
      "users",
      uid,
      "conversations",
      conversationId,
      "messages"
    ),
    orderBy("createdAt", "desc"),
    limit(10)
  );

  const snap = await getDocs(q);

  return snap.docs
    .map((d) => d.data())
    .reverse()
    .map((d) => ({
      role: d.role,
      content: d.content,
    }));
}

export async function getAllMessages(
  uid: string,
  conversationId: string
): Promise<{ id: string; text: string; sender: "user" | "bot" }[]> {
  const q = query(
    collection(
      firestore,
      "users",
      uid,
      "conversations",
      conversationId,
      "messages"
    ),
    orderBy("createdAt", "asc")
  );

  const snap = await getDocs(q);

  return snap.docs.map((doc) => {
    const role = doc.data().role as "user" | "assistant";

    return {
      id: doc.id,
      text: doc.data().content,
      sender: role === "user" ? "user" : "bot",
    };
  });
}

// Call AI API
export async function sendMessageToAI(
  message: string,
  history: ChatMessage[]
): Promise<{ reply: string; degraded?: boolean }> {
  const res = await fetch("https://bloomind-heathcare.vercel.app/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      message,
      history,
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.code || "AI_SERVICE_ERROR");
  }

  return data;
}
