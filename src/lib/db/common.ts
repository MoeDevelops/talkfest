import { chatMessagesTable, chatsTable, db, sessionsTable, usersTable } from "$lib/db"
import type { Message } from "$lib/schemas"
import { eq, or } from "drizzle-orm"

export async function getUserBySession(sessionId: string | undefined) {
  if (!sessionId) return undefined

  const results = await db
    .select({
      user: usersTable
    })
    .from(usersTable)
    .innerJoin(sessionsTable, eq(usersTable.id, sessionsTable.userId))
    .where(eq(sessionsTable.id, sessionId))

  const result = results.at(0)

  return result?.user
}

export async function getUserByUsername(username: string | undefined) {
  if (!username) return undefined

  const results = await db.select().from(usersTable).where(eq(usersTable.username, username))

  const result = results.at(0)

  return result
}

export async function getChatById(id: string | undefined) {
  if (!id) return undefined

  const results = await db.select().from(chatsTable).where(eq(chatsTable.id, id))

  const result = results.at(0)

  return result
}

export async function getMessagesByChatId(id: string | undefined): Promise<Message[]> {
  if (!id) return []

  const results = await db
    .select({
      id: chatMessagesTable.id,
      author: usersTable,
      room: {
        id: chatsTable.id
      },
      content: chatMessagesTable.content
    })
    .from(chatMessagesTable)
    .innerJoin(usersTable, eq(chatMessagesTable.author, usersTable.id))
    .innerJoin(chatsTable, eq(chatMessagesTable.room, chatsTable.id))
    .where(eq(chatMessagesTable.room, id))

  return results.map((result) => ({
    ...result,
    room: {
      ...result.room,
      type: "chat"
    }
  }))
}

export async function getChatsByUserId(id: string | undefined) {
  if (!id) return []

  const results = await db
    .select()
    .from(chatsTable)
    .where(or(eq(chatsTable.user1, id), eq(chatsTable.user2, id)))

  return results
}
