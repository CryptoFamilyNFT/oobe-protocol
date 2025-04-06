import axios from "axios";

// Query mainnet pool info from rpc https://api.raydium.io/v2/sdk/liquidity/mainnet.json.
export async function filterRayMainnet() {
    try {
        const response = await axios.get("https://api.raydium.io/v2/sdk/liquidity/mainnet.json");
        const data = response.data;
        const filteredData = data.filter((item: any) => item.name.includes("Raydium"));
        return filteredData;
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}