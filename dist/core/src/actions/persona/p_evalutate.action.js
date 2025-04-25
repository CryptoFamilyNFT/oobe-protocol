"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const personaAwarenessAction = {
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
    schema: zod_1.z.object({}),
    handler: async (agent, input) => {
        const persona = await agent.createPersona("Agent Persona");
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
exports.default = personaAwarenessAction;
//# sourceMappingURL=p_evalutate.action.js.map