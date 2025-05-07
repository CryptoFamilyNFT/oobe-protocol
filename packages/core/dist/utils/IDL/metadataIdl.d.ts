export declare const METADATA_IDL: {
    version: string;
    name: string;
    instructions: never[];
    accounts: {
        name: string;
        type: {
            kind: string;
            fields: ((string | {
                enum: string[];
            })[] | (string | {
                kind: string;
                fields: (string | {
                    kind: string;
                    type: {
                        kind: string;
                        items: {
                            kind: string;
                            fields: string[][];
                        };
                    };
                })[][];
            })[] | (string | {
                option: string;
            })[] | (string | {
                option: {
                    kind: string;
                    fields: string[][];
                };
            })[])[];
        };
    }[];
};
//# sourceMappingURL=metadataIdl.d.ts.map