<script>
  import { fly, fade } from "svelte/transition";
  import SaveEntryModalContent from "$lib/components/SaveEntryModalContent.svelte";
  import SelectCollectionModal from "$components/SelectCollectionModal.svelte";
  import ModalWrapper from "./ModalWrapper.svelte";
  import { Button } from "$lib/components/ui/button";

  export let chatHistory;

  let saveStatus = "";
  let showNotification = false;
  let showSaveModal = false;
  let showCollectionSelectionModal = false;
  let collectionName;
  let selectingCollection = false;

  const openCollectionSelectionModal = () => {
    showCollectionSelectionModal = true;
    selectingCollection = true;
  };

  const closeSaveModal = (fullClose = false) => {
    showSaveModal = false;
  };

  const closeCollectionSelectionModal = (fullClose = false) => {
    if (fullClose) {
      showCollectionSelectionModal = false;
      return;
    }
    showCollectionSelectionModal = false;
    selectingCollection = false;
    showSaveModal = true;
  };
</script>

<Button variant="outline" on:click={openCollectionSelectionModal}>Save Entry</Button>

{#if selectingCollection}
  <ModalWrapper showModal={showCollectionSelectionModal} closeFunction={closeCollectionSelectionModal}>
    <SelectCollectionModal bind:collectionName {closeCollectionSelectionModal} />
  </ModalWrapper>
{:else}
  <ModalWrapper showModal={showSaveModal} closeFunction={closeSaveModal}>
    <SaveEntryModalContent {closeSaveModal} {chatHistory} {collectionName} />
  </ModalWrapper>
{/if}

{#if showNotification}
  <div class="notification" in:fly={{ y: -100, duration: 200 }} out:fade>
    {saveStatus}
  </div>
{/if}

<style>
  .notification {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: var(--dominant-color);
    font-size: 2rem;
    color: white;
    border-radius: 4px;
    text-align: center;
    z-index: 9999;
  }
</style>
