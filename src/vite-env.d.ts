/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_MOCKING: string;
  readonly VITE_API_PATH: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare global {
  interface Window {
    KGI_MINE_BASE_URI: string;
  }
}

export {};
