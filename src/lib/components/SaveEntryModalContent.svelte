<script lang="ts">
  import { loadingInfo, collectionData } from "$lib/store";

  export let chatHistory = [];
  export let closeSaveModal;

  let collectionName = "characters";

  function addEntry(fromHistory = false) {
    const message = fromHistory ? chatHistory : chatHistory[chatHistory.length - 1].content;

    $loadingInfo.loading = true;
    $loadingInfo.message = "Saving Entry";

    fetch("/api/gpt-functions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: message, collectionName: collectionName }),
    })
      .then((response) => response.json())
      .then((data) => {
        $collectionData[collectionName] = [data, ...$collectionData[collectionName]];
        $loadingInfo.loading = false;
      })
      .catch((error) => {
        $loadingInfo.message = "failed to unsert record";
        setTimeout(() => {
          $loadingInfo.loading = false;
        }, 2000);
        console.error("Error:", error);
      });
  }

  async function saveChat() {
    fetch("/api/collections?collectionName", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ collectionName: "previous_chats", infoToSave: chatHistory }),
    })
      .then((response) => response.json())
      .then((data) => console.log("saved"))
      .catch((error) => console.error("Failed to save:", error));
  }
</script>

<div class="bg-dominant-color p-4 sm:p-6 sm:pb-4">
  <div class="sm:flex sm:items-start">
    <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
      <h3 class="text-lg leading-6 font-medium text-white" id="modal-title">Choose an option:</h3>
      <button class="white-button" on:click={() => addEntry(false)}>Create New Entry From Last Message</button>
      <button class="white-button" on:click={() => addEntry(true)}>Create New Entry From Chat History</button>
      <button class="white-button" on:click={saveChat}>Save Chat History</button>
    </div>
  </div>
</div>
<div class="bg-dominant-color px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
  <button type="button" on:click={closeSaveModal}>Close</button>
</div>
