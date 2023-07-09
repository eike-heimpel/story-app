<script lang="ts">
  import { loadingInfo, collectionData } from "$lib/store";
  import type { InsertCollectionUnion } from "$lib/collection_schemas";
  import { collections } from "$lib/collection_schemas";
  import type { UserInputCollections } from "$lib/collection_schemas/user_input_collections.js";
  import { Button } from "$lib/components/ui/button";
  import toast from "svelte-french-toast";

  export let chatHistory = [];
  export let closeSaveModal;

  export let collectionName: UserInputCollections;

  let llmResponse: InsertCollectionUnion = {};
  let parseErrors = [];

  function getFormFromLLM(fromHistory = false) {
    const message = fromHistory ? chatHistory : chatHistory[chatHistory.length - 1].content;

    function fetchApiResponse() {
      return fetch("/api/gpt-functions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: message, collectionName: collectionName }),
      })
        .then((response) => {
          if (response.status < 200 || response.status >= 300) {
            throw new Error("Request failed with status " + response.status);
          }
          return response.json();
        })
        .then((data) => {
          llmResponse = data;
          const result = collections[collectionName].schema.safeParse(llmResponse);
          if (!result.success) {
            parseErrors = result.error.issues;
            console.log(JSON.stringify(parseErrors));
          }
        })
        .catch((error) => {
          $loadingInfo.message = "failed";
          setTimeout(() => {}, 2000);
          console.error("Error:", error);
        });
    }

    toast.promise(fetchApiResponse(), {
      loading: "LLM is generating the form...",
      success: "Done!",
      error: "LLM could not generate the form.",
    });
  }

  async function saveChat() {
    toast.promise(
      fetch("/api/collections?collectionName", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ collectionName: "previous_chats", infoToSave: chatHistory }),
      })
        .then((response) => {
          if (response.status < 200 || response.status >= 300) {
            throw new Error("Request failed with status " + response.status);
          }
          return response.json();
        })
        .then((data) => {
          console.log("saved");
        })
        .catch((error) => console.error("Failed to save:", error)),
      {
        loading: "Saving...",
        success: "Saved!",
        error: "Issue saving the chat.",
      }
    );
  }

  async function addEntry() {
    closeSaveModal();
    toast.promise(
      fetch("/api/collections", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ collectionName: collectionName, infoToSave: llmResponse }),
      })
        .then((response) => {
          if (response.status < 200 || response.status >= 300) {
            throw new Error("Request failed with status " + response.status);
          }
          return response.json();
        })
        .then((data) => {
          $collectionData = {
            ...$collectionData,
            [collectionName]: [
              {
                data: llmResponse,
                contextInfo: {
                  inContext: false,
                  contextField: "",
                },
              },
              ...$collectionData[collectionName],
            ],
          };
        }),
      {
        loading: "Saving...",
        success: "Saved!",
        error: "Issue saving entry.",
      }
    );
  }
</script>

<div class="bg-secondary p-4 sm:p-6 sm:pb-4">
  <div class="flex flex-col gap-2 mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
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
      <Button on:click={addEntry}>Insert</Button>
    {:else}
      <Button variant="outline" on:click={() => getFormFromLLM(false)}>Create New Entry From Last Message</Button>
      <Button variant="outline" on:click={() => getFormFromLLM(true)}>Create New Entry From Chat History</Button>
      <Button variant="outline" on:click={saveChat}>Save Chat History</Button>
    {/if}
  </div>
</div>
