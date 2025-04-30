import { Idl, InstructionCoder } from "@coral-xyz/anchor";
export declare const RayIxNameForAgents: string[];
export declare class RaydiumAmmInstructionCoder implements InstructionCoder {
    constructor(_idl: Idl);
    encode(ixName: string, ix: any): Buffer;
    decode(ix: Buffer): Object;
    encodeState(_ixName: string, _ix: any): Buffer;
}
//# sourceMappingURL=instructions.d.ts.map