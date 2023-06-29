<script lang="ts">
  import SaveChatButton from "$lib/components/SaveChatButton.svelte";
  import { selectedContextInfo, currentMessages, chatHistory } from "$lib/store";
  import { useChat } from "ai/svelte";
  const { handleSubmit, messages, input } = useChat();

  export let generationSite = "";
  export let history = false;
  export let myInput = "Write a very very short description for a new character called Kamil";

  let firstSubmit = true;

  function send(e) {
    if (firstSubmit) {
      $messages = [{ role: "user", content: JSON.stringify($selectedContextInfo) }]; // context becomes index 0, we will not display it to the user below
      firstSubmit = false;
    }
    $input = myInput;
    handleSubmit(e);
  }
</script>

<h2 class="text-center mb-6 text-4xl">Work on Your Story</h2>
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
  <button
    class="bg-secondary-color text-white"
    on:click={() => {
      $messages = [{ role: "user", content: JSON.stringify($selectedContextInfo) }];
    }}
    >Clear Chat
  </button>
  <SaveChatButton chatHistory={$messages} />
</div>

<div class="input">
  <form on:submit={send}>
    <textarea class="bg-secondary-color text-white text-xl rounded p-2 w-full" rows="3" bind:value={myInput} />
    <button type="submit" disabled={myInput === ""}>Send</button>
  </form>
</div>

<style>
  .input {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
  }

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
    @apply bg-white text-black my-2 max-w-md rounded p-2;
  }
  .user {
    @apply ml-2 mr-auto;
  }

  .assistant {
    @apply mr-2 ml-auto;
  }
</style>
