export interface User {
    id: number;
    nickName: string;
    avatar?: string;
    createdAt: string;
  }
  
  export interface Post {
    id: number;
    description: string;
    userId: number;
    createdAt: string;
    tags: Tag[];
    user?: User;
  }
  
  export interface Tag {
    id: number;
    name: string;
  }
  
  export interface Comment {
    id: number;
    content: string;
    postId: number;
    userId: number;
    createdAt: string;
    user?: User;
  }
  
  export interface PostImage {
    id: number;
    url: string;
    postId: number;
  }