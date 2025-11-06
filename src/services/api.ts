import { User, Post, Comment, Tag, PostImage } from '../types';
import { API_BASE_URL } from '../utils/constants';

// USERS
export const getUsers = async (): Promise<User[]> => {
  const response = await fetch(`${API_BASE_URL}/users`);
  return response.json();
};

export const getUserById = async (id: string): Promise<User> => {
  const response = await fetch(`${API_BASE_URL}/users/${id}`);
  return response.json();
};

export const createUser = async (user: Omit<User, 'id' | 'createdAt'>): Promise<User> => {
  const response = await fetch(`${API_BASE_URL}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  });
  return response.json();
};

// POSTS
export const getPosts = async (userId?: string): Promise<Post[]> => {
  const url = userId ? `${API_BASE_URL}/posts?userId=${userId}` : `${API_BASE_URL}/posts`;
  const response = await fetch(url);
  return response.json();
};

export const getPostById = async (id: string): Promise<Post> => {
  const response = await fetch(`${API_BASE_URL}/posts/${id}`);
  return response.json();
};

export const createPost = async (postData: any) => {
  try {
    const response = await fetch(`${API_BASE_URL}/posts/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(postData),
    });

    // Intentamos parsear JSON si es posible
    let data;
    const text = await response.text(); // leemos como texto
    try {
      data = JSON.parse(text); // intentamos parsear
    } catch {
      data = text; 
    }

    if (!response.ok) {
      console.error('Error en la request:', data);
      throw new Error(data?.message || 'Error creando el post');
    }

    return data;
  } catch (err: any) {
    console.error('Error creando el post:', err);
    throw err;
  }
};


// TAGS
export const getTags = async (): Promise<Tag[]> => {
  const response = await fetch(`${API_BASE_URL}/tags`);
  return response.json();
};


// Obtener comentarios
export const getCommentsByPostId = async (postId: string): Promise<Comment[]> => {
  const response = await fetch(`${API_BASE_URL}/posts/${postId}/comments`);
  if (!response.ok) return [];
  return response.json();
};

export async function createComment(postId: string, commentData: { text: string; author: string }) {
  const response = await fetch(`http://localhost:3000/posts/${postId}/add-comment`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(commentData),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error);
  }

  return response.json();
}
// POST IMAGES
export const getPostImagesByPostId = async (postId: string): Promise<PostImage[]> => {
  const response = await fetch(`${API_BASE_URL}/posts/${postId}/images`);
  if (!response.ok) return [];
  return response.json();
};


export const createPostImage = async (postImage: Omit<PostImage, 'id'>): Promise<PostImage> => {
  const response = await fetch(`${API_BASE_URL}/postimages`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(postImage),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Error creando imagen:', errorText);
    throw new Error('Error creando la imagen del post');
  }

  return response.json();
};
