<script lang="ts">
  import type { PageData } from "./$types";

  export let data: PageData;

  export let form;
</script>

<form method="POST" class="flex flex-col items-center space-y-2 w-full pt-4">
  <div class="w-full max-w-md">
    <label for="userName" class="block font-medium pb-1">
      <span class="text-white">Username</span>
    </label>
    <input
      type="text"
      name="userName"
      class="w-full max-w-md bg-white text-black my-2 rounded p-2 border border-gray-300"
    />
  </div>
  <div class="w-full max-w-md">
    <label for="password" class="block font-medium pb-1">
      <span class="text-white">Password</span>
    </label>
    <input
      type="password"
      name="password"
      class="w-full max-w-md bg-white text-black my-2 rounded p-2 border border-gray-300"
    />
  </div>

  <div class="w-full max-w-md pt-2">
    <button type="submit">Login</button>
  </div>
</form>
