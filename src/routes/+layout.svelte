<script lang="ts">
  import "../app.css";
  import { pb } from "$lib/store";
  import { setContext, onMount, onDestroy } from "svelte";
  import PocketBase from "pocketbase";
  import { page } from "$app/stores";

  let selected = "";
  const navItems = ["characters", "plot", "core-info", "summary", "testing"];
  let retryInterval;

  const routeName = $page.route.id.replace("/", "");
  if (navItems.includes(routeName)) {
    selected = routeName;
  }

  onMount(async () => {
    $pb = new PocketBase("https://yummy-story.pockethost.io");
    await $pb.admins.authWithPassword("test@test.com", "testtesttest");
  });

  onDestroy(() => {
    if (retryInterval) {
      clearInterval(retryInterval);
    }
  });

  const handleClick = (item) => () => {
    selected = item;
  };
</script>

<div class="2xl:flex">
  <nav
    class="mt-10 ml-20 mr-20 rounded-2xl p-3 flex justify-evenly items-center flex-wrap gap-2 bg-secondary-color 2xl:flex-col 2xl:items-start 2xl:max-h-96"
  >
    {#each navItems as item (item)}
      <a
        class="bg-dominant-color p-3 rounded-lg 2xl:w-full text-center"
        href="/{item}"
        class:selected={selected === item}
        on:click={handleClick(item)}
      >
        {item[0].toUpperCase() + item.slice(1)}
      </a>
    {/each}
  </nav>

  <div class="max-width-2000px mx-auto">
    <slot />
  </div>
</div>

<style>
  nav a {
    @apply text-2xl;
    text-decoration: none;
    /* transition: color 0.2s ease-in-out; */
  }

  nav a:hover:not(.selected) {
    @apply text-accent-color;
  }

  .selected {
    @apply bg-accent-color text-dominant-color;
  }

  .max-width-2000px {
    max-width: 2000px;
  }
</style>
