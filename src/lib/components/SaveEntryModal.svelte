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
  import toast from "svelte-french-toast";
  import LlmInsertModal from "$components/LlmInsertModal.svelte";
  import { loadingInfo, collectionData } from "$lib/store";
  import type { InsertCollectionUnion } from "$lib/collection_schemas";
  import { collections } from "$lib/collection_schemas";
  import type { UserInputCollections } from "$lib/collection_schemas/user_input_collections.js";

  export let chatHistory: any = [];
  export let collectionName: UserInputCollections;

  let llmResponse: InsertCollectionUnion = {};
  let parseErrors: any = [];

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

<Dialog modal={true}>
  <DialogTrigger class={buttonVariants({ variant: "outline" })}>{collectionName}</DialogTrigger>
  <DialogContent class="sm:max-w-[425px]">
    <DialogHeader>
      <DialogTitle>Save Entry</DialogTitle>
    </DialogHeader>
    <LlmInsertModal id="hello">Create New Entry From Last Message</LlmInsertModal>
    <LlmInsertModal id="hello2">Create New Entry From Chat History</LlmInsertModal>
    <LlmInsertModal id="hello3">Save Chat History</LlmInsertModal>
  </DialogContent>
</Dialog>
