import type { NextRequest } from "next/server";

export async function GET(_request: NextRequest) {
  return new Response(JSON.stringify({ status: "ok" }), {
    headers: { "Content-Type": "application/json" },
  });
}
