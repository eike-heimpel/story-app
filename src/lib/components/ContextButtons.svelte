<script lang="ts">
  import { createEventDispatcher, onMount, afterUpdate, onDestroy } from "svelte";

  const dispatch = createEventDispatcher();
  export let selectedButton = "";
  export let flexCol = true;

  let previousButton = "";

  onMount(() => {
    previousButton = selectedButton; // Initialize the previousButton value on mount
  });

  afterUpdate(() => {
    if (selectedButton !== previousButton) {
      previousButton = selectedButton;

      dispatch("buttonClick", { descriptionType: selectedButton });
    }
  });

  onDestroy(() => {
    previousButton = "";
  });

  const selectButton = (descriptionType: string) => {
    selectedButton = selectedButton === descriptionType ? "" : descriptionType;
    dispatch("buttonClick", { descriptionType: selectedButton });
  };
</script>

<div class="flex justify-evenly gap-1 p-2" class:flex-col={flexCol}>
  <button
    class="bg-dominant-color"
    class:selected={selectedButton === "long_description"}
    on:click={() => selectButton("long_description")}
  >
    Long
  </button>

  <button
    class="bg-dominant-color"
    class:selected={selectedButton === "short_description"}
    on:click={() => selectButton("short_description")}
  >
    Short
  </button>

  <button
    class="whitespace-nowrap bg-dominant-color"
    class:selected={selectedButton === "one_line_description"}
    on:click={() => selectButton("one_line_description")}
  >
    1-line
  </button>
</div>

<style>
  .selected {
    @apply bg-accent-color text-black;
  }
  button {
    @apply text-white;
  }

  button:hover {
    @apply text-black;
  }
</style>
