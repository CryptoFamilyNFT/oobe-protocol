import { Trait } from "../types/SpriteProfile";
export declare class TraitTransformer {
    static invert(traits: Trait[]): Trait[];
    static amplify(traits: Trait[], factor: number): Trait[];
    static normalize(traits: Trait[]): Trait[];
    static randomize(traits: Trait[], range: number): Trait[];
    static interlace(base: Trait[], overlay: Trait[]): Trait[];
    static fuse(profiles: Trait[][]): Trait[];
    static setTraitValue(traits: Trait[], traitName: string, value: number): Trait[];
    static resetTraits(traits: Trait[]): Trait[];
    static addTrait(traits: Trait[], traitName: string): Trait[];
    static removeTrait(traits: Trait[], traitName: string): Trait[];
    static getTraitValue(traits: Trait[], traitName: string): number;
    static getTraitNames(traits: Trait[]): string[];
    static getTotalTraitValues(traits: Trait[]): number[];
    static getAverageTraitValue(traits: Trait[]): number;
}
//# sourceMappingURL=TraitTransformer.d.ts.map