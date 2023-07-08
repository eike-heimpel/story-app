<script lang="ts">
  import { loadingInfo } from "$lib/store";
  import DotsAnimation from "$lib/components/DotsAnimation.svelte";
</script>

{#if $loadingInfo.loading}
  <div class="fixed inset-0 flex items-center justify-center">
    <div
      class="w-1/4 h-1/6 m-auto flex flex-col justify-center items-center gap-3 bg-primary border border-accent rounded z-[9999] text-2xl"
    >
      {$loadingInfo.message}
      <DotsAnimation />
    </div>
  </div>
{/if}
