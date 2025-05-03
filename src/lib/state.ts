import { db } from './firebase';
import { set, get, ref } from 'firebase/database';

export async function getSavedState() {
  const snapshot = await get(ref(db, 'vote/selected'));
  return snapshot
}