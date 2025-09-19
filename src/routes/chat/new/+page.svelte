<script lang="ts">
  import { goto } from "$app/navigation"
  import { resolve } from "$app/paths"
  import { createChat } from "./data.remote"

  let username = $state("")

  async function createChatPress() {
    const result = await createChat(username)

    if (result !== "Unauthenticated" && result !== "User not found") {
      await goto(resolve(`/chat/${result.id}`))
    }
  }
</script>

<div class="hero flex justify-center h-screen">
  <div class="hero-content flex flex-col bg-base-200 rounded-2xl">
    <fieldset class="fieldset">
      <legend class="fieldset-legend">New Chat</legend>

      <label class="label" for="username">Username</label>
      <input class="input" name="username" type="text" bind:value={username} />
    </fieldset>
    <button class="btn btn-primary" onclick={createChatPress}>Create chat</button>
  </div>
</div>
