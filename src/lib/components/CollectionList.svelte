<script lang="ts">
  import CollectionCard from "$lib/components/collection_list/CollectionCard.svelte";
  import { loadingInfo, collectionData } from "$lib/store";
  import type { CollectionPramUnion } from "$lib/collection_schemas";
  import ContextButtons from "$lib/components/ContextButtons.svelte";
  import { Skeleton } from "$components/ui/skeleton";

  export let collectionParams: CollectionPramUnion;

  let selectAll = "";

  const handleButtonClick = (event: any) => {
    selectAll = event.detail.descriptionType;
  };

  const loadContext = async (reload = false) => {
    if ($collectionData[collectionParams.collectionName].length > 0 && !reload) {
      return;
    }

    $loadingInfo.loading = true;
    $loadingInfo.message = "Loading collection";
    const resp = await fetch(`/api/collections?collectionName=${collectionParams.collectionName}`);
    const currentCollectionData = await resp.json();
    $collectionData[collectionParams.collectionName] = currentCollectionData.map((item) => ({
      contextInfo: {
        inContext: false,
        contextField: "",
      },
      data: item,
    }));

    $loadingInfo.loading = false;
  };

  $: if (collectionParams) loadContext();
</script>

{#if $loadingInfo.loading}
  {#each [1, 2, 3] as _}
    <div class="flex items-center space-x-4 mt-10">
      <Skeleton class="h-12 w-12 rounded-full" />
      <div class="space-y-2">
        <Skeleton class="h-4 w-[250px]" />
        <Skeleton class="h-4 w-[200px]" />
      </div>
    </div>
  {/each}
{:else}
  <div>
    <ContextButtons on:buttonClick={handleButtonClick} selectedButton={selectAll} flexCol={false} />

    <div class="space-y-6">
      {#if $collectionData[collectionParams.collectionName]}
        {#each $collectionData[collectionParams.collectionName] as collectionEntry, ix}
          {#if !collectionEntry.contextInfo.inContext}
            <CollectionCard collectionEntry={collectionEntry.data} {collectionParams} {selectAll} entryIndex={ix} />
          {/if}
        {/each}
      {/if}
    </div>
  </div>
{/if}
