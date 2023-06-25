<script lang="ts">
  import CollectionCard from "$lib/components/collection_list/CollectionCard.svelte";
  import { pb, type CollectionParam, type CollectionDataUnion } from "$lib/store";
  import type { Collections } from "$lib/pocketbase-types";
  import type PocketBase from "pocketbase";
  import { onMount } from "svelte";
  import ContextButtons from "$lib/components/ContextButtons.svelte";

  export let collectionParams: CollectionParam<Collections>;

  let collectionData: CollectionDataUnion[] = [];
  let selectAll = "";
  let isLoading = false;
  const handleButtonClick = (event) => {
    selectAll = event.detail.descriptionType;
  };

  const loadContext = async () => {
    collectionData = (await $pb.collection(collectionParams.collectionName).getFullList({
      sort: "-created",
    })) as CollectionDataUnion[];
    isLoading = false;
  };

  onMount(async () => {
    isLoading = true;
    if (!$pb) {
      const checkInterval = setInterval(() => {
        if ($pb) {
          clearInterval(checkInterval);
          loadContext();
        }
      }, 1000);
    } else {
      loadContext();
    }
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
