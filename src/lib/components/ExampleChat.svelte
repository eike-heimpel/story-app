<script>
  import { useChat } from "ai/svelte";
  import { Button } from "$lib/components/ui/button";

  const { input, handleSubmit, messages } = useChat();
</script>

<svelte:head>
  <title>Home</title>
  <meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
  <h1>useChat</h1>
  <ul>
    {#each $messages as message}
      <li>{message.role}: {message.content}</li>
    {/each}
  </ul>
  <form on:submit={handleSubmit}>
    <input bind:value={$input} />
    <Button variant="default" type="submit">Send</Button>
  </form>
</section>

<style>
  section {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 0.6;
  }

  h1 {
    width: 100%;
  }
</style>
