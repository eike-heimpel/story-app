<script lang="ts">
  import SaveChatButton from "$lib/components/SaveChatButton.svelte";
  import { collectionData, currentMessages, chatHistory } from "$lib/store";
  import { Button } from "$lib/components/ui/button";
  import toast from "svelte-french-toast";

  import type { UserInputCollections } from "$lib/collection_schemas/user_input_collections.js";
  import { useChat } from "ai/svelte";
  const { handleSubmit, messages, input } = useChat();

  type ContextItem = {
    collection: UserInputCollections;
    [contextField: string]: string;
  };

  let selectedContextInfo: ContextItem[];

  $: {
    selectedContextInfo = [];
    for (let collection of Object.keys($collectionData)) {
      for (let entry of $collectionData[collection]) {
        if (entry.contextInfo && entry.contextInfo.inContext) {
          let newEntry: ContextItem = { collection: collection as UserInputCollections };
          newEntry[entry.contextInfo.contextField] = entry.data[entry.contextInfo.contextField];
          selectedContextInfo.push(newEntry);
        }
      }
    }
  }

  export let generationSite = "";
  export let history = false;
  export let myInput = "Write a very very short description for a new character called Kamil";

  let firstSubmit = true;

  function send(e) {
    if (firstSubmit) {
      $messages = [{ role: "user", content: JSON.stringify(selectedContextInfo) }]; // context becomes index 0, we will not display it to the user below
      firstSubmit = false;
    }
    $input = myInput;
    handleSubmit(e);
  }
</script>

<div class="chat-container">
  {#each $messages as message, i (message.id)}
    {#if i !== 0}
      <div class="chat-bubble {message.role}">
        <div class="whitespace-pre-wrap">{message.content}</div>
      </div>
    {/if}
  {/each}
</div>

<div class="chat-utility flex justify-between my-2">
  <Button
    variant="outline"
    on:click={() => {
      console.log("clearing chat messages");
      $messages = [{ role: "user", content: JSON.stringify(selectedContextInfo) }];
      console.log($messages);
      toast.success("cleared", {
        style: "background: black;",
      });
    }}>Clear Chat</Button
  >

  <SaveChatButton chatHistory={$messages} />
</div>

<div>
  <form on:submit={send}>
    <textarea class="bg-accent rounded p-2 w-full" rows="3" bind:value={myInput} />
    <div class="flex justify-end"><Button type="submit" disabled={myInput === ""}>Send</Button></div>
  </form>
</div>

<style>
  @keyframes dot {
    0%,
    20% {
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }

  .dots {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .dot {
    background: #333;
    border-radius: 50%;
    width: 8px;
    height: 8px;
    margin: 0 5px;
    animation: dot 1.4s infinite;
  }

  .dot:nth-child(2) {
    animation-delay: 0.2s;
  }

  .dot:nth-child(3) {
    animation-delay: 0.4s;
  }

  .user,
  .assistant {
    @apply my-2 max-w-md rounded bg-white p-2 text-black;
  }
  .user {
    @apply ml-2 mr-auto;
  }

  .assistant {
    @apply ml-auto mr-2;
  }
</style>
