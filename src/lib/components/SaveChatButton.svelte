<script>
  import { fly, fade } from "svelte/transition";
  import SaveModalContent from "./SaveEntryModalContent.svelte";
  import ModalWrapper from "./ModalWrapper.svelte";

  export let infoToSave = {};
  export let collectionName = "previous_chats";

  let saveStatus = "";
  let showNotification = false;
  let showModal = false;

  const saveResponse = async () => {
    if (Object.keys(infoToSave).length === 0) {
      console.log("Empty info, not saving");
      return;
    }

    fetch("/api/collections?collectionName", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ collectionName: collectionName, infoToSave: infoToSave }),
    })
      .then((response) => response.json())
      .then((data) => console.log("saved"))
      .catch((error) => console.error("Failed to save:", error));

    showNotification = true;
    setTimeout(() => (showNotification = false), 300);
  };

  const openSaveModal = () => {
    showModal = true;
  };

  const closeSaveModal = () => {
    showModal = false;
  };
</script>

<button type="button" on:click={openSaveModal}> Save Entry </button>

<ModalWrapper {showModal} closeFunction={closeSaveModal}>
  <SaveModalContent {closeSaveModal} />
</ModalWrapper>

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
