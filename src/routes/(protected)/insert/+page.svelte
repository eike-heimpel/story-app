<script lang="ts">
  import type { PageData } from "./$types";
  import { enhance } from "$app/forms";
  import Input from "$lib/components/Input.svelte";
  import { collections } from "$lib/collection_schemas";

  export let data: PageData;

  let options = Object.keys(collections);

  let inputs = {};

  for (const collection of options) {
    const description = collections[collection].description;
    const collectionInputs = Object.entries(description.parameters.properties).map(([name, fieldDescription]) => ({
      name,
      type: fieldDescription.type,
      optional: !description.parameters.required.includes(name),
    }));
    inputs[collection] = collectionInputs;
  }

  let selectedOption = "characters";
</script>

<form action="?/create" method="POST" use:enhance class="flex flex-col items-center space-y-2 w-full pt-4 mt-4">
  <div class="w-full max-w-md">
    <div class="flex items-center space-x-4 my-2">
      {#each options as option (option)}
        <label
          class="px-4 py-2 border cursor-pointer text-black
          {option === selectedOption ? 'bg-accent' : 'bg-secondary'}"
        >
          <input type="radio" bind:group={selectedOption} value={option} class="hidden" />
          {option}
        </label>
      {/each}
    </div>

    <input type="hidden" bind:value={selectedOption} name="collectionName" />
    {#each inputs[selectedOption] as input (input.name)}
      <!-- svelte-ignore a11y-label-has-associated-control -->
      <label class="block font-medium pb-1">
        <Input id={input.name} label={input.name} required={!input.optional} type={input.type} />
      </label>
    {/each}
  </div>

  <div class="w-full max-w-md pt-2">
    <button type="submit">Submit</button>
  </div>
</form>
