<script>
  import { Button } from "$lib/components/ui/button";

  export let showModal = false;
  export let closeFunction;

  function maybeClose(event) {
    if (event.target.closest(".modal-background")) {
      closeFunction(true); // Call the provided close function to close the modal
    }
  }
</script>

{#if showModal}
  <div class="fixed z-50 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
    <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <div
        class="modal-background fixed inset-0 bg-gray-500 bg-opacity-60 transition-opacity"
        aria-hidden="true"
        on:click={maybeClose}
      />
      <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
      <div
        class="model-content-wrapper inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
      >
        <slot />
        <!-- Slot to allow passing in arbitrary content -->
        <div class="bg-secondary pb-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <Button type="button" on:click={() => closeFunction(true)}>Close</Button>
        </div>
      </div>
    </div>
  </div>
{/if}
