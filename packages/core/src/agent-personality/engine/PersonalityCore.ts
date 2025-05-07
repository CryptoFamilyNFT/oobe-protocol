import { SpriteProfile } from "../types/SpriteProfile";
import { EvolutionEngine } from "./EvolutionEngine";
import { MemorySync } from "../state/memorySync";
import { DecisionOracle } from "../logic/DecisionOracle";
import { PersonalityProfile } from "../onchain/AgentPersonality";
import { MerkleTree } from "merkletreejs";
import { SHA256 } from "crypto-js";

/**
 * PersonalityCore is the central module for managing and evolving an agent's personality.
 * It handles memory synchronization, decision-making, and personality evolution.
 */
export class PersonalityCore {
  constructor(
    public profile: SpriteProfile, // The current personality profile of the agent
    private memory: MemorySync // Memory synchronization module
  ) {}

  /**
   * Tick function to process events and evolve the personality.
   * @param events - Array of events that influence the personality evolution.
   */
  async tick(events: string[]) {
    // Evolve the personality profile based on the events
    this.profile = EvolutionEngine.evolve(this.profile, events);

    // Synchronize the updated profile with memory
    await this.memory.sync(this.profile);
  }

  /**
   * Decide function to determine the best tool to use based on the personality profile.
   * @param tools - Array of available tools.
   * @returns The name of the selected tool or undefined if no decision is made.
   */
  decide(tools: string[]): string | undefined {
    return DecisionOracle.decide(this.profile, tools);
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
  async loadMemory(id: string) {
    this.profile = this.memory.get(id) as SpriteProfile;
  }

  /**
   * Export the current personality profile as a Merkle tree for on-chain validation.
   * @returns A Merkle tree representing the personality profile.
   */
  exportAsMerkleTree(): MerkleTree {
    const leaves = [
      SHA256(this.profile.name),
      SHA256(this.profile.tone),
      SHA256(this.profile.stylePrompt),
      SHA256(this.profile.memoryHash || ""),
      SHA256(this.profile.decisionLogicHash || ""),
      SHA256(this.profile.visualHash || ""),
      SHA256(this.profile.profileHash || ""),
      ...this.profile.traits.map((trait) => SHA256(trait.name + trait.value)),
      ...this.profile.evolutionTrail?.map((evolution) => SHA256(evolution)) || [],
      SHA256(this.profile.id),
      SHA256(this.profile.version),
      SHA256(this.profile.emoji || ""),
    ];
    return new MerkleTree(leaves, SHA256);
  }

  /**
   * Evolve the personality profile manually with custom logic.
   * @param customLogic - A function that modifies the personality profile.
   */
  evolveManually(customLogic: (profile: SpriteProfile) => SpriteProfile) {
    this.profile = customLogic(this.profile);
  }

  /**
   * Get a summary of the current personality profile.
   * @returns A summary object containing key details of the personality.
   */
  getProfileSummary(): Record<string, any> {
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
  validateProfile(): boolean {
    // Example validation logic
    return (
      this.profile.name.length > 0 &&
      this.profile.tone.length > 0 &&
      this.profile.stylePrompt.length > 0
    );
  }

  /**
   * Reset the personality profile to a default state.
   * @param defaultProfile - The default personality profile to reset to.
   */
  resetProfile(defaultProfile: SpriteProfile) {
    this.profile = defaultProfile;
  }

  /**
   * Log the current state of the personality profile for debugging purposes.
   */
  logProfileState() {
    console.log("Current Personality Profile:", this.profile);
  }
}