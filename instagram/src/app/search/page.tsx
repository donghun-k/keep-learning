import { Metadata } from "next";

import UserSearch from "@/components/UserSearch";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "User Search",
  description: "Search users to follow",
};

const SearchPage = () => {
  return <UserSearch />;
};

export default SearchPage;
