import { auth } from "@/app/firebase/client";
import { GoogleAuthProvider, UserCredential, signInWithPopup, signOut } from "firebase/auth";

export const login = (): Promise<UserCredential> => {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider);
};

export const logout = (): Promise<void> => {
  return signOut(auth);
};
