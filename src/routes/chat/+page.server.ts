import { getChatsByUserId, getUserBySession } from "$lib/db/common"
import type { PageServerLoad } from "./$types"

export const load = (async ({ cookies }) => {
  const user = await getUserBySession(cookies.get("session"))
  const chats = await getChatsByUserId(user?.id)

  return {
    user: user,
    chats: chats
  }
}) satisfies PageServerLoad
