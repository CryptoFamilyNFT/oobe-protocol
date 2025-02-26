import { PublicKey } from "@solana/web3.js";
import { Action } from "../../types/action.interface";
import { Agent } from "../../agent/Agents";
import { z } from "zod";
import { PersonaImpl } from "../../agent/persona/Persona";

const personaAwarenessAction: Action = {
    name: "PERSONA_AWARENESS",
    similes: [
        "persona awareness",
        "agent persona",
        "persona consciousness",
        "agent consciousness",
    ],
    description: "Make the agent aware of its persona, including proofs of action, evidence, and evolution.",
    examples: [
        [
            {
                input: {},
                output: {
                    status: "success",
                    persona: {
                        id: '0101',
                        name: "Agent Persona",
                        proofs: {
                            actions: [],
                            evidences: [],
                            evolutions: [],
                        },
                    },
                    message: "Agent is now aware of its persona.",
                },
                explanation: "Make the agent aware of its persona.",
            },
        ],
    ],
    schema: z.object({}),
    handler: async (agent: Agent, input: Record<string, any>) => {
        const persona = Per

        if (!persona) {
            return {
                status: "error",
                message: "Persona not found.",
            };
        }

        return {
            status: "success",
            persona: {
                id: persona.id,
                name: persona.name,
                proofs: persona.getProofs(),
            },
            message: "Agent is now aware of its persona.",
        };
    },
};

export default personaAwarenessAction;