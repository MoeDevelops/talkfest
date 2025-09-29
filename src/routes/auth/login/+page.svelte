<script lang="ts">
  import { goto } from "$app/navigation"
  import { resolve } from "$app/paths"
  import { usernamePasswordSchema } from "$lib/schemas"
  import { login } from "./data.remote"

  let username = $state("")
  let password = $state("")

  async function loginPress() {
    const data = usernamePasswordSchema.safeParse({ username: username, password: password })

    if (data.success) {
      const result = await login(data.data)

      if (result) {
        await goto(resolve("/chat"))
      }
    } else {
      alert(data.error.message)
    }
  }
</script>

<div class="hero flex justify-center h-screen">
  <div class="hero-content flex flex-col bg-base-200 rounded-2xl">
    <fieldset class="fieldset">
      <legend class="fieldset-legend">Login</legend>

      <label class="label" for="username">Username</label>
      <input class="input" name="username" type="text" bind:value={username} />

      <label class="label" for="password">Password</label>
      <input class="input" name="password" type="password" bind:value={password} />
    </fieldset>
    <button class="btn btn-primary" onclick={loginPress}>Log in</button>
  </div>
</div>
