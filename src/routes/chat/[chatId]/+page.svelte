<script lang="ts">
  import ChatHistory from "$lib/components/chatting/ChatHistory.svelte"
  import ChatInput from "$lib/components/chatting/ChatInput.svelte"
  import type { Message, NewMessage } from "$lib/schemas"
  import type { PageProps } from "./$types"
  import { postMessage } from "./data.remote"

  const { data }: PageProps = $props()

  const user = data.user
  const room = data.room

  let messages: Message[] = $state(data.messages)
  let writtenText = $state("")

  async function sendMessage() {
    if (!room) return

    const newMessage: NewMessage = {
      room: {
        id: room.id,
        type: "chat"
      },
      content: writtenText
    }

    writtenText = ""

    const result = await postMessage(newMessage)

    if (result != "Unauthenticated") {
      messages.push(result)
    }
  }
</script>

<div class="h-full flex flex-col p-1 pt-1">
  {#if user}
    <h1>Welcome, {user.displayname}</h1>
  {/if}
  <main class="flex flex-col justify-between">
    <ChatHistory bind:messages />
    <ChatInput bind:writtenText {sendMessage} />
  </main>
</div>
