import { command, getRequestEvent } from "$app/server"
import { chatsTable, db } from "$lib/db"
import { getUserBySession, getUserByUsername } from "$lib/db/common"
import { usernameSchema, type Room } from "$lib/schemas"
import { v7 } from "uuid"

export const createChat = command(usernameSchema, async (data) => {
  const { cookies } = getRequestEvent()

  const sessionId = cookies.get("session")

  if (!sessionId) return "Unauthenticated"

  const user = await getUserBySession(sessionId)

  if (!user) return "Unauthenticated"

  const otherUser = await getUserByUsername(data)

  if (!otherUser) return "User not found"

  const id = v7()

  await db
    .insert(chatsTable)
    .values({
      id: id,
      user1: user.id,
      user2: otherUser.id
    })
    .execute()

  const room: Room = {
    id: id,
    type: "chat"
  }

  return room
})
