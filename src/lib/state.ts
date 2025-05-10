import { db } from './firebase';
import { set, get, ref } from 'firebase/database';

export type State = 'Initial' | 'R1_1' | 'R1_2' | 'R2-5_1' | 'R2-5_2' | 'R6_1' | 'R6_2' | 'Final' | 'Result' | 'Confirm'

export function idxToState(idx:number): State {
  switch (idx) {
    case 0:
      return 'Initial';
    case 1:
      return 'R1_1';
    case 2:
      return 'R1_2';
    case 3:
      return 'R2-5_1';
    case 4:
      return 'R2-5_2';
    case 5:
      return 'R6_1';
    case 6:
      return 'R6_2';
    case 7:
      return 'Final';
    case 8:
      return 'Result';
    default:
      return 'Confirm';
  }
}

export async function getSavedState() {
  const snapshot = await get(ref(db, 'vote/selected'));
  return snapshot
}
