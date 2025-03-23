/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ELEVEN_LABS_API_KEY: string
  readonly VITE_ELEVEN_LABS_AGENT_ID: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
} 