<script lang="ts">
  import { resolve } from "$app/paths"
  import type { PageProps } from "./$types"

  const { data }: PageProps = $props()
  const user = data.user

  type Chat = {
    id: string
    otherUserId: string
  }

  let chats: Chat[] = $state([])

  if (user) {
    chats = data.chats.map((chat) => ({
      id: chat.id,
      otherUserId: chat.user1 === user.id ? chat.user2 : chat.user1
    }))
  }
</script>

<div>
  {#each chats as chat (chat.id)}
    <a href={resolve(`/chat/${chat.id}`)}>{chat.otherUserId}</a>
  {/each}
</div>
