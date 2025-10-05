import express from "express";
import AI from "./ai.js";
import fs from "fs";
import { config } from "dotenv";
config();
import cors from "cors";
import OpenAI from "openai";

const app = express();
app.disable("x-powered-by");
app.use(cors());
app.use(express.json());

const ai = new AI();
const openai = new OpenAI({
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
  apiKey: process.env.GEMINI_API_KEY || "",
});

export type Data = {
  id: string;
  title: string;
  abstract: string;
  description?: string;
  byPeople: string[];
  url: string;
  summary: string;
  keyPoints: string;
  tags: string[];
  confidence: number;
  objectives: string[];
  embedding?: number[];
  schTxt?: string;
  processedAt?: Date;
};

const processedData: Data[] = JSON.parse(
  fs.readFileSync(process.cwd() + "/processed.json").toString()
);

// Get a set of all unique tags for quick lookups
const allUniqueTags = new Set(processedData.flatMap((doc) => doc.tags || []));

const calculateRelevance = (doc: Data, query: string): number => {
  let score = 0;
  const lowerCaseQuery = query.toLowerCase();
  const queryTerms = lowerCaseQuery
    .split(" ")
    .filter((term) => term.length > 1);

  if (doc.title.toLowerCase().includes(lowerCaseQuery)) {
    score += 50;
  }
  const titleWords = new Set(doc.title.toLowerCase().split(" "));
  if (queryTerms.every((term) => titleWords.has(term))) {
    score += 25;
  }
  queryTerms.forEach((term) => {
    if (doc.title.toLowerCase().includes(term)) {
      score += 10;
    }
    const description = (doc.abstract || doc.description || "").toLowerCase();
    if (description.includes(term)) {
      score += 5;
    }
    if (doc.tags.some((tag) => tag.toLowerCase().includes(term))) {
      score += 2;
    }
  });
  return score;
};

app.get("/", (req, res) =>
  res.send({ status: 200, message: "Backend online" })
);

app.get("/api/docBySearch", async (req, res) => {
  const query = (req.query.q as string) || "";
  const page = parseInt(req.query.page as string) || 1;
  const limit = 15;

  if (!query) {
    return res.status(400).send({ status: 400, message: "Missing query" });
  }

  // --- START OF THE FIX ---
  // ID Search with '#'
  if (query.startsWith("#")) {
    const id = query.substring(1);
    const doc = processedData.find((d) => d.id === id);
    if (doc) {
      const { embedding, schTxt, processedAt, ...rest } = doc;
      return res.send({ status: 200, data: [rest], total: 1 });
    } else {
      return res.send({ status: 200, data: [], total: 0 });
    }
  }

  // Direct Tag Search (when clicking from sidebar)
  if (allUniqueTags.has(query)) {
    const matchingDocs = processedData.filter(
      (doc) => doc.tags && doc.tags.includes(query)
    );
    const startIndex = (page - 1) * limit;
    const paginatedData = matchingDocs
      .slice(startIndex, startIndex + limit)
      .map((doc) => {
        const { embedding, schTxt, processedAt, ...rest } = doc;
        return rest;
      });

    return res.send({
      status: 200,
      data: paginatedData,
      total: matchingDocs.length,
    });
  }
  // --- END OF THE FIX ---

  // Default text search
  const scoredDocs = processedData
    .map((doc) => ({
      ...doc,
      score: calculateRelevance(doc, query),
    }))
    .filter((doc) => doc.score > 0)
    .sort((a, b) => b.score - b.score);

  const startIndex = (page - 1) * limit;
  const paginatedData = scoredDocs
    .slice(startIndex, startIndex + limit)
    .map((doc) => {
      const { embedding, schTxt, processedAt, ...rest } = doc;
      return rest;
    });

  res.send({
    status: 200,
    data: paginatedData,
    total: scoredDocs.length,
  });
});

app.get("/api/docByTags", (req, res) => {
  const allTags = [...new Set(processedData.flatMap((x) => x.tags || []))];
  res.send({ status: 200, tags: allTags });
});

app.get("/api/docById/:id", (req, res) => {
  const id = req.params.id;
  if (!id) return res.status(400).send({ status: 400, message: "Missing id" });
  let data = processedData.find((x) => x.id == id);
  if (!data) {
    res.status(404).send({ status: 404, message: "Document not found" });
  } else {
    const { embedding, schTxt, processedAt, ...rest } = data;
    res.send({ status: 200, data: rest });
  }
});

app.post("/api/createChat", async (req, res) => {
  const { docId, messages } = req.body;
  if (!docId)
    return res.status(400).send({ status: 400, message: "Missing docId" });
  let data = processedData.find((x) => x.id == docId);
  if (!data)
    return res.status(404).send({ status: 404, message: "Document not found" });

  const { embedding, processedAt, schTxt, ...context } = data;

  openai.chat.completions
    .create({
      model: "gemini-1.5-flash",
      messages: [
        {
          role: "system",
          content: `You're an expert in NASA's biological publications...`,
        },
        ...messages,
      ],
    })
    .then((completion) => {
      res.send({ status: 200, data: completion.choices[0].message });
    })
    .catch((err) => {
      console.trace(err);
      res.status(500).send({ status: 500, message: "Failed to create chat" });
    });
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Backend online on port " + (process.env.PORT || 3000));
});
