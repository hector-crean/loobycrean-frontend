import { writable } from "svelte/store";
import type { Cursor3DKind } from "./cursor.type";

export let cursorKind = writable<Cursor3DKind>('default-3D-cursor')