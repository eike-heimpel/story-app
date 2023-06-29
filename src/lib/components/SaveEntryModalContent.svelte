<script lang="ts">
  import { loadingInfo, collectionData } from "$lib/store";
  import type { InsertCollectionUnion } from "$lib/collection_schemas";
  import { collections } from "$lib/collection_schemas";
  import type { UserInputCollections } from "$lib/collection_schemas/user_input_collections.js";

  export let chatHistory = [];
  export let closeSaveModal;

  export let collectionName;
  let llmResponse: InsertCollectionUnion = {};
  let parseErrors = [];

  function getFormFromLLM(fromHistory = false) {
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
        llmResponse = data;
        const result = collections[collectionName].schema.safeParse(llmResponse);
        if (!result.success) {
          parseErrors = result.error.issues;
          console.log(JSON.stringify(parseErrors));
        }
        console.log(llmResponse);
        $loadingInfo.loading = false;
      })
      .catch((error) => {
        $loadingInfo.message = "failed";
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
      .then((data) => {
        console.log("saved");
      })
      .catch((error) => console.error("Failed to save:", error));
  }

  async function addEntry() {
    closeSaveModal();
    $loadingInfo.loading = true;
    $loadingInfo.message = `saving to ${collectionName} collection`;
    fetch("/api/collections", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ collectionName: collectionName, infoToSave: llmResponse }),
    })
      .then((response) => response.json())
      .then((data) => {
        $collectionData[collectionName as UserInputCollections] = [
          llmResponse,
          ...$collectionData[collectionName as UserInputCollections],
        ];
        console.log("saved");
      })
      .catch((error) => {
        $loadingInfo.message = "failed";
        setTimeout(() => {
          $loadingInfo.loading = false;
        }, 2000);
        console.error("Error:", error);
        console.error("Failed to save:", error);
      })
      .finally(() => ($loadingInfo.loading = false));
  }
</script>

<div class="bg-dominant-color p-4 sm:p-6 sm:pb-4">
  <div class="sm:flex sm:items-start">
    <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
      {#if Object.keys(llmResponse).length !== 0}
        <div class="p-5">
          {JSON.stringify(llmResponse)}
        </div>
        <div>
          <h3>Errors</h3>
          {#if parseErrors}
            {#each parseErrors as error}
              {error.path[0]}: {error.message}
            {/each}
            <p>Dont worry, you can still insert the data. (needs edit button)</p>
          {/if}
        </div>
        <button on:click={addEntry}>Insert</button>
      {:else if $loadingInfo.loading}<div class="text-center p-5">loading response</div>
      {:else}
        <h3 class="text-lg leading-6 font-medium text-white" id="modal-title">Choose an option:</h3>
        <button class="white-button" on:click={() => getFormFromLLM(false)}>Create New Entry From Last Message</button>
        <button class="white-button" on:click={() => getFormFromLLM(true)}>Create New Entry From Chat History</button>
        <button class="white-button" on:click={saveChat}>Save Chat History</button>
      {/if}
    </div>
  </div>
</div>
<div class="bg-dominant-color px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
  <button type="button" on:click={closeSaveModal}>Close</button>
</div>
