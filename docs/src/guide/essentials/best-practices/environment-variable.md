# Environment Variable

Environment variables are used for a variety of practical reasons, offering benefits in areas like configuration management, security, portability, and automation. Here's why they're important:

1. **Separation of concerns:** Keep configurations separate from code.
2. **Security:** Protect sensitive information like passwords and keys.
3. **Portability:** Ensure the app works the same way across different environments and platforms.
4. **Automation:** Enable automated deployment and scaling with dynamic configuration.
5. **Flexibility:** Customize behavior without modifying code.
6. **Efficiency:** Update configurations without needing to redeploy or change code.
7. **Ease of debugging:** Quickly change configurations during development.

## Example in Backend (Bun)

In Bun, you can interact with [Enviroment Variable](https://bun.sh/guides/runtime/read-env) (which TypeScript runs on) is through the process.env object.

:::: code-group
```bash [.env]
# SERVER CONFIG
PORT=3000
HOST=
```
```ts [server.ts]
import { IServerConfig } from '@point-hub/papi'

export const port = Number(process.env.PORT || 3000)
export const host = `${process.env.HOST}`

const serverConfig: IServerConfig = {
  port,
  host,
}

export default serverConfig
```
::::

## Example in Frontend (Vue / Vite)

Vite exposes [Environment Variable](https://vite.dev/guide/env-and-mode) on the special `import.meta.env` object, which are statically replaced at build time.

:::: code-group
```bash [.env]
# API
VITE_API_BASE_URL=http://localhost:3000
VITE_API_TIMEOUT=120000 
```
```ts [api.ts]
export const baseURL: string = import.meta.env.VITE_API_BASE_URL
export const timeout: number = Number(import.meta.env.VITE_API_TIMEOUT)

export default {
  baseURL: baseURL,
  timeout: timeout
}
```
::::

## Environment File

The distinction between .env and .env.example files is important for managing configuration and environment variables in a project, especially when working with version control and team collaboration. 

Key Differences Between `.env` and `.env.example`:

| Aspect	| `.env` | `.env.example` |
| --- | --- | --- |
| Purpose | Holds actual environment variables | Template or example of environment variables |
| Content	| Contains actual, often sensitive data (API keys, passwords) | Contains placeholder or example values |
| Version Control | Never committed to version control (added to .gitignore) | Always committed to version control |
| Usage | Loaded by the application at runtime | Used to show the required variables for the project |
| Security | Can contain sensitive information | Does not contain sensitive information (safe to share) |

