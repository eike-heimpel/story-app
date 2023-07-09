<script lang="ts">
  import { Button, buttonVariants } from "$components/ui/button";
  import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "$components/ui/dialog";
  import SaveEntryModal from "$components/SaveEntryModal.svelte";
  import type { InsertCollectionUnion } from "$lib/collection_schemas";

  import { collections } from "$lib/collection_schemas";

  export let chatHistory;
</script>

<Dialog modal={true}>
  <DialogTrigger class={buttonVariants({ variant: "outline" })}>Save Chat</DialogTrigger>
  <DialogContent class="sm:max-w-[425px]">
    <DialogHeader>
      <DialogTitle>Select a Collection</DialogTitle>
    </DialogHeader>

    <div class="flex flex-col gap-2 mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
      {#each Object.keys(collections) as collectionName}
        <SaveEntryModal {collectionName} {chatHistory} />
      {/each}
    </div>
  </DialogContent>
</Dialog>
