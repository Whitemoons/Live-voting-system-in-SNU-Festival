import { getSavedState } from './state';
import { getLiveVoteCount, getFinalVoteCount } from './vote'; 
import { liveVote, finalVote, state } from './voteStore';

let intervalStateId: number | null = null;
let intervalLiveId: number | null = null;
let intervalFinalId: number | null = null;

export function startStatePolling(intervalMs = 1000) {
  if (intervalStateId === null) {
    intervalStateId = setInterval(async () => {
      const snapshot = await getSavedState();
      const newState = snapshot.val();
  
      if (JSON.stringify(state) !== JSON.stringify(newState)) {
        state.set(newState);
      }
    }, intervalMs);
  }
}

export function stopStatePolling() {
  if (intervalStateId !== null) {
      clearInterval(intervalStateId);
      intervalStateId = null;
  }
}

export function startLivePolling(intervalMs = 1000) {
  if (intervalLiveId === null) {
    intervalLiveId = setInterval(async () => {
        const data = await getLiveVoteCount();
        liveVote.set(data);
      }, intervalMs);
  }
}

export function stopLivePolling() {
  if (intervalLiveId !== null) {
    clearInterval(intervalLiveId);
    intervalLiveId = null;
  }
}

export function isLivePolling(): boolean {
  return intervalLiveId !== null;
}


export function startFinalPolling(intervalMs = 1000) {
  if (intervalFinalId === null) {
    intervalFinalId = setInterval(async () => {
      const data = await getFinalVoteCount();
      finalVote.set(data);
    }, intervalMs);
  }
}

export function stopFinalPolling() {
  if (intervalFinalId !== null) {
    clearInterval(intervalFinalId);
    intervalFinalId = null;
  }
}

export function isFinalPolling(): boolean {
  return intervalFinalId !== null;
}