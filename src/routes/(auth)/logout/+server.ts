import { redirect } from "@sveltejs/kit";

export const POST = async ({ locals }) => {
  await locals.supabase.auth.signOut();
  console.log("logged out");
  throw redirect(303, "/login");
};
