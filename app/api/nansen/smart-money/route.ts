import { NextResponse } from "next/server";
import axios from "axios";

const NANSEN_URL =
  "https://api.nansen.ai/api/v1/smart-money/netflow";

export async function GET() {
  const apiKey = process.env.NANSEN_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      {
        error: "NANSEN_API_KEY is not configured",
      },
      { status: 500 }
    );
  }

  try {
    const response = await axios.post(
      NANSEN_URL,
      {
        chains: ["ethereum", "base", "solana"],
      },
      {
        headers: {
          "Content-Type": "application/json",
          apiKey,
        },
        timeout: 10000,
      }
    );

    return NextResponse.json(response.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Nansen API error:", {
        status: error.response?.status,
        data: error.response?.data,
      });

      return NextResponse.json(
        {
          error: "Nansen API request failed",
          status: error.response?.status,
          details: error.response?.data,
        },
        { status: error.response?.status || 502 }
      );
    }

    console.error("Nansen unexpected error:", error);

    return NextResponse.json(
      { error: "Unexpected Nansen API error" },
      { status: 500 }
    );
  }
}
