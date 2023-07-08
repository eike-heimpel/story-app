<script>
  import { onMount } from "svelte";

  let dots = 0;

  onMount(() => {
    const intervalId = setInterval(() => {
      dots = dots < 3 ? dots + 1 : 0;
    }, 300);

    // Clean up the interval on component destroy
    return () => clearInterval(intervalId);
  });
</script>

<div>
  <span class="dot bg-accent" class:visible={dots > 0 ? "visible" : ""} />
  <span class="dot bg-accent" class:visible={dots > 1 ? "visible" : ""} />
  <span class="dot bg-accent" class:visible={dots > 2 ? "visible" : ""} />
</div>

<style>
  .dot {
    display: inline-block;
    width: 10px;
    height: 10px;
    margin: 5px;
    border-radius: 50%;
    opacity: 0;
    transition: opacity 0.5s ease-in-out;
  }

  .dot.visible {
    opacity: 1;
  }
</style>
