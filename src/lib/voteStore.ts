import { writable } from 'svelte/store';

export const liveVote = writable<Record<string, number>>({});
export const finalVote = writable<Record<string, number>>({});
export const state = writable<number>(0);