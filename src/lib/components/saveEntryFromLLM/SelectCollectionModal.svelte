<script lang="ts">
  import { collections } from "$lib/collection_schemas";
  import { Button } from "$lib/components/ui/button";

  export let closeCollectionSelectionModal;
  export let collectionName;
</script>

<div class="bg-secondary sm:p-6 sm:pb-4">
  <div class="flex flex-col gap-3 justify-center text-center sm:mt-0 sm:ml-4 sm:text-left">
    {#each Object.keys(collections) as collectionNameOption}
      <Button
        variant="outline"
        on:click={() => {
          collectionName = collectionNameOption;
          closeCollectionSelectionModal();
        }}>{collectionNameOption}</Button
      >
    {/each}
  </div>
</div>
