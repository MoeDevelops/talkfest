<script lang="ts">
  import type { PageProps } from "./$types"

  const { data }: PageProps = $props()

  const user = data.user
</script>

{#if user}
  <h1>Welcome, {user.displayname}</h1>
{/if}
