<script lang="ts">
  import "../app.css";
  import { page } from "$app/stores";
  import "../app.postcss";

  import { invalidate } from "$app/navigation";
  import { onMount } from "svelte";

  import { Button } from "$lib/components/ui/button";
  import { Toaster } from "svelte-french-toast";

  export let data;

  let { supabase, session } = data;
  $: ({ supabase, session } = data);

  onMount(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, _session) => {
      if (_session?.expires_at !== session?.expires_at) {
        invalidate("supabase:auth");
      }
    });

    return () => subscription.unsubscribe();
  });

  let selected = "";
  const navItems = ["characters", "plot", "insert", "summary", "admin", "logout"];

  // $: if ($page.route.id.includes(`/login`)) selected = "login";

  // $: for (const item of navItems) {
  //   if ($page.route.id.includes(`/${item}`)) {
  //     selected = item;
  //     break;
  //   }
  // }
</script>

<Toaster />

<div>
  <nav class="my-10 ml-20 mr-20 rounded-2xl p-3 flex justify-evenly items-center flex-wrap gap-2 bg-secondary">
    {#each navItems as item (item)}
      {#if item === "logout"}
        <form action="/logout" method="POST">
          <Button variant="outline">Logout</Button>
        </form>
      {:else}
        <Button href="/{item}" variant={selected !== item ? "outline" : "default"}>
          {item[0].toUpperCase() + item.slice(1)}
        </Button>
      {/if}
    {/each}

    {#if !data.user}
      <Button href="/login" variant={selected !== "login" ? "outline" : "default"}>log in</Button>
    {/if}
  </nav>

  <div class="max-width-2000px mx-auto">
    <slot />
  </div>
</div>

<style>
  nav a {
    @apply rounded-lg bg-primary p-3 text-center text-2xl;
    text-decoration: none;
    /* transition: color 0.2s ease-in-out; */
  }

  nav a:hover:not(.selected) {
    @apply text-accent;
  }

  .selected {
    @apply bg-accent text-primary-foreground;
  }

  .max-width-2000px {
    max-width: 2000px;
  }
</style>
