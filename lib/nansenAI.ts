import axios from "axios";

export async function getNansenSmartMoney() {
  try {
    const res = await axios.get("/api/nansen/smart-money");

    if (!res.data) {
      throw new Error("Nansen returned an empty response");
    }

    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;

      if (status === 403) {
        console.warn(
          "Nansen API unavailable: insufficient credits. Using safe fallback."
        );

        return {
          data: [],
          unavailable: true,
          reason: "insufficient_credits",
        };
      }

      console.error("Nansen request failed:", {
        status,
        data: error.response?.data,
      });
    } else {
      console.error("Nansen request failed:", error);
    }

    return {
      data: [],
      unavailable: true,
      reason: "nansen_request_failed",
    };
  }
}
