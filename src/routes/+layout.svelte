<script lang="ts">
  import "../app.css";
  import { page } from "$app/stores";
  import type { PageData } from "./$types";

  export let data: PageData;

  let selected = "";
  const navItems = ["characters", "plot", "chat-history", "summary"];

  const routeName = $page.route.id.replace("/", "");
  if (navItems.includes(routeName)) {
    selected = routeName;
  }

  const handleClick = (item) => () => {
    selected = item;
  };
</script>

<div class="2xl:flex">
  <nav
    class="mt-10 ml-20 mr-20 rounded-2xl p-3 flex justify-evenly items-center flex-wrap gap-2 bg-secondary-color 2xl:flex-col 2xl:items-start 2xl:max-h-96"
  >
    {#each navItems as item (item)}
      <a href="/{item}" class:selected={selected === item} on:click={handleClick(item)}>
        {item[0].toUpperCase() + item.slice(1)}
      </a>
    {/each}

    {#if !data.user}
      <a href="/login"> log in </a>
    {:else}
      <form action="/logout" method="POST">
        <button class="bg-secondary-color border border-x-dominant-color">Logout</button>
      </form>
    {/if}
  </nav>

  <div class="max-width-2000px mx-auto">
    <slot />
  </div>
</div>

<style>
  nav a {
    @apply text-2xl bg-dominant-color p-3 rounded-lg text-center;
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
