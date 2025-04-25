"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTokenMetadata = getTokenMetadata;
const web3_js_1 = require("@solana/web3.js");
const spl_token_1 = require("@solana/spl-token");
async function getTokenMetadata(connection, metadataPDA, mint) {
    let metadata = await connection.getAccountInfo(metadataPDA);
    // Verifica se il token è un Token2022
    let isToken2022 = false;
    const mintInfo = await (0, spl_token_1.getMint)(connection, mint, "confirmed");
    if (mintInfo.mintAuthority?.equals(spl_token_1.TOKEN_2022_PROGRAM_ID)) {
        isToken2022 = true;
    }
    // Se è un Token2022, usa il metodo corretto
    if (isToken2022) {
        try {
            const tokenMetadata = await (0, spl_token_1.getTokenMetadata)(connection, mint, "confirmed", spl_token_1.TOKEN_2022_PROGRAM_ID);
            if (tokenMetadata) {
                return {
                    name: tokenMetadata.name ?? null,
                    symbol: tokenMetadata.symbol ?? null,
                    uri: tokenMetadata.uri ?? null,
                    sellerFeeBasisPoints: 0,
                    creators: null,
                    decimals: 9,
                };
            }
        }
        catch (e) {
            return null;
        }
    }
    // Se non è un Token2022, prova a recuperare i metadati SPL standard
    if (!metadata?.data) {
        return null;
    }
    let offset = 1 + 32 + 32; // key + update auth + mint
    const data = metadata.data;
    const decoder = new TextDecoder();
    // Funzione per leggere stringhe variabili
    const readString = () => {
        let nameLength = data?.[offset];
        while (nameLength === 0) {
            offset++;
            nameLength = data?.[offset];
            if (!data || offset >= data.length)
                return null;
        }
        if (nameLength === undefined)
            return null;
        offset++;
        const name = decoder
            .decode(data.slice(offset, offset + nameLength))
            .replace(new RegExp(String.fromCharCode(0), "g"), "");
        offset += nameLength;
        return name;
    };
    // 📌 3️⃣ Ottieni i DECIMALI dal mint
    const decimals = mintInfo.decimals;
    const name = readString();
    const symbol = readString();
    const uri = readString();
    if (!data)
        return null;
    let sellerFeeBasisPoints = 0;
    try {
        sellerFeeBasisPoints = data.readUInt16LE(offset);
        offset += 2;
    }
    catch (e) {
        return;
    }
    let creators = null;
    if (data[offset] === 1) {
        offset++;
        const numCreators = data[offset];
        offset++;
        creators = [...Array(numCreators)].map(() => {
            const creator = {
                address: new web3_js_1.PublicKey(data.slice(offset, offset + 32)),
                verified: data[offset + 32] === 1,
                share: data[offset + 33],
            };
            offset += 34;
            return creator;
        });
    }
    return {
        name,
        symbol,
        uri,
        sellerFeeBasisPoints,
        creators,
        decimals
    };
}
//# sourceMappingURL=tokenMetadata.js.map