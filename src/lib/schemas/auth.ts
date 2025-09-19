import z from "zod"

export const usernameSchema = z.string().min(3).max(16)
export const passwordSchema = z.string().min(8).max(128)

export const usernamePasswordSchema = z.object({
  username: usernameSchema,
  password: passwordSchema
})
