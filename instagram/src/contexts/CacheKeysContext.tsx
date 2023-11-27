import { createContext, useContext } from "react";

interface CacheKeysValue {
  postsKey: string;
}

export const CacheKeysContext = createContext<CacheKeysValue>({
  postsKey: "/api/posts",
});

export const useCacheKeys = () => useContext(CacheKeysContext);
