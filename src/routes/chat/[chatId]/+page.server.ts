import { getChatById, getMessagesByChatId, getUserBySession } from "$lib/db/common"
import type { PageServerLoad } from "./$types"

export const load = (async ({ cookies, params }) => {
  const user = await getUserBySession(cookies.get("session"))
  const chatId = params.chatId
  const room = await getChatById(chatId)
  const messages = await getMessagesByChatId(room?.id)

  return {
    user: user,
    room: room,
    messages: messages
  }
}) satisfies PageServerLoad
