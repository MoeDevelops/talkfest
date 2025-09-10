import { getUserBySession } from "$lib/auth"
import type { PageServerLoad } from "./$types"

export const load = (async ({ cookies }) => {
  const user = await getUserBySession(cookies.get("session"))

  return {
    user: user
  }
}) satisfies PageServerLoad
