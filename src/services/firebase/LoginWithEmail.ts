import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebaseConfig";

export async function loginWithEmail(email: string, password: string) {
  if (!email || !password) {
    throw new Error("Email and password are required.");
  }

  const result = await signInWithEmailAndPassword(auth, email, password);
  return result.user;
}
