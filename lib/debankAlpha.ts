import axios from "axios";

export async function getDeBankHiddenPnL() {
  try {
    const res = await axios.get(
      "https://api.debank.com/user/total_balance?id=top_wallet_1",
      {
        timeout: 10000,
      }
    );

    if (!res.data) {
      throw new Error("DeBank returned an empty response");
    }

    return {
      top100Buying: Number(res.data.unrealized_pnl ?? 0) > 800,
      avgPnL7d: Number(res.data.pnl_7d ?? 0),
      unavailable: false,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;

      if (status === 429) {
        console.warn(
          "DeBank API rate limited. Using safe fallback."
        );

        return {
          top100Buying: false,
          avgPnL7d: 0,
          unavailable: true,
          reason: "rate_limited",
        };
      }

      console.error("DeBank request failed:", {
        status,
        data: error.response?.data,
      });
    } else {
      console.error("DeBank request failed:", error);
    }

    return {
      top100Buying: false,
      avgPnL7d: 0,
      unavailable: true,
      reason: "debank_request_failed",
    };
  }
}
