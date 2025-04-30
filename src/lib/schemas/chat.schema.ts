import { z } from "zod";

export const messageSchema = z.object({
  text: z.string().trim(),
  roomId: z.string(),
  ownerId: z.string(),
});

export type MessageSchemaType = z.infer<typeof messageSchema>;

export const searchSchema = z.object({
  search: z.string().trim(),
});

export type SearchShemaType = z.infer<typeof searchSchema>;
