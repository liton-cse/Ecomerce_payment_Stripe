/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_STRIPE_PUBLISH_KEY: string;
  // add other env variables here if needed
}

export interface ImportMeta {
  readonly env: ImportMetaEnv;
}
