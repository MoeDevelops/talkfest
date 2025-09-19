import { command, getRequestEvent } from "$app/server"
import { authenticationTable, db, sessionsTable, usersTable } from "$lib/db"
import { usernamePasswordSchema } from "$lib/schemas"
import { v7 } from "uuid"

export const register = command(usernamePasswordSchema, async (data) => {
  const { cookies } = getRequestEvent()

  const userId = v7()

  await db.insert(usersTable).values({
    id: userId,
    username: data.username,
    displayname: data.username,
    avatar: "/assets/user.svg"
  })

  const passwordHash = await Bun.password.hash(data.password)

  await db.insert(authenticationTable).values({
    userId: userId,
    password: passwordHash
  })

  const session = v7()

  await db.insert(sessionsTable).values({
    id: session,
    userId: userId
  })

  cookies.set("session", session, {
    path: "/"
  })

  return true // TODO: Replace with a Result type
})
