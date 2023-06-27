<script lang="ts">
  function addEntry(fromHistory = false) {}
  function saveChat() {}
  export let closeSaveModal;
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
