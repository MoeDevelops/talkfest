import { authenticationTable, db, reload, usersTable } from "$lib/db"
import { beforeEach, expect, test } from "bun:test"
import { eq } from "drizzle-orm"
import { v7 } from "uuid"

beforeEach(async () => {
  await reload()
})

test("Create and read User", async () => {
  const id = v7()
  const testUsername = "test_user"
  const testDisplayname = "Test User"

  await db.insert(usersTable).values({
    id: id,
    username: testUsername,
    displayname: testDisplayname
  })

  const users = await db.select().from(usersTable)

  expect(users).toHaveLength(1)

  const user = users[0]

  expect(user.id).toBe(id)
  expect(user.username).toBe(testUsername)
  expect(user.displayname).toBe(testDisplayname)
})

test("Create and read User with Auth", async () => {
  const id = v7()
  const testUsername = "test_user"
  const testDisplayname = "Test User"
  const testPassword = "SecurePW"

  await db.insert(usersTable).values({
    id: id,
    username: testUsername,
    displayname: testDisplayname
  })

  const pwHash = await Bun.password.hash(testPassword)

  await db.insert(authenticationTable).values({
    userId: id,
    password: pwHash
  })

  const results = await db
    .select()
    .from(usersTable)
    .innerJoin(authenticationTable, eq(usersTable.id, authenticationTable.userId))

  expect(results, JSON.stringify(results)).toHaveLength(1)

  const result = results[0]

  expect(result.users.username).toBe(testUsername)
  expect(result.users.displayname).toBe(testDisplayname)
  expect(result.authentication.password).toBe(pwHash)

  const hashResult = await Bun.password.verify(testPassword, pwHash)
  expect(hashResult).toBeTrue()
})
