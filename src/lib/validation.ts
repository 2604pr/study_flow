import { z } from "zod";

export const taskCreateSchema = z.object({
  title: z.string().min(3).max(100),
  description: z.string().max(2000).optional().or(z.literal("")),
  status: z.enum(["TODO", "IN_PROGRESS", "DONE"]).optional(),
  difficulty: z.enum(["EASY", "MEDIUM", "HARD"]).optional(),
  tags: z.array(z.string().min(1)).optional(),
  dueDate: z
    .string()
    .datetime()
    .optional()
    .or(z.literal("").transform(() => undefined)),
});

export const taskUpdateSchema = taskCreateSchema.partial();
