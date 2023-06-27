<script lang="ts">
  import type { PageData } from "./$types";

  export let data: PageData;
</script>

<div>
  <div class="max-width-2000px mx-auto">
    {#if !data.user}
      <div class="flex justify-center m-5 gap-10">
        Please Log in to view content
        <button><a href="/login"> log in </a></button>
      </div>
    {:else}
      <slot />
    {/if}
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
