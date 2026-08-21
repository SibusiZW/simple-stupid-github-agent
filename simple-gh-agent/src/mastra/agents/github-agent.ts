import { Agent } from "@mastra/core/agent";
import { githubClient } from "../mcp/github-client";
import { Memory } from "@mastra/memory";
import { LibSQLStore } from "@mastra/libsql";
import { createOpenAI } from '@ai-sdk/openai'

const featherless = createOpenAI({
    baseURL: "https://api.featherless.ai/v1",
    apiKey: process.env.FEATHERLESS_API_KEY!
})

export const githubAgent = new Agent({
    id: 'github-agent',
    name: 'agent',
    instructions: "You should perforn GitHub operations and answer GitHub-related questions",
    model: featherless.chat('zai-org/GLM-5.2'),
    tools: await githubClient.listTools(),
    memory: new Memory({
        storage: new LibSQLStore({
            id: 'storage-01',
            url: 'file:./mastra.db'
        })
    })
})