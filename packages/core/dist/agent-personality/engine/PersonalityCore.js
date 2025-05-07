"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PersonalityCore = void 0;
const EvolutionEngine_1 = require("./EvolutionEngine");
const DecisionOracle_1 = require("../logic/DecisionOracle");
const merkletreejs_1 = require("merkletreejs");
const crypto_js_1 = require("crypto-js");
/**
 * PersonalityCore is the central module for managing and evolving an agent's personality.
 * It handles memory synchronization, decision-making, and personality evolution.
 */
class PersonalityCore {
    constructor(profile, // The current personality profile of the agent
    memory // Memory synchronization module
    ) {
        this.profile = profile;
        this.memory = memory;
    }
    /**
     * Tick function to process events and evolve the personality.
     * @param events - Array of events that influence the personality evolution.
     */
    async tick(events) {
        // Evolve the personality profile based on the events
        this.profile = EvolutionEngine_1.EvolutionEngine.evolve(this.profile, events);
        // Synchronize the updated profile with memory
        await this.memory.sync(this.profile);
    }
    /**
     * Decide function to determine the best tool to use based on the personality profile.
     * @param tools - Array of available tools.
     * @returns The name of the selected tool or undefined if no decision is made.
     */
    decide(tools) {
        return DecisionOracle_1.DecisionOracle.decide(this.profile, tools);
    }
    /**
     * Synchronize the current personality profile with memory.
     */
    async syncMemory() {
        await this.memory.sync(this.profile);
    }
    /**
     * Load a personality profile from memory by its ID.
     * @param id - The ID of the personality profile to load.
     */
    async loadMemory(id) {
        this.profile = this.memory.get(id);
    }
    /**
     * Export the current personality profile as a Merkle tree for on-chain validation.
     * @returns A Merkle tree representing the personality profile.
     */
    exportAsMerkleTree() {
        const leaves = [
            (0, crypto_js_1.SHA256)(this.profile.name),
            (0, crypto_js_1.SHA256)(this.profile.tone),
            (0, crypto_js_1.SHA256)(this.profile.stylePrompt),
            (0, crypto_js_1.SHA256)(this.profile.memoryHash || ""),
            (0, crypto_js_1.SHA256)(this.profile.decisionLogicHash || ""),
            (0, crypto_js_1.SHA256)(this.profile.visualHash || ""),
            (0, crypto_js_1.SHA256)(this.profile.profileHash || ""),
            ...this.profile.traits.map((trait) => (0, crypto_js_1.SHA256)(trait.name + trait.value)),
            ...this.profile.evolutionTrail?.map((evolution) => (0, crypto_js_1.SHA256)(evolution)) || [],
            (0, crypto_js_1.SHA256)(this.profile.id),
            (0, crypto_js_1.SHA256)(this.profile.version),
            (0, crypto_js_1.SHA256)(this.profile.emoji || ""),
        ];
        return new merkletreejs_1.MerkleTree(leaves, crypto_js_1.SHA256);
    }
    /**
     * Evolve the personality profile manually with custom logic.
     * @param customLogic - A function that modifies the personality profile.
     */
    evolveManually(customLogic) {
        this.profile = customLogic(this.profile);
    }
    /**
     * Get a summary of the current personality profile.
     * @returns A summary object containing key details of the personality.
     */
    getProfileSummary() {
        return {
            name: this.profile.name,
            tone: this.profile.tone,
            emoji: this.profile.emoji,
            stylePrompt: this.profile.stylePrompt,
        };
    }
    /**
     * Validate the personality profile against a set of rules.
     * @returns True if the profile is valid, otherwise false.
     */
    validateProfile() {
        // Example validation logic
        return (this.profile.name.length > 0 &&
            this.profile.tone.length > 0 &&
            this.profile.stylePrompt.length > 0);
    }
    /**
     * Reset the personality profile to a default state.
     * @param defaultProfile - The default personality profile to reset to.
     */
    resetProfile(defaultProfile) {
        this.profile = defaultProfile;
    }
    /**
     * Log the current state of the personality profile for debugging purposes.
     */
    logProfileState() {
        console.log("Current Personality Profile:", this.profile);
    }
}
exports.PersonalityCore = PersonalityCore;
//# sourceMappingURL=PersonalityCore.js.map