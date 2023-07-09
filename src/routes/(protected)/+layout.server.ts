import { error, fail } from "@sveltejs/kit";

export const load = async ({ locals }) => {
  const session = await locals.getSession();

  if (!session) {
    throw error(401, { message: "Unauthorized" });
  }
};
