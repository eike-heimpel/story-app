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
</script>


<Dialog modal={true}>
      <DialogTrigger class={buttonVariants({ variant: "outline" })} on:click={() => getFormFromLLM(false)}
        >
        <slot/>
        </DialogTrigger
      >
      <DialogContent class="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>HELLO</DialogTitle>
        </DialogHeader>
        <!-- {#if Object.keys(llmResponse).length !== 0} -->
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
      </DialogContent>
    </Dialog>