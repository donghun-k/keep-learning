"use client";

import { FormEventHandler, useState } from "react";
import useSWR from "swr";
import dynamic from "next/dynamic";

import { SearchUser } from "@/app/model/user";
import useDebounce from "@/hooks/useDebounce";

import UserCard from "./UserCard";

const GridLoader = dynamic(() => import("react-spinners/GridLoader"), {
  ssr: false,
});

const UserSearch = () => {
  const [keyword, setKeyword] = useState("");
  const debouncedKeyword = useDebounce(keyword);
  const {
    data: users,
    isLoading,
    error,
  } = useSWR<SearchUser[]>(`/api/search/${debouncedKeyword}`);

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
  };

  return (
    <section className="my-4 flex w-full max-w-2xl flex-col items-center">
      <form className="mb-4 w-full" onSubmit={handleSubmit}>
        <input
          className="w-full border border-gray-400 p-3 text-xl outline-none"
          type="text"
          autoFocus
          placeholder="Search for a username or name"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
      </form>
      {isLoading && <GridLoader />}
      {error && <p>Something went wrong</p>}
      {!isLoading && !error && users?.length === 0 && <p>No users found</p>}
      <ul className="w-full p-4">
        {users &&
          users.map((user) => (
            <li key={user.username}>
              <UserCard user={user} />
            </li>
          ))}
      </ul>
    </section>
  );
};

export default UserSearch;
