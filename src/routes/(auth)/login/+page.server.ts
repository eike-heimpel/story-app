import { fail, redirect } from "@sveltejs/kit";

export const actions = {
  default: async ({ request, url, locals: { supabase } }) => {
    const body = Object.fromEntries(await request.formData());

    const { data, error } = await supabase.auth.signInWithPassword({
      email: body.email as string,
      password: body.password as string,
    });

    if (error) {
      return fail(500, { message: "Server error. Try again later.", success: false, email });
    }

    console.log("logged in");
    throw redirect(307, "/summary");
  },
};
