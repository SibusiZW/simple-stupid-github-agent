import { Agent } from "@mastra/core/agent";

export const agent = new Agent({
  id: 'agent',
  name: 'Agent',
  instructions: "You are a helpful assistant",
  model: 'huggingface/MiniMaxAI/MiniMax-M2'
})