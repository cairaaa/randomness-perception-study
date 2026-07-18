import Fastify from "fastify";
import cors from "@fastify/cors";
import dotenv from "dotenv";
import type { SurveySubmission } from "@repo/shared/types";

dotenv.config();

const ORIGIN = process.env.ORIGIN || "http://localhost:5173";
const PORT = Number(process.env.PORT) || 3000;

const fastify = Fastify({
  logger: true,
});

await fastify.register(cors, {
  origin: `${ORIGIN}`,
});

fastify.post<{
  Body: SurveySubmission;
}>("/api", async (request, reply) => {
  console.log("Received survey:");
  console.log(JSON.stringify(request.body, null, 2));

  return {
    success: true,
    message: "Received successfully",
  };
});

await fastify.listen({
  port: PORT,
});
