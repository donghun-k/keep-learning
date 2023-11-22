import { ProfileUser } from "@/app/model/user";

import { client } from "./sanity";

interface OAuthUser {
  id: string;
  email: string;
  name: string;
  username: string;
  image?: string | null;
}

export const addUser = async ({
  id,
  username,
  name,
  email,
  image,
}: OAuthUser) => {
  return client.createIfNotExists({
    _id: id,
    _type: "user",
    username,
    email,
    name,
    image,
    following: [],
    followers: [],
    bookmarks: [],
  });
};

export const getUserByUsername = (username: string) => {
  return client.fetch(
    `*[_type == "user" && username == "${username}"][0]{
      ...,
      "id": _id,
      following[]->{username, image},
      followers[]->{username, image},
      "bookmarks": bookmarks[]->_id,
    }`,
  );
};

export const searchUsers = (keyword?: string) => {
  const query = keyword
    ? `&& (name match "${keyword}*" || username match "${keyword}*")`
    : "";
  return client
    .fetch(
      `
      *[_type == "user" ${query}]{
        ...,
        "following": count(following),
        "followers": count(followers),
      }
    `,
    )
    .then((users) =>
      users.map((user: ProfileUser) => ({
        ...user,
        following: user.following ?? 0,
        followers: user.followers ?? 0,
      })),
    );
};
