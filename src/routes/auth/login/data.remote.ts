import { command, getRequestEvent } from "$app/server"
import { authenticationTable, db, sessionsTable, usersTable } from "$lib/db"
import { usernamePasswordSchema } from "../schemas"
import { eq } from "drizzle-orm"
import { v7 } from "uuid"

export const login = command(usernamePasswordSchema, async (data) => {
  const { cookies } = getRequestEvent()

  const results = await db
    .select()
    .from(usersTable)
    .innerJoin(authenticationTable, eq(usersTable.id, authenticationTable.userId))
    .where(eq(usersTable.username, data.username))

  const result = results.at(0)

  if (!result) return false // TODO: Replace with a Result type

  const passwordCorrect = await Bun.password.verify(data.password, result.authentication.password)

  if (!passwordCorrect) return false // TODO: Replace with a Result type

  const userId = result.users.id
  const session = v7()

  await db
    .insert(sessionsTable)
    .values({
      id: session,
      userId: userId
    })
    .execute()

  cookies.set("session", session, {
    path: "/"
  })

  return true // TODO: Replace with a Result type
})
