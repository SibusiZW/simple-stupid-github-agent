import { Agent } from "@mastra/core/agent";
import { githubClient } from "../mcp/github-client";

export const githubAgent = new Agent({
    id: 'github-agent',
    name: 'agent',
    instructions: "You should perforn GitHub operations and answer GitHub-related questions",
    model: 'huggingface/MiniMaxAI/MiniMax-M2',
    tools: await githubClient.listTools()
})