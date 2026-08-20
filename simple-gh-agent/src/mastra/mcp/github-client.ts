import { MCPClient } from "@mastra/mcp";

export const githubClient = new MCPClient({
    servers: {
        github: {
            url: new URL("https://api.githubcopilot.com/mcp"),
            requestInit: {
                headers: {
                    Authorization: `Bearer ${process.env.GITHUB_ACCESS_TOKEN!}`
                }
            }
        }
    }
})