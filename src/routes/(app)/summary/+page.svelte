<script lang="ts">
  import ChatWindow from "$lib/components/ChatWindow.svelte";
  import CollectionList from "$lib/components/CollectionList.svelte";
  import { collections } from "$lib/store";
</script>

<div class="generation mx-4 md:mx-8 lg:mx-16">
  <div class="collection-grid">
    {#each collections as collection}
      <CollectionList collectionParams={collection} />
    {/each}
  </div>
  <div class="mt-8">
    <ChatWindow />
  </div>
</div>

<style>
  .generation {
    display: grid;
    grid-template-columns: 3fr 2fr;
    gap: 2rem;
  }

  .collection-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); /* Adjust 240px to fit your needs */
    gap: 2rem;
  }
</style>
