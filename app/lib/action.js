"use server";

import { revalidatePath } from "next/cache";

export default async function action(name) {
  console.log("name", name);
  revalidatePath(`/${name}`, "page");
}
