/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_TINY_API_KEY: string;
    // Add other environment variables here if needed
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
  