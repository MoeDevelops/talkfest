import { userSchema } from "./user"
import z from "zod"

export type Room = z.infer<typeof roomSchema>

export const roomSchema = z.object({
  id: z.uuidv7(),
  type: z.enum(["chat", "group", "server"])
})

export type NewMessage = z.infer<typeof newMessageSchema>

export const newMessageSchema = z.object({
  room: roomSchema,
  content: z.string().min(1).max(4000)
})

export type Message = z.infer<typeof messageSchema>

export const messageSchema = newMessageSchema.extend({
  id: z.uuidv7(),
  author: userSchema
})
