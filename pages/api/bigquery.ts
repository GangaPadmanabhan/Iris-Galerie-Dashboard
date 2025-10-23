import type { NextApiRequest, NextApiResponse } from "next";
import { BigQuery } from "@google-cloud/bigquery";

function createBigQueryClientFromEnv(): BigQuery {
  const b64 = process.env.BQ_SA_KEY_BASE64;
  if (!b64) throw new Error("Missing BQ_SA_KEY_BASE64 env variable");
  const json = Buffer.from(b64, "base64").toString("utf8");
  const creds = JSON.parse(json);
  return new BigQuery({
    projectId: creds.project_id,
    credentials: {
      client_email: creds.client_email,
      private_key: creds.private_key,
    },
  });
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const q = req.query;
    const table = Array.isArray(q.table) ? q.table[0] : q.table;
    const limitParam = Array.isArray(q.limit) ? q.limit[0] : q.limit ?? "100";

    if (!table) return res.status(400).json({ error: "table param required" });
	// allow letters, digits, underscore, dash, dot and $; require at least one dot (dataset.table or project.dataset.table)
	// also reject backticks or semicolons to reduce SQL injection risk
    if (!/^[A-Za-z0-9_\-.$]+$/.test(table) || table.includes("`") || table.includes(";") || table.indexOf(".") === -1) {
    	return res.status(400).json({ error: "invalid table name" });
    }


    const limit = Math.min(2000, Math.max(1, parseInt(String(limitParam), 10) || 100));

    const bq = createBigQueryClientFromEnv();
    const sql = `SELECT * FROM \`${table}\` LIMIT ${limit}`;
    const [rows] = await bq.query({ query: sql, location: "US" });

    res.setHeader("Content-Type", "application/json");
    res.setHeader("Cache-Control", "public, max-age=60, s-maxage=300");
    return res.status(200).json({ rows });
  } catch (err: any) {
    console.error("BigQuery API error:", err);
    return res.status(500).json({ error: err.message || String(err) });
  }
}
