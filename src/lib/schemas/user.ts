import { usernameSchema } from "./auth"
import z from "zod"

export type User = z.infer<typeof userSchema>

export const userSchema = z.object({
  id: z.uuidv7(),
  username: usernameSchema,
  displayname: z.string().min(3).max(16),
  avatar: z.url()
})
