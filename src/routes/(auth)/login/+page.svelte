<script lang="ts">
  import { enhance } from "$app/forms";
  import { Button } from "$lib/components/ui/button";
  import { Input } from "$components/ui/input";

  export let data;

  export let form;
</script>

<form method="POST" use:enhance class="flex flex-col items-center space-y-2 w-full pt-4">
  <div class="w-full max-w-md">
    <Input type="email" name="email" placeholder="email" value={form?.email ?? ""} />
  </div>
  <div class="w-full max-w-md">
    <Input type="password" name="password" placeholder="password" />
  </div>

  <div class="w-full max-w-md pt-2">
    <Button variant="outline">Log In</Button>
  </div>
</form>
