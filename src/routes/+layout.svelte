<script lang="ts">
  import "../app.css";
  import { pb, websocket } from "$lib/store";
  import { setContext, onMount, onDestroy } from "svelte";
  import PocketBase from "pocketbase";
  import { page } from "$app/stores";

  let selected = "";
  const navItems = ["characters", "plot", "core-info", "summary", "testing"];
  let websocketURL = "ws://localhost:9020/ws/llm-chat/client_id";
  let retryInterval;

  const routeName = $page.route.id.replace("/", "");
  if (navItems.includes(routeName)) {
    selected = routeName;
  }

  onMount(async () => {
    createWebSocket();

    $pb = new PocketBase("http://127.0.0.1:8090"); // replace with your Pocketbase server URL
    await $pb.admins.authWithPassword("test@test.com", "testtesttest");
  });

  onDestroy(() => {
    if (retryInterval) {
      clearInterval(retryInterval);
    }
  });

  function createWebSocket() {
    $websocket = new WebSocket(websocketURL);

    $websocket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      console.log("Received message:", message);
      // TODO: do something with the received message
    };

    $websocket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    $websocket.onclose = (event) => {
      console.log("WebSocket closed:", event);
      retryInterval = setInterval(createWebSocket, 5000); // try to reconnect every 5 seconds
    };
  }

  const handleClick = (item) => () => {
    selected = item;
  };
</script>

<div class="2xl:flex">
  <nav
    class="mt-10 ml-20 mr-20 rounded-2xl p-3 flex justify-evenly items-center flex-wrap gap-2 bg-secondary-color 2xl:flex-col 2xl:items-start 2xl:max-h-96"
  >
    {#each navItems as item (item)}
      <a
        class="bg-dominant-color p-3 rounded-lg 2xl:w-full text-center"
        href="/{item}"
        class:selected={selected === item}
        on:click={handleClick(item)}
      >
        {item[0].toUpperCase() + item.slice(1)}
      </a>
    {/each}
  </nav>

  <div class="max-width-2000px mx-auto">
    <slot />
  </div>
</div>

<style>
  nav a {
    @apply text-2xl;
    text-decoration: none;
    /* transition: color 0.2s ease-in-out; */
  }

  nav a:hover:not(.selected) {
    @apply text-accent-color;
  }

  .selected {
    @apply bg-accent-color text-dominant-color;
  }

  .max-width-2000px {
    max-width: 2000px;
  }
</style>
