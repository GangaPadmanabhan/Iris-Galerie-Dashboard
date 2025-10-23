import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(_req: NextApiRequest, res: NextApiResponse) {
  // safe debug endpoint: DO NOT RETURN SECRET VALUES
  const topLevel = typeof process.env.BQ_SA_KEY_BASE64 !== "undefined";
  const secretsObj = (process.env as any).secrets ?? null;
  const secretsList = secretsObj ? Object.keys(secretsObj) : null;
  res.status(200).json({
    topLevel_BQ_SA_KEY_BASE64: topLevel,
    secrets_present: secretsObj !== null,
    secrets_keys_sample: secretsList ? secretsList.slice(0, 20) : null,
    node_env: process.env.NODE_ENV ?? null,
    platform: process.platform ?? null,
  });
}
