import { z } from "zod";

export const messageSchema = z.object({
  chatMessage: z.string().trim(),
});

export type MessageSchemaType = z.infer<typeof messageSchema>;
