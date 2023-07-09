<script lang="ts">
  import type { PageData } from "./$types";
  import { Button } from "$lib/components/ui/button";
  import { Input } from "$components/ui/input";

  export let data: PageData;

  export let form;
</script>

<form method="POST" class="flex flex-col items-center space-y-2 w-full pt-4">
  <div class="w-full max-w-md">
    <label for="userName" class="block font-medium pb-1">
      <span class="">Username</span>
    </label>
    <Input type="text" name="userName" />
  </div>
  <div class="w-full max-w-md">
    <label for="password" class="block font-medium pb-1">
      <span class="">Password</span>
    </label>
    <Input type="password" name="password" />
  </div>

  <div class="w-full max-w-md pt-2">
    <Button variant="outline">Log In</Button>
  </div>
</form>
