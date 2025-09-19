import { customType, sqliteTable, text } from "drizzle-orm/sqlite-core"
import { v7, parse as parseUuid, stringify as stringifyUuid } from "uuid"

const uuid = customType<{ data: string; driverData: Uint8Array }>({
  dataType() {
    return "blob"
  },
  fromDriver(value) {
    return stringifyUuid(value)
  },
  toDriver(value) {
    return parseUuid(value)
  }
})

export const usersTable = sqliteTable("users", {
  id: uuid()
    .primaryKey()
    .$defaultFn(() => v7()),
  username: text().notNull().unique(),
  displayname: text().notNull(),
  avatar: text().notNull()
})

export const authenticationTable = sqliteTable("authentication", {
  id: uuid()
    .primaryKey()
    .$defaultFn(() => v7()),
  userId: uuid()
    .references(() => usersTable.id)
    .notNull(),
  password: text().notNull()
})

export const sessionsTable = sqliteTable("sessions", {
  id: uuid()
    .primaryKey()
    .$defaultFn(() => v7()),
  userId: uuid()
    .notNull()
    .references(() => usersTable.id)
})

export const chatsTable = sqliteTable("chats", {
  id: uuid()
    .primaryKey()
    .$defaultFn(() => v7()),
  user1: uuid()
    .notNull()
    .references(() => usersTable.id),
  user2: uuid()
    .notNull()
    .references(() => usersTable.id)
})

export const chatMessagesTable = sqliteTable("chat_messages", {
  id: uuid()
    .primaryKey()
    .$defaultFn(() => v7()),
  author: uuid()
    .notNull()
    .references(() => usersTable.id),
  room: uuid()
    .notNull()
    .references(() => chatsTable.id),
  content: text().notNull()
})
