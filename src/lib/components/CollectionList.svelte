<script lang="ts">
  import CollectionCard from "$lib/components/collection_list/CollectionCard.svelte";
  import type { CollectionDataUnion, CollectionPramUnion } from "$lib/store";
  import type { Collections } from "$lib/pocketbase-types";
  import { onMount } from "svelte";
  import ContextButtons from "$lib/components/ContextButtons.svelte";

  export let collectionParams: CollectionPramUnion;

  let collectionData: CollectionDataUnion[] = [];
  let selectAll = "";
  let isLoading = false;
  const handleButtonClick = (event: any) => {
    selectAll = event.detail.descriptionType;
  };

  const loadContext = async () => {
    const resp = await fetch(`/api/collections?collectionName=${collectionParams.collectionName}`);
    collectionData = await resp.json();
    isLoading = false;
  };

  onMount(async () => {
    loadContext();
  });
</script>

<div>
  <h2 class="text-center text-4xl my-6">{collectionParams.collectionName}</h2>
  <ContextButtons on:buttonClick={handleButtonClick} selectedButton={selectAll} flexCol={false} />

  <div class="space-y-6">
    {#each collectionData as collectionEntry}
      <CollectionCard {collectionEntry} {collectionParams} {selectAll} />
    {/each}
  </div>
</div>
