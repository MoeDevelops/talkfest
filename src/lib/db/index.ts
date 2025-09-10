import * as schema from "./schema"
import { Database } from "bun:sqlite"
import { drizzle } from "drizzle-orm/bun-sqlite"
import { migrate } from "drizzle-orm/bun-sqlite/migrator"

export * from "./schema"

async function load() {
  const dbFile = Bun.file(Bun.env.DB_FILE_NAME ?? ":memory:")

  if (dbFile.name != ":memory:") {
    if (!(await dbFile.exists())) {
      await dbFile.write("")
    }
  }

  const sqlite = new Database(dbFile.name!)
  const db = drizzle(sqlite, { schema })

  migrate(db, { migrationsFolder: "drizzle/" })

  return db
}

export async function reload() {
  db.$client.close()
  db = await load()
}

export let db = await load()
