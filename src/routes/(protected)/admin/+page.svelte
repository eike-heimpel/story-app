<script lang="ts">
  import Button from "$components/ui/button/Button.svelte";
  import Label from "$components/ui/label/Label.svelte";
  import Textarea from "$components/ui/textarea/Textarea.svelte";
  import { Separator } from "$components/ui/separator";
  import { enhance } from "$app/forms";
  import toast from "svelte-french-toast";

  export let data;

  $: console.log(data);
</script>

<div class="flex justify-center">
  <form method="POST" class="w-3/4 sm:w-1/2 space-y-6">
    {#if data.prePromptRecord}
      <div>
        <p class="text-center mb-2 text-2xl text-secondary-foreground">Summary</p>

        <Textarea id="summary" name="summary" rows="10" value={data.prePromptRecord.summary} />
      </div>
      <Separator orientation="horizontal" />
      <Separator orientation="horizontal" />

      <div>
        <p class="text-center mb-2 text-2xl text-secondary-foreground">System Message</p>
        <Textarea id="system_message" name="system_message" rows="1" value={data.prePromptRecord.system_message} />
      </div>
    {/if}
    <div class="flex justify-center"><Button type="submit">Update</Button></div>
  </form>
</div>
