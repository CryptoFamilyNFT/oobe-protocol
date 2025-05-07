import { StructuredTool } from "@langchain/core/tools";
import { Agent } from "../../../agent/Agents";
import { z } from "zod";
export declare class UsePersonalityTool extends StructuredTool {
    private agent;
    schema: z.ZodObject<{
        SpriteProfile: z.ZodObject<{
            name: z.ZodString;
            tone: z.ZodString;
            description: z.ZodString;
            traits: z.ZodArray<z.ZodObject<{
                trait: z.ZodString;
                value: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                value: number;
                trait: string;
            }, {
                value: number;
                trait: string;
            }>, "many">;
        }, "strip", z.ZodTypeAny, {
            name: string;
            description: string;
            tone: string;
            traits: {
                value: number;
                trait: string;
            }[];
        }, {
            name: string;
            description: string;
            tone: string;
            traits: {
                value: number;
                trait: string;
            }[];
        }>;
    }, "strip", z.ZodTypeAny, {
        SpriteProfile: {
            name: string;
            description: string;
            tone: string;
            traits: {
                value: number;
                trait: string;
            }[];
        };
    }, {
        SpriteProfile: {
            name: string;
            description: string;
            tone: string;
            traits: {
                value: number;
                trait: string;
            }[];
        };
    }>;
    name: string;
    description: string;
    constructor(agent: Agent, schema?: z.ZodObject<{
        SpriteProfile: z.ZodObject<{
            name: z.ZodString;
            tone: z.ZodString;
            description: z.ZodString;
            traits: z.ZodArray<z.ZodObject<{
                trait: z.ZodString;
                value: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                value: number;
                trait: string;
            }, {
                value: number;
                trait: string;
            }>, "many">;
        }, "strip", z.ZodTypeAny, {
            name: string;
            description: string;
            tone: string;
            traits: {
                value: number;
                trait: string;
            }[];
        }, {
            name: string;
            description: string;
            tone: string;
            traits: {
                value: number;
                trait: string;
            }[];
        }>;
    }, "strip", z.ZodTypeAny, {
        SpriteProfile: {
            name: string;
            description: string;
            tone: string;
            traits: {
                value: number;
                trait: string;
            }[];
        };
    }, {
        SpriteProfile: {
            name: string;
            description: string;
            tone: string;
            traits: {
                value: number;
                trait: string;
            }[];
        };
    }>);
    protected _call(input: z.infer<typeof this.schema>): Promise<string>;
}
//# sourceMappingURL=u-personality.tool.d.ts.map