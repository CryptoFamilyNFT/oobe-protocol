import { SpriteProfile } from "../types/SpriteProfile";
import { MemorySync } from "../state/memorySync";
import { MerkleTree } from "merkletreejs";
/**
 * PersonalityCore is the central module for managing and evolving an agent's personality.
 * It handles memory synchronization, decision-making, and personality evolution.
 */
export declare class PersonalityCore {
    profile: SpriteProfile;
    private memory;
    constructor(profile: SpriteProfile, // The current personality profile of the agent
    memory: MemorySync);
    /**
     * Tick function to process events and evolve the personality.
     * @param events - Array of events that influence the personality evolution.
     */
    tick(events: string[]): Promise<void>;
    /**
     * Decide function to determine the best tool to use based on the personality profile.
     * @param tools - Array of available tools.
     * @returns The name of the selected tool or undefined if no decision is made.
     */
    decide(tools: string[]): string | undefined;
    /**
     * Synchronize the current personality profile with memory.
     */
    syncMemory(): Promise<void>;
    /**
     * Load a personality profile from memory by its ID.
     * @param id - The ID of the personality profile to load.
     */
    loadMemory(id: string): Promise<void>;
    /**
     * Export the current personality profile as a Merkle tree for on-chain validation.
     * @returns A Merkle tree representing the personality profile.
     */
    exportAsMerkleTree(): MerkleTree;
    /**
     * Evolve the personality profile manually with custom logic.
     * @param customLogic - A function that modifies the personality profile.
     */
    evolveManually(customLogic: (profile: SpriteProfile) => SpriteProfile): void;
    /**
     * Get a summary of the current personality profile.
     * @returns A summary object containing key details of the personality.
     */
    getProfileSummary(): Record<string, any>;
    /**
     * Validate the personality profile against a set of rules.
     * @returns True if the profile is valid, otherwise false.
     */
    validateProfile(): boolean;
    /**
     * Reset the personality profile to a default state.
     * @param defaultProfile - The default personality profile to reset to.
     */
    resetProfile(defaultProfile: SpriteProfile): void;
    /**
     * Log the current state of the personality profile for debugging purposes.
     */
    logProfileState(): void;
}
//# sourceMappingURL=PersonalityCore.d.ts.map