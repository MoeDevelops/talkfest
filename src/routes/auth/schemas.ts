import { username } from "$lib/schemas"
import z from "zod"

export const usernamePasswordSchema = z.object({
  username: username(),
  password: z.string().min(8).max(128)
})
