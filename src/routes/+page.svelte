<script>
  import { resolve } from "$app/paths"
</script>

<h1>Welcome to Talkfest!</h1>

<a class="btn" href={resolve("/auth/login")}>Login</a>
<a class="btn" href={resolve("/auth/register")}>Register</a>
