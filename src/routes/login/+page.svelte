<script lang="ts">
  import type { PageData } from "./$types";

  export let data: PageData;

  export let form;
</script>

<form method="POST" class="flex flex-col items-center space-y-2 w-full pt-4">
  <div class="form-control w-full max-w-md">
    <label for="userName" class="label font-medium pb-1">
      <span class="label-text">Username</span>
    </label>
    <input type="text" name="userName" class="input input-bordered w-full max-w-md" />
  </div>
  <div class="form-control w-full max-w-md">
    <label for="password" class="label font-medium pb-1">
      <span class="label-text">Password</span>
    </label>
    <input type="password" name="password" class="input input-bordered w-full max-w-md" />
  </div>

  <div class="w-full max-w-md pt-2">
    <button type="submit" class="btn btn-primary w-full">Login</button>
  </div>
</form>
