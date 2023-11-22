export interface User {
  name: string;
  username: string;
  email: string;
  image?: string;
}

export type SimpleUser = Pick<User, "username" | "image">;

export interface DeatilUser extends User {
  following: SimpleUser[];
  followers: SimpleUser[];
  bookmarks: string[];
}

export interface ProfileUser extends User {
  following: number;
  followers: number;
}
