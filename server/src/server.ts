import Fastify from "fastify";
import cors from "@fastify/cors";
import dotenv from "dotenv";
import { db } from "./db";
import type { SurveySubmission } from "@repo/shared/types";

dotenv.config();

const ORIGIN = process.env.ORIGIN || "http://localhost:5173";
const PORT = Number(process.env.PORT) || 3000;

const fastify = Fastify({
  logger: true
});

await fastify.register(cors, {
  origin: `${ORIGIN}`
});

fastify.post<{
  Body: SurveySubmission;
}>("/api", async (request, reply) => {
  const data = request.body;
  const client = await db.connect();

  try {
    await client.query("BEGIN");

    const surveyResult = await client.query(
     `INSERT INTO surveys (survey_version, started_at, completed_at)
      VALUES ($1, $2, $3)
      RETURNING id`,
      [
        data.survey.surveyVersion,
        data.survey.startedAt,
        data.survey.completedAt
      ]
    );

    const surveyId = surveyResult.rows[0].id;

    await client.query(
      `
      INSERT INTO responses (
        survey_id, 
        confidence, 
        difficulty, 
        avoid_patterns, 
        avoid_streaks, 
        age_group, 
        education, 
        statistics_experience
      )
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      `,
      [
        surveyId,
        data.responses.confidence,
        data.responses.difficulty,
        data.responses.avoidPatterns,
        data.responses.avoidStreaks,
        data.responses.ageGroup,
        data.responses.education,
        data.responses.statisticsExperience
      ]
    );

    if (data.coinFlip.flips.length > 0) {
      const values: any[] = [];
      const placeholders = data.coinFlip.flips.map((flip, i) => {
        const offset = i * 4;
        values.push(surveyId, flip.position, flip.value, flip.elapsedMs);
        return `($${offset + 1}, $${offset + 2}, $${offset + 3}, $${offset + 4})`;
      });

      await client.query(
        `INSERT INTO coin_flips (survey_id, position, value, elapsed_ms)
        VALUES ${placeholders.join(", ")}`,
        values
      );
    }

    await client.query("COMMIT");

    return reply.send({
      success: true,
      message: "Received successfully",
      surveyId
    });
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("DATABASE ERROR:", error);
    return reply.status(500).send({
      success: false,
      message: "Failed to save survey"
    });
  } finally {
    client.release();
  }
});

await fastify.listen({
  port: PORT
});
