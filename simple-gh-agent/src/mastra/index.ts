import { Mastra } from "@mastra/core";
import { githubAgent } from "./agents/github-agent";

export const mastra = new Mastra({
  agents: { githubAgent }
})