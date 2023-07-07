<script lang="ts">
  import { collectionData } from "$lib/store";
  import CollectionCard from "$lib/components/collection_list/CollectionCard.svelte";
  import { collections } from "$lib/collection_schemas";

  export let selectAll: string;

  let contextCollections = [];

  $: {
    Object.keys($collectionData).filter((collection) => {
      // Filter collections based on their context info
      const collectionEntries = $collectionData[collection];
      const contextEntries = collectionEntries.filter((entry) => entry.contextInfo.inContext);
      for (const entry of contextEntries) {
        let newEntry = { collection: collection };
        newEntry[entry.contextInfo.contextField] = entry.data[entry.contextInfo.contextField];
        contextCollections.push(newEntry);
      }
    });

    contextCollections = [...contextCollections];
  }

  function resetContext() {
    for (let collection of Object.keys($collectionData)) {
      for (let [ix, entry] of $collectionData[collection].entries()) {
        $collectionData = {
          ...$collectionData,
          [collection]: $collectionData[collection].map((entry, index) =>
            index === ix
              ? { ...entry, contextInfo: { ...entry.contextInfo, contextField: "", inContext: false } }
              : entry
          ),
        };
      }
    }
  }
</script>

<button on:click={resetContext}> Reset Context </button>

{#if contextCollections.length > 0}
  <div class="space-y-6">
    {#each Object.keys($collectionData) as collectionName}
      {#each $collectionData[collectionName] as collectionEntry, ix}
        {#if collectionEntry.contextInfo.inContext}
          <CollectionCard
            collectionEntry={collectionEntry.data}
            collectionParams={collections[collectionName].collectionParams}
            selectedButton={collectionEntry.contextInfo.contextField}
            entryIndex={ix}
          />
        {/if}
      {/each}
    {/each}
  </div>
{:else}
  <p>No cards available in context.</p>
{/if}
