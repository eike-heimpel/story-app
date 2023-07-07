<script lang="ts">
  import { collectionData } from "$lib/store";
  import type { CollectionPramUnion, InsertCollectionUnion } from "$lib/collection_schemas";

  import ContextButtons from "$lib/components/ContextButtons.svelte";

  export let collectionEntry: InsertCollectionUnion;
  export let collectionParams: CollectionPramUnion;
  export let selectAll = "";
  export let entryIndex: number;
  export let selectedButton: keyof InsertCollectionUnion | "";

  const handleButtonClick = (event: any) => {
    selectedButton = event.detail.descriptionType;
    $collectionData[collectionParams.collectionName][entryIndex].contextInfo.contextField = selectedButton;
    $collectionData[collectionParams.collectionName][entryIndex].contextInfo.inContext =
      selectedButton === "" ? false : true;
  };
</script>

<div class="bg-secondary-color p-4 shadow rounded-lg flex justify-between">
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
  <ContextButtons on:buttonClick={handleButtonClick} selectedButton={selectAll === "" ? selectedButton : selectAll} />
</div>

<style>
  button {
    @apply text-white;
  }
</style>
