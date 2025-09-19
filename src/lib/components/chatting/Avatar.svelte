<script lang="ts">
  import type { User } from "$lib/schemas/user"

  let { user = $bindable(), size = $bindable(64) }: { user: User; size: 256 | 128 | 64 } = $props()
</script>

<div class="avatar">
  <div
    class="{{
      64: 'w-16 h-16',
      128: 'w-32 h-32',
      256: 'w-64 h-64'
    }[size]} rounded-full"
  >
    <img src={user.avatar} alt="{user.username} Avatar" width={size} height={size} />
  </div>
</div>
