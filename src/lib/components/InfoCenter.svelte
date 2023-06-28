<script lang="ts">
  import { loadingInfo } from "$lib/store";
  import DotsAnimation from "$lib/components/DotsAnimation.svelte";
</script>

{#if $loadingInfo.loading}
  <div
    class="fixed right-0 top-1/3 w-1/6 h-1/3 flex justify-center items-center gap-3 bg-dominant-color border border-accent-color rounded z-[9999] text-2xl"
  >
    {$loadingInfo.message}
    <DotsAnimation />
  </div>
{/if}
