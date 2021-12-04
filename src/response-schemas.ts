// Generated by ts-to-zod
import { z } from "zod";

export const datastoreRecordSchema = z.object({
  createdAt: z.number(),
  modifiedAt: z.number(),
});

export const postTeamResponseSchema = datastoreRecordSchema.extend({
  teamId: z.string(),
  userId: z.string(),
  name: z.string(),
});

export const errorResponseSchema = z.object({
  message: z.literal("").optional(),
});
