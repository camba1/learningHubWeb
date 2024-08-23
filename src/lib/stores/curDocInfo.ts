import { writable, type Writable } from 'svelte/store';

const curDocInfo: Writable<{filename: string, docDetail_key: string}> = writable();

export default curDocInfo;