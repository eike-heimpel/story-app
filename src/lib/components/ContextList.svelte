<script lang="ts">
  import CollectionCard from "$lib/components/collection_list/CollectionCard.svelte";
  import { selectedContextInfo } from "$lib/store";
</script>

<div>
  <h2>Selected Context (will be replaced by cards in the future)</h2>
  <div class="space-y-6">
    {#each Object.entries($selectedContextInfo) as [collectionName, collectionContexts]}
      {JSON.stringify(collectionContexts)}
      <!-- {#each collectionContexts as collectionEntry}
        {collectionEntry}
        <CollectionCard
          {collectionEntry}
          collectionParams={collections.find((collection) => collection.collectionName === collectionName)}
        />
      {/each} -->
    {/each}
  </div>
</div>
