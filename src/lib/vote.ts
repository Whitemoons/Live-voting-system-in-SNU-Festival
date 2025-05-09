import { db } from './firebase';
import { set, get, ref } from 'firebase/database';

async function parseCountAsObject(
    sheetId: string,
    gid: string
): Promise<Record<string, number>> {
    const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json&gid=${gid}`;
    const res = await fetch(url);
    const text = await res.text();

    const json = JSON.parse(text.replace(/^[\s\S]*?setResponse\(/, '').replace(/\);\s*$/, ''));
    const cols = json.table["cols"];
    const rows = json.table["rows"];
    
    const firstRow = rows[0];
    
    const result: Record<string, number> = {};
    cols.forEach((col, i) => {
        const label = col.label;
        const cnt = Number(firstRow.c[i]?.f ?? '0');
        result[label] = cnt;
    });
    
    return result;
}

function deepEqual(obj1: Record<string, number>, obj2: Record<string, number>): boolean {
    const keys1 = Object.keys(obj1);
    if (obj2 == null) {
        return false
    }
    const keys2 = Object.keys(obj2);
    if (keys1.length !== keys2.length) return false;

    return keys1.every(k => obj1[k] === obj2[k]);
}

export async function setLiveVoteCount(counts: Record<string, number>) {
    await set(ref(db, 'vote/live'), counts);
}

export async function getLiveVoteCount() {
    const liveID = import.meta.env.VITE_LIVE_SHEET_ID;
    const liveGID = import.meta.env.VITE_LIVE_SHEET_GID;

    const snapshot = await get(ref(db, 'vote/live'));
    const newData = await parseCountAsObject(liveID, liveGID);

    if (!deepEqual(newData, snapshot.val())) {
        setLiveVoteCount(newData);
    }

    return newData;
}

export async function setFinalVoteCount(counts: Record<string, number>) {
    await set(ref(db, 'vote/final'), counts);
}

export async function getFinalVoteCount() {
    const finalID = import.meta.env.VITE_FINAL_SHEET_ID;
    const finalGID = import.meta.env.VITE_FINAL_SHEET_GID;

    const snapshot = await get(ref(db, 'vote/final'));
    const newData = await parseCountAsObject(finalID, finalGID);

    if (!deepEqual(newData, snapshot.val())) {
        setFinalVoteCount(newData);
    }

    return newData;
}