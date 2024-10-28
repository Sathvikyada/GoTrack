import { writable } from 'svelte/store';

export const RunLogStore = writable([]);
export const CalorieInfoStore = writable({ weight: ''});