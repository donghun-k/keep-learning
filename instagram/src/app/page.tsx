import FollowingBar from "@/components/ui/FollowingBar";
import PostList from "@/components/ui/PostList";
import SideBar from "@/components/ui/SideBar";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

const HomePage = async () => {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    redirect("/auth/signin");
  }

  return (
    <section className="flex w-full max-w-[850px] flex-col p-4 md:flex-row">
      <div className="w-full basis-3/4">
        <FollowingBar />
        <PostList />
      </div>
      <div className="basis-1/4">
        <SideBar user={user} />
      </div>
    </section>
  );
};

export default HomePage;
