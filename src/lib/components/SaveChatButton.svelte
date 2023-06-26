<script>
  import { fly, fade } from "svelte/transition";

  export let infoToSave = {};
  export let collectionName = "previous_chats";

  let saveStatus = "";
  let showNotification = false;

  const saveResponse = async () => {
    if (Object.keys(infoToSave).length === 0) {
      console.log("Empty info, not saving");
      return;
    }
    console.log(collectionName);
    console.log(infoToSave);
    fetch("/api/collections?collectionName", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: infoToSave }),
    })
      .then((response) => response.json())
      .then((data) => console.log("saved"))
      .catch((error) => console.error("Failed to save:", error));

    showNotification = true;
    setTimeout(() => (showNotification = false), 300);
  };
</script>

<button type="button" on:click={saveResponse}>Save</button>

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
