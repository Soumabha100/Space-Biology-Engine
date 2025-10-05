import express from "express";
import fs from "fs";
import { config } from "dotenv";
config();
import cors from "cors";

const app = express();
app.disable("x-powered-by");
app.use(cors());
app.use(express.json());

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

app.listen(process.env.PORT || 3000, () => {
  console.log("Backend online on port " + (process.env.PORT || 3000));
});
