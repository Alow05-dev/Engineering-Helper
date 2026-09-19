# Engineering Copilot — AI Edition

This repository contains the polished frontend plus a secure serverless AI endpoint.

## Why the architecture changed

A GitHub Pages site is static. An OpenAI API key must **not** be placed in `index.html`, because anyone could extract it.

This build keeps the UI in `index.html` and sends homework requests to `/api/solve`. The serverless function holds the API key in an environment variable.

## Deploy from GitHub

Recommended path:

1. Push this entire folder to a GitHub repository.
2. Import the repository into Vercel.
3. In Vercel → Project Settings → Environment Variables, add:
   - `OPENAI_API_KEY` = your OpenAI API key
   - Optional: `OPENAI_MODEL` = `gpt-5.6-luna`
4. Deploy.
5. Open the Vercel URL and test **Analyze & Solve with AI**.

You can still keep the repository on GitHub. Vercel deploys the same GitHub repository and provides the serverless `/api/solve` endpoint.

## Important

Do not commit an API key to GitHub. Keep it only in Vercel Environment Variables.

## Current AI capabilities

- Natural-language engineering problem solving
- Step-by-step explanations
- Discipline-aware prompting
- Hints / teaching / practice modes
- Missing-data detection
- Units and verification guidance

The next upgrade can add image input/OCR, persistent user accounts, saved projects, specialized engineering calculation engines, formula/reference packs, and subscription/usage controls.
