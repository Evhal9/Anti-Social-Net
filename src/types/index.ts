export interface User {
  nickName: string;
  avatar?: string;
  password?: string;
  createdAt: string;
}

export interface Tag {
  id: string;
  name: string;
}

export interface Post {
  id: string;             
  description: string;
  userId: string;         
  createdAt: string;
  tags: Tag[];
  user?: User;
}

export interface Comment {
    id: string;
  text: string;       // 👈 en vez de "content"
  postId: string;
  nickName: string;   // 👈 en vez de "userId"
  createdAt: string;
}

export interface PostImage {
  id: string;             
  url: string;
  postId: string;         
}
