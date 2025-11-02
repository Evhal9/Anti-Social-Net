import { User, Post, Comment, Tag, PostImage } from '../types';
import { API_BASE_URL } from '../utils/constants';


export const getUsers = async (): Promise<User[]> => {
  const response = await fetch(`${API_BASE_URL}/users`);
  return response.json();
};

export const getUserById = async (id: number): Promise<User> => {
  const response = await fetch(`${API_BASE_URL}/users/${id}`);
  return response.json();
};

export const createUser = async (user: Omit<User, 'id' | 'createdAt'>): Promise<User> => {
  const response = await fetch(`${API_BASE_URL}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
  return response.json();
};


export const getPosts = async (userId?: number): Promise<Post[]> => {
  const url = userId ? `${API_BASE_URL}/posts?userId=${userId}` : `${API_BASE_URL}/posts`;
  const response = await fetch(url);
  return response.json();
};


export const getPostById = async (id: number): Promise<Post> => {
  const response = await fetch(`${API_BASE_URL}/posts/${id}`);
  return response.json();
};


export const createPost = async (post: Omit<Post, 'id' | 'createdAt'>): Promise<Post> => {
  const response = await fetch(`${API_BASE_URL}/posts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(post),
  });
  return response.json();
};


export const getTags = async (): Promise<Tag[]> => {
  const response = await fetch(`${API_BASE_URL}/tags`);
  return response.json();
};


export const getCommentsByPostId = async (postId: number): Promise<Comment[]> => {
  const response = await fetch(`${API_BASE_URL}/comments/post/${postId}`);
  return response.json();
};


export const createComment = async (comment: Omit<Comment, 'id' | 'createdAt'>): Promise<Comment> => {
  const response = await fetch(`${API_BASE_URL}/comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(comment),
  });
  return response.json();
};


export const getPostImagesByPostId = async (postId: number): Promise<PostImage[]> => {
  const response = await fetch(`${API_BASE_URL}/postimages/post/${postId}`);
  return response.json();
};

export const createPostImage = async (postImage: Omit<PostImage, 'id'>): Promise<PostImage> => {
  const response = await fetch(`${API_BASE_URL}/postimages`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(postImage),
  });
  return response.json();
};