import { createContext, useState, useContext, ReactNode, useEffect } from "react";
import { getPosts } from "../services/api";
import { Post } from '../types';

type PostContextType = {
  posts: Post[];
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
};

const PostContext = createContext<PostContextType | undefined>(undefined);

export const PostProvider = ({ children }: { children: ReactNode }) => {
  const [posts, setPosts] = useState<Post[]>([]); // ✅ Solo dentro del componente

  useEffect(() => {
    async function fetch() {
      const data = await getPosts();
      setPosts(data);
    }
    fetch();
  }, []);

  return (
    <PostContext.Provider value={{ posts, setPosts }}>
      {children}
    </PostContext.Provider>
  );
};

export const usePosts = () => {
  const context = useContext(PostContext);
  if (!context) throw new Error("usePosts debe usarse dentro de PostProvider");
  return context;
};
