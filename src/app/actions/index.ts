"use server";

import { db } from "@/db";
import { redirect } from "next/navigation";

export async function editSnippet(id: number, code: string) {
  await db.snippet.update({
    where: { id },
    data: { code },
  });

  redirect(`/snippets/${id}`);
}

export async function deleteSnippet(id: number) {
  await db.snippet.delete({
    where: { id },
  });

  redirect("/");
}

export const createSnippet = async (formData: FormData) => {
  // This needs to be a server action!
  "use server";
  // Check the user inputs and make sure theyre vaild
  const title = formData.get("title") as string;
  const code = formData.get("code") as string;

  // Create a new recored in the database
  const snippet = await db.snippet.create({
    data: {
      title,
      code,
    },
  });

  // Redirect the user back to the root route
  redirect("/");
};
