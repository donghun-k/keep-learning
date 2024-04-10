import { getServerSession } from "next-auth";
import { getProviders } from "next-auth/react";
import { redirect } from "next/navigation";
import { Metadata } from "next";

import SignIn from "@/components/SignIn";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to Instagram",
};
interface Props {
  searchParams: {
    callbackUrl: string;
  };
}

const SignInPage = async ({ searchParams: { callbackUrl } }: Props) => {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/");
  }

  const providers = (await getProviders()) ?? {};

  return (
    <section className="mt-24 flex justify-center">
      <SignIn providers={providers} callbackUrl={callbackUrl ?? "/"} />
    </section>
  );
};

export default SignInPage;
