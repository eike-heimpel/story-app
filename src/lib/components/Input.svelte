<script lang="ts">
  export let id: string;
  export let label: string;
  export let type: string;

  export let placeholder = "";
  export let disabled = false;
  export let required = false;

  type = type === "integer" || type === "float" ? "number" : type;
</script>

<div class="form-control w-full max-w-lg mb-2">
  <label for={id} class="label font-medium pb-1">
    <span class="label-text">{label}</span>
    {#if !required} <span class="text-gray-400">(optional)</span> {/if}
  </label>
  {#if type === "textarea"}
    <textarea
      rows="3"
      class="input input-bordered w-full max-w-lg text-black p-2 rounded"
      {required}
      {disabled}
      {id}
      name={id}
    />
  {:else}
    <input
      class="input input-bordered w-full max-w-lg text-black p-2 rounded"
      {type}
      {placeholder}
      {required}
      {disabled}
      {id}
      name={id}
    />
  {/if}
</div>
