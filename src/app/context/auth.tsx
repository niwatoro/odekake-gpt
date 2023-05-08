"use client";

import { onAuthStateChanged } from "@firebase/auth";
import { doc } from "@firebase/firestore";
import { getDoc, setDoc } from "firebase/firestore";
import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../firebase/client";
import { User } from "../types/user";

type UserContextType = User | null | undefined;

const AuthContext = createContext<UserContextType>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserContextType>();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const ref = doc(db, `users/${firebaseUser.uid}`);
        const snap = await getDoc(ref);

        if (snap.exists()) {
          const appUser = snap.data() as User;
          setUser(appUser);
        } else {
          const appUser: User = {
            id: firebaseUser.uid,
            name: firebaseUser.displayName!,
            email: firebaseUser.email!,
            photoURL: firebaseUser.photoURL!,
            createdAt: Date.now(),
          };

          setDoc(ref, appUser).then(() => {
            setUser(appUser);
          });
        }
      } else {
        setUser(null);
      }

      return unsubscribe;
    });
  }, []);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
