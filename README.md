# 🤖 MCP X/Twitter Post Server & Client

This project demonstrates a Model Context Protocol (MCP) server that allows interaction with the X (formerly Twitter) API, along with a client to interact with the server using Google's Gemini AI, and an automated daily posting script.

## ✨ Features

- **MCP Server (`/server`)**: Exposes a `createPost` tool via MCP to post tweets.
- **MCP Client (`/client`)**: Connects to the MCP server and uses Google Gemini AI to interact with the `createPost` tool through natural language.
- **Auto Poster (`/server/autopost.ts`)**: Fetches top Hacker News stories daily, generates a recap using Gemini AI, and posts it to X using the `createPost` tool.
- **GitHub Action (`/.github/workflows/daily-post.yml`)**: Runs the auto-poster script daily at 12:00 UTC. 🕛

## 🚀 Getting Started

### Prerequisites

- [Bun](https://bun.sh/) installed (`v1.2.5` or later recommended).
- Node.js (compatible version for Bun).
- API keys for X/Twitter and Google Gemini AI.

### Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Xeven777/x-post-mcp-server
    cd x-post-mcp-server
    ```
2.  **Environment Variables:**
    - Navigate to the `server` directory: `cd server`
    - Create a `.env` file by copying the example or creating a new one. See [`server/.env`](/home/anish/Documents/github/x-post-mcp-server/server/.env) for required variables (you'll need `TWITTER_API_KEY`, `TWITTER_API_SECRET`, `TWITTER_ACCESS_TOKEN`, `TWITTER_ACCESS_SECRET`, `GEMINI_API_KEY`).
    - Fill in your API credentials.
    - Navigate back to the root directory: `cd ..`
    - _(Optional)_ If the client needs specific environment variables (like `GEMINI_API_KEY` if not using the server's), repeat the `.env` creation process in the `client` directory. The current client reads `GEMINI_API_KEY` from the environment it's run in.

### 🖥️ Server (`/server`)

The server exposes the MCP endpoint and the `createPost` tool.

1.  **Navigate to the server directory:**
    ```bash
    cd server
    ```
2.  **Install dependencies:**
    ```bash
    bun install
    ```
3.  **Run the server (development mode with hot-reloading):**
    ```bash
    bun run dev
    ```
    Or, to run the compiled version (after building):
    ```bash
    bun run build
    bun run start
    ```
    The server will be running on `http://localhost:3001`.

### 🗣️ Client ([`client`](client))

The client connects to the server and allows you to interact with the [`createPost`](server/mcp.tool.ts) tool using natural language via Gemini.

1.  **Navigate to the client directory:**
    ```bash
    cd client
    ```
2.  **Install dependencies:**
    ```bash
    bun install
    ```
3.  **Ensure the server is running.**
4.  **Run the client:**
    _(Make sure [`GEMINI_API_KEY`](client/index.ts) is available in this terminal's environment)_
    ```bash
    bun run index.ts
    ```
    You can now chat with the AI. Try asking it to "post 'Hello World!' to X".

### 📰 Auto Poster (`/server/autopost.ts`)

This script fetches the top 5 Hacker News stories from the last ~24 hours, uses Gemini to generate a witty recap, and posts it to X.

1.  **Navigate to the server directory:**
    ```bash
    cd server
    ```
2.  **Ensure dependencies are installed (`bun install`).**
3.  **Ensure your [`server/.env`](server/.env) file has both Twitter and Gemini keys.**
4.  **Run the script directly:**
    ```bash
    bun run autopost.ts
    ```

### 🔁 Daily GitHub Action

The workflow defined in [`.github/workflows/daily-post.yml`](.github/workflows/daily-post.yml) automates the execution of the [`server/autopost.ts`](server/autopost.ts) script every day at 12:00 UTC.

- It checks out the code.
- Sets up Bun.
- Installs server dependencies.
- Runs `bun run autopost.ts` using secrets configured in the GitHub repository settings ([`TWITTER_API_KEY`](server/mcp.tool.ts), [`TWITTER_API_SECRET`](server/mcp.tool.ts), etc.).

Enjoy using the MCP X Poster! 🎉
