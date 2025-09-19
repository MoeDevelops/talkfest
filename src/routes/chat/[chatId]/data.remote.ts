import { command, getRequestEvent } from "$app/server"
import { chatMessagesTable, db } from "$lib/db"
import { getUserBySession } from "$lib/db/common"
import { newMessageSchema, type Message } from "$lib/schemas"
import { v7 } from "uuid"

export const postMessage = command(newMessageSchema, async (data) => {
  const { cookies } = getRequestEvent()

  const sessionId = cookies.get("session")

  if (!sessionId) return "Unauthenticated"

  const user = await getUserBySession(sessionId)

  if (!user) return "Unauthenticated"

  const id = v7()

  await db
    .insert(chatMessagesTable)
    .values({
      id: id,
      author: user.id,
      room: data.room.id,
      content: data.content
    })
    .execute()

  const message: Message = {
    id: id,
    author: user,
    room: data.room,
    content: data.content
  }

  return message
})
