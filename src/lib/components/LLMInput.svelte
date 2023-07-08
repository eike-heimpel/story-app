<script lang="ts">
  import { useChat } from "ai/svelte";
  const { handleSubmit, messages } = useChat();
  import { Button } from "$lib/components/ui/button";

  export let generationSite = "";
  export let context: string = "";
  export let history = false;

  let localMessage = "50 words";

  let baseMessage = `
        Here is some additional context. This is not all the context that exists, just what the user chose to include.
        CONTEXT
        ${context}
        -----
      `;

  let historySection = history
    ? `
        Here is our chat history:
        HISTORY
        ${JSON.stringify($messages)}
        ----
      `
    : "";

  let finalMessage = `${baseMessage}${historySection}
        Please use the pieces of info you have to reply to the following user promt.
        ----
        PROMT: ${localMessage}
      `;
</script>

<div class="input">
  <form on:submit={handleSubmit}>
    <textarea class="bg-secondary text-xl rounded p-2 w-full" rows="3" bind:value={finalMessage} />
    <Button type="submit" disabled={localMessage === ""}>Send</Button>
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
</style>
