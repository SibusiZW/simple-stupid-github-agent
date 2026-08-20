import { Mastra } from "@mastra/core";
import { githubAgent } from "./agents/github-agent";
import { githubWorkflow } from "./workflows/github-workflow";

export const mastra = new Mastra({
  agents: { githubAgent },
  workflows: { githubWorkflow }
})