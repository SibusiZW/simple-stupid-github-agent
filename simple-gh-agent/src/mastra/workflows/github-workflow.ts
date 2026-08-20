import { createStep } from "@mastra/core/workflows";
import z from "zod";
import { mastra } from "..";

const approvalStep = createStep({
    id: 'human-appoval',
    description: "waits for human approval",

    inputSchema: z.object({
        task: z.string()
    }),

    outputSchema: z.object({
        task: z.string(),
        approved: z.boolean()
    }),

    resumeSchema: z.object({
        approved: z.boolean()
    }),

    suspendSchema: z.object({
        task: z.string(),
        message: z.string()
    }),

    execute: async ({ inputData, resumeData, suspend }) => {
        if (!resumeData) {
            return await suspend({
                task: inputData.task,
                message: `Do you want to execute: "${inputData.task}"?`
            });
        }

        return {
            task: inputData.task,
            approved: resumeData.approved
        }
    }
})

const executeTaskStep = createStep({
    id: 'execute-step',
    description: "Executes a task",

    inputSchema: z.object({
        task: z.string(),
        approved: z.boolean()
    }),

    outputSchema: z.object({
        result: z.string()
    }),

    execute: async ({ inputData }) => {
        if (!inputData.approved) {
            return {
                result: `Task: ${inputData.task} could not be executed`
            }
        }

        const agent = mastra.getAgent('githubAgent');

        const response = await agent.generate(`Perform the following GitHub task: ${inputData.task}`)
        const res = response.text

        return {
            result: res
        }
    }
})