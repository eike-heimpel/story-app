<script lang="ts">
  import SaveResponseButton from "$lib/components/SaveResponseButton.svelte";
  import { chatHistory } from "$lib/store";
  import { useChat } from "ai/svelte";
  const { messages } = useChat();

  export let message = "";
  export let clientName = "test123";
  export let history = false;
</script>

{#if !history}
  <div class="output-section">
    <div class="p-4 w-full text-xl rounded">
      <h2>Example Output</h2>
      <div>{$messages[$messages.length - 1]}</div>
    </div>
    <div class="save-button flex justify-end">
      <SaveResponseButton collectionName={"responses"} infoToSave={{ message: message }} />
    </div>
  </div>
{/if}
