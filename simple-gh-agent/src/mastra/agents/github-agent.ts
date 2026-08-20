import { Agent } from "@mastra/core/agent";
import { githubClient } from "../mcp/github-client";
import { Memory } from "@mastra/memory";
import { LibSQLStore } from "@mastra/libsql";

export const githubAgent = new Agent({
    id: 'github-agent',
    name: 'agent',
    instructions: "You should perforn GitHub operations and answer GitHub-related questions",
    model: 'huggingface/MiniMaxAI/MiniMax-M2',
    tools: await githubClient.listTools(),
    memory: new Memory({
        storage: new LibSQLStore({
            id: 'storage-01',
            url: 'file:./mastra.db'
        })
    })
})