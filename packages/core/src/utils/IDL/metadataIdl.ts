export const METADATA_IDL = {
    version: "0.0.1",
    name: "metadata",
    instructions: [],
    accounts: [
      {
        name: "metadata",
        type: {
          kind: "struct",
          fields: [
            ["key", { "enum": ["metadataV1"] }],
            ["updateAuthority", "publicKey"],
            ["mint", "publicKey"],
            [
              "data",
              {
                kind: "struct",
                fields: [
                  ["name", "string"],
                  ["symbol", "string"],
                  ["uri", "string"],
                  ["sellerFeeBasisPoints", "u16"],
                  [
                    "creators",
                    { kind: "option", type: { kind: "vec", items: { kind: "struct", fields: [
                        ["address", "publicKey"],
                        ["verified", "bool"],
                        ["share", "u8"]
                      ] } } }
                  ],
                ],
              },
            ],
            ["primarySaleHappened", "bool"],
            ["isMutable", "bool"],
            ["editionNonce", { option: "u8" }],
            ["tokenStandard", { enum: ["fungible"] }],
            ["collection", { option: {
              kind: "struct",
              fields: [
                ["verified", "bool"],
                ["key", "publicKey"]
              ]
            }}],
            ["uses", { option: {
              kind: "struct",
              fields: [
                ["useMethod", "u8"],
                ["remaining", "u64"],
                ["total", "u64"]
              ]
            }}],
            ["collectionDetails", "option"]
          ],
        },
      },
    ],
  };
  