<script lang="ts">
  import { onMount } from "svelte";
  import ChatWindow from "$lib/components/ChatWindow.svelte";
  import CollectionList from "$lib/components/CollectionList.svelte";
  import ContextList from "$lib/components/ContextList.svelte";
  import { collections, type CollectionPramUnion } from "$lib/collection_schemas";

  let selectedCollection: string;
  let selectedCollectionParams: CollectionPramUnion;

  onMount(async () => {
    selectedCollection = Object.keys(collections)[0];
  });

  $: if (collections[selectedCollection]) selectedCollectionParams = collections[selectedCollection].collectionParams;
</script>

<div class="generation mx-4 md:mx-8 lg:mx-16">
  <div class="collection-grid">
    <div>
      <div class="flex justify-center">
        <select
          bind:value={selectedCollection}
          class="bg-primary text-primary-foreground w-2/3 p-1 mb-4 rounded-md shadow text-center text-2xl"
        >
          {#each Object.keys(collections) as collectionName}
            <option value={collectionName} class="bg-secondary">{collectionName}</option>
          {/each}
        </select>
      </div>
      {#if selectedCollection}
        <CollectionList collectionParams={selectedCollectionParams} />
      {/if}
    </div>
  </div>
  <div>
    <h2 class="text-3xl mb-6">Context</h2>
    <ContextList />
  </div>
  <div>
    <h2 class="text-3xl mb-6">Work on Your Story</h2>

    <ChatWindow />
  </div>
</div>

<style>
  .generation {
    display: grid;
    grid-template-columns: 1.5fr 1.5fr 2fr;
    gap: 2rem;
  }

  .collection-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); /* Adjust 240px to fit your needs */
    gap: 2rem;
  }
</style>
