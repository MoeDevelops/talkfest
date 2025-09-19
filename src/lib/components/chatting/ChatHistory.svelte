<script lang="ts">
  import type { Message } from "$lib/schemas"
  import Avatar from "./Avatar.svelte"

  let { messages = $bindable([]) }: { messages: Message[] } = $props()
</script>

<div class="">
  {#each messages as message (message.id)}
    <div class="flex px-2 py-2 hover:bg-base-200 text-xl">
      <Avatar user={message.author} size={64} />
      <div class="ml-4">
        <div class="h-8">
          <p class="font-bold hover:underline cursor-pointer w-min">
            {message.author.displayname}
          </p>
        </div>
        <div class="whitespace-pre">
          {message.content}
        </div>
      </div>
    </div>
  {/each}
</div>
