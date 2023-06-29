<script lang="ts">
  import { loadingInfo, collectionData } from "$lib/store";
  import type { InsertCollectionUnion } from "$lib/collection_schemas";
  import { collections } from "$lib/collection_schemas";
  import type { UserInputCollections } from "$lib/collection_schemas/user_input_collections.js";

  export let closeCollectionSelectionModal;
  export let collectionName;
</script>

<div class="bg-dominant-color p-4 sm:p-6 sm:pb-4">
  <div class="sm:flex sm:items-start">
    <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
      {#each Object.keys(collections) as collectionNameOption}
        <button
          class="white-button"
          on:click={() => {
            collectionName = collectionNameOption;
            closeCollectionSelectionModal();
          }}>{collectionNameOption}</button
        >
      {/each}
    </div>
  </div>
</div>
<div class="bg-dominant-color px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
  <button type="button" on:click={() => closeCollectionSelectionModal(true)}>Close</button>
</div>
