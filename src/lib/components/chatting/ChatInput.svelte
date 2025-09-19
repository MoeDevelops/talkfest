<script lang="ts">
  var {
    writtenText = $bindable(),
    sendMessage
  }: { writtenText: string; sendMessage: () => Promise<void> } = $props()
</script>

<div class="w-full flex">
  <input class="input w-full" bind:value={writtenText} />
  <button class="btn" onclick={sendMessage}>Send</button>
</div>
