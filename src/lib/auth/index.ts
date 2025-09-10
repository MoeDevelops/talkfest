import { db, sessionsTable, usersTable } from "$lib/db"
import { eq } from "drizzle-orm"

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
