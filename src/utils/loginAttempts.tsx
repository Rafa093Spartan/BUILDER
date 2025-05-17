// src/utils/loginAttempts.ts
import { doc, getDoc, setDoc, updateDoc, serverTimestamp, Timestamp } from "firebase/firestore";
import { db } from "../firebaseConfig";

const MAX_ATTEMPTS = 5;
const BLOCK_DURATION_MINUTES = 15;

export async function checkIfBlocked(uidOrEmail: string): Promise<{blocked: boolean, timeLeftMinutes?: number}> {
  const docRef = doc(db, "loginAttempts", uidOrEmail);
  const docSnap = await getDoc(docRef);
  if (!docSnap.exists()) return { blocked: false };

  const data = docSnap.data();
  if (data.blockedUntil && data.blockedUntil.toDate() > new Date()) {
    const diffMs = data.blockedUntil.toDate().getTime() - new Date().getTime();
    return { blocked: true, timeLeftMinutes: Math.ceil(diffMs / 60000) };
  }
  return { blocked: false };
}

export async function recordFailedAttempt(uidOrEmail: string) {
  const docRef = doc(db, "loginAttempts", uidOrEmail);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    await setDoc(docRef, {
      attempts: 1,
      lastAttempt: serverTimestamp(),
      blockedUntil: null,
    });
    return;
  }

  const data = docSnap.data();
  const newAttempts = (data.attempts || 0) + 1;

  let blockedUntil = null;
  if (newAttempts >= MAX_ATTEMPTS) {
    blockedUntil = Timestamp.fromDate(new Date(Date.now() + BLOCK_DURATION_MINUTES * 60 * 1000));
  }

  await updateDoc(docRef, {
    attempts: newAttempts,
    lastAttempt: serverTimestamp(),
    blockedUntil,
  });
}

export async function resetAttempts(uidOrEmail: string) {
  const docRef = doc(db, "loginAttempts", uidOrEmail);
  await setDoc(docRef, {
    attempts: 0,
    lastAttempt: null,
    blockedUntil: null,
  });
}
