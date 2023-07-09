import { error, redirect, json } from "@sveltejs/kit";
import { serializeNonPOJOs } from "$lib/utils.js";

let prePromptRecord;

// export const load = async ({ locals }) => {
//   if (!locals.pb) {
//     return json({});
//   }

//   const collectionData = await locals.pb.collection("prompt_info").getFullList({
//     sort: "-created",
//   });

//   prePromptRecord = serializeNonPOJOs(collectionData[0]);

//   return {
//     prePromptRecord,
//   };
// };

// export const actions = {
//   default: async ({ request, locals }) => {
//     const formData = await request.formData();

//     let insertData = Object.fromEntries(formData);

//     insertData.user = locals.user.id;

//     try {
//       await locals.pb.collection("prompt_info").update(prePromptRecord.id, insertData);
//     } catch (err) {
//       console.log("Error: ", err);
//       throw error(500, err.message);
//     }
//   },
// };
