"use server";

import { revalidatePath } from "next/cache";

export default async function action(name) {
  revalidatePath(`/${name}`, "page");
}
