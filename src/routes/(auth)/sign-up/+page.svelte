<!-- // src/routes/auth/+page.svelte -->
<script lang="ts">
  import Button from "$components/ui/button/Button.svelte";
  import Input from "$components/Input.svelte";

  export let data;
  let { supabase } = data;
  $: ({ supabase } = data);

  let email;
  let password;

  const handleSignUp = async () => {
    await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    });
  };

  const handleSignIn = async () => {
    const resp = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    console.log(resp);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };
</script>

<form on:submit={handleSignUp}>
  <Input name="email" bind:value={email} />
  <Input type="password" name="password" bind:value={password} />
  <Button>Sign up</Button>
</form>

<Button on:click={handleSignIn}>Sign in</Button>
<Button on:click={handleSignOut}>Sign out</Button>
