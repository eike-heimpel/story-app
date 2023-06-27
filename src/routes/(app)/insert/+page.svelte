<script lang="ts">
  import type { PageData } from "./$types";
  import { enhance } from "$app/forms";
  import Input from "$lib/components/Input.svelte";
  import { fade } from "svelte/transition";

  export let data: PageData;

  let options = ["plots", "characters"];
  let selectedOption = "characters";

  let responseJson = {};
  let inputText = "";

  function fillForm() {
    const message = { message: inputText };
    console.log(message);

    // The fetch call
    fetch("/api/gpt-functions", {
      // Replace with the actual API endpoint you're using
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    })
      .then((response) => response.json())
      .then((data) => {
        // Log the data returned from the server
        responseJson = data;
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  let inputs = {
    characters: [
      { name: "name", type: "text", optional: false },
      { name: "one_line_description", type: "text", optional: false },
      { name: "short_description", type: "textarea", optional: true },
      { name: "long_description", type: "textarea", optional: true },
      { name: "age", type: "number", optional: true },
      { name: "birthdate", type: "date", optional: true },
      { name: "core_cast", type: "checkbox", optional: true },
    ],
    plots: [
      { name: "name", type: "text", optional: false },
      { name: "one_line_description", type: "text", optional: false },
      { name: "short_description", type: "textarea", optional: true },
      { name: "long_description", type: "textarea", optional: true },
      { name: "date", type: "date", optional: true },
    ],
  };
</script>

<div class="flex flex-col w-1/2 m-auto mt-10">
  <textarea class="text-black p-2" rows="10" bind:value={inputText} />
  <button class="m-4" on:click={fillForm}>Fill Form</button>
</div>

<form action="?/create" method="POST" use:enhance class="flex flex-col items-center space-y-2 w-full pt-4 mt-4">
  <div class="w-full max-w-md">
    <div class="flex items-center space-x-4 my-2">
      {#each options as option (option)}
        <label
          class="px-4 py-2 border cursor-pointer text-black
          {option === selectedOption ? 'bg-accent-color' : 'bg-secondary-color'}"
        >
          <input type="radio" bind:group={selectedOption} value={option} class="hidden" />
          {option}
        </label>
      {/each}
    </div>

    <input type="hidden" bind:value={selectedOption} name="collectionName" />
    {#each inputs[selectedOption] as input (input.name)}
      <!-- svelte-ignore a11y-label-has-associated-control -->
      <label class="block font-medium pb-1 text-white">
        <Input
          id={input.name}
          label={input.name}
          required={!input.optional}
          type={input.type}
          value={responseJson[input.name] || ""}
        />
      </label>
    {/each}
  </div>

  <div class="w-full max-w-md pt-2">
    <button type="submit">Submit</button>
  </div>
</form>
