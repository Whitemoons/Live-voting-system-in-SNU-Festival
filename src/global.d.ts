// src/global.d.ts
/// <reference types="svelte" />

declare module "*.svelte" {
    import { SvelteComponentTyped } from "svelte";
    export default class extends SvelteComponentTyped<any, any, any> {}
  }