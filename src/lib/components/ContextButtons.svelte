<script lang="ts">
  import { createEventDispatcher, onMount, afterUpdate, onDestroy } from "svelte";
  import { Button } from "$lib/components/ui/button";

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
  <Button variant="outline" on:click={() => selectButton("long_description")}>Long</Button>

  <Button variant="outline" on:click={() => selectButton("short_description")}>Short</Button>

  <Button variant="outline" class="whitespace-nowrap" on:click={() => selectButton("one_line_description")}
    >1-line</Button
  >
</div>

<style>
</style>
