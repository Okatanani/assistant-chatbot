// pages/api/checkRun.js
import { runCheck } from "../../utils/openai";
import { NextApiResponse, NextApiRequest } from "next";

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { runId, threadId } = req.body;

      if (!runId || !threadId) {
        return res.status(400).json({ error: "Missing Fields" });
      }

      const checkResult = await runCheck({ runId, threadId });
      res.status(200).json(checkResult);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
