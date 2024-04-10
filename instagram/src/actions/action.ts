"use server";

import { revalidatePath } from "next/cache";

export const revalidateUserProfile = async (username: string) => {
  revalidatePath(`/user/${username}`);
};
