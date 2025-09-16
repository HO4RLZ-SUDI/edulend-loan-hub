import { useCallback, useEffect, useState } from "react";
import { type User, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { auth, firestore, googleProvider } from "@/firebase";
import type { AppUser } from "@/types/firebase";

interface FirebaseAuthState {
  user: User | null;
  profile: AppUser | null;
  loading: boolean;
  error: Error | null;
  signInWithGoogle: () => Promise<void>;
  signOutUser: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const defaultProfile = (user: User): AppUser => ({
  uid: user.uid,
  name: user.displayName ?? "Unnamed User",
  email: user.email ?? "",
  photoURL: user.photoURL,
  role: "student"
});

const useFirebaseAuth = (): FirebaseAuthState => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const hydrateProfile = useCallback(async (firebaseUser: User | null) => {
    if (!firebaseUser) {
      setProfile(null);
      return;
    }

    try {
      const userRef = doc(firestore, "users", firebaseUser.uid);
      const snapshot = await getDoc(userRef);

      if (!snapshot.exists()) {
        const fallbackProfile = defaultProfile(firebaseUser);
        await setDoc(
          userRef,
          {
            ...fallbackProfile,
            updatedAt: serverTimestamp()
          },
          { merge: true }
        );
        setProfile(fallbackProfile);
        return;
      }

      const data = snapshot.data();
      const mergedProfile: AppUser = {
        uid: firebaseUser.uid,
        name: (data.name as string) ?? firebaseUser.displayName ?? "Unnamed User",
        email: (data.email as string) ?? firebaseUser.email ?? "",
        photoURL: firebaseUser.photoURL ?? (data.photoURL as string | undefined) ?? null,
        role: (data.role as AppUser["role"]) ?? "student"
      };

      const shouldUpdateProfile =
        data.name !== mergedProfile.name ||
        data.email !== mergedProfile.email ||
        data.photoURL !== mergedProfile.photoURL;

      const shouldPersistRole = typeof data.role === "undefined";

      if (shouldUpdateProfile || shouldPersistRole) {
        await setDoc(
          userRef,
          {
            name: mergedProfile.name,
            email: mergedProfile.email,
            photoURL: mergedProfile.photoURL ?? null,
            role: mergedProfile.role,
            updatedAt: serverTimestamp()
          },
          { merge: true }
        );
      }

      setProfile(mergedProfile);
    } catch (profileError) {
      setError(profileError as Error);
      setProfile(defaultProfile(firebaseUser));
    }
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(true);
      try {
        await hydrateProfile(firebaseUser);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [hydrateProfile]);

  const signInWithGoogleHandler = useCallback(async () => {
    setError(null);
    await signInWithPopup(auth, googleProvider);
  }, []);

  const signOutHandler = useCallback(async () => {
    setError(null);
    await signOut(auth);
    setProfile(null);
  }, []);

  const refreshProfile = useCallback(async () => {
    await hydrateProfile(user);
  }, [hydrateProfile, user]);

  return {
    user,
    profile,
    loading,
    error,
    signInWithGoogle: signInWithGoogleHandler,
    signOutUser: signOutHandler,
    refreshProfile
  };
};

export default useFirebaseAuth;
