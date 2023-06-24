<script lang="ts">
  import { selectedContextInfo } from "$lib/store";
  import ContextButtons from "$lib/components/ContextButtons.svelte";

  export let collectionEntry;
  export let collectionParams;
  export let selectAll = "";

  let selectedButton = null;
  const handleButtonClick = (event) => {
    selectedButton = event.detail.descriptionType;
    const selectedContext = collectionEntry[selectedButton];
    $selectedContextInfo[collectionParams.collectionName][collectionEntry.id] = selectedContext;
  };
</script>

<div class="bg-secondary-color p-4 shadow rounded-lg flex">
  <div>
    <h3 class="text-left p-2 text-xl">
      {#each collectionParams.headlineFields as headlineField, index (headlineField)}
        {@html `${collectionEntry[headlineField]}${
          index < collectionParams.headlineFields.length - 1 ? ",&nbsp;" : ""
        }`}
      {/each}
    </h3>
    <div class="row-span-2 block p-2">{collectionEntry[collectionParams.infoField]}</div>
  </div>
  <ContextButtons on:buttonClick={handleButtonClick} selectedButton={selectAll} />
</div>

<style>
  button {
    @apply text-white;
  }
</style>
