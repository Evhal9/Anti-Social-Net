import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../../contexts/UserContexts';
import { getCommentsByPostId, getPostImagesByPostId } from '../../services/api';
import { Post, PostImage } from '../../types';
import { usePosts } from '../../contexts/PostContext';

const Profile: React.FC = () => {
  const { user } = useUser();
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [commentsCount, setCommentsCount] = useState<{ [key: string]: number }>({});
  const [postImages, setPostImages] = useState<{ [key: string]: PostImage[] }>({});
  const [isLoading, setIsLoading] = useState(true);
  const { posts } = usePosts();

useEffect(() => {
  const fetchUserPosts = async () => {
    if (!user) return;
    setIsLoading(true);

    try {
      const filteredPosts = posts.filter(post => post.userId === user.nickName);
      setUserPosts(filteredPosts);

      const comments: { [key: string]: number } = {};
      const images: { [key: string]: PostImage[] } = {};

      for (const post of filteredPosts) {
        const [commentsData, imagesData] = await Promise.all([
          getCommentsByPostId(post.id),
          getPostImagesByPostId(post.id)
        ]);
        comments[post.id] = commentsData.length;
        images[post.id] = imagesData;
      }

      setCommentsCount(comments);
      setPostImages(images);
    } catch (err) {
      console.error('Error fetching user posts:', err);
    } finally {
      setIsLoading(false);
    }
  };

  fetchUserPosts();
}, [user, posts]); // ✅ Agregamos posts aquí

  if (!user) return <div className="container text-center">No hay usuario logueado</div>;

  return (
    <div className="container">
      {/* Perfil */}
      <div className="card text-center mb-4">
        <h1>Mi Perfil</h1>
        <div className="profile-info">
          <h2>{user.nickName}</h2>
          {user.avatar && (
            <img
              src={user.avatar}
              alt="Avatar"
              style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover' }}
            />
          )}
          <p>Miembro desde: {new Date(user.createdAt).toLocaleDateString()}</p>
        </div>
      </div>

      {/* Publicaciones del usuario */}
      <div className="mt-2">
        <h2>Mis Publicaciones ({userPosts.length})</h2>

        {isLoading ? (
          <div className="text-center">Cargando publicaciones...</div>
        ) : userPosts.length === 0 ? (
          <div className="card text-center p-3">
            <p>No has hecho ninguna publicación aún.</p>
            <Link to="/create-post" className="btn btn-primary">
              Crear primera publicación
            </Link>
          </div>
        ) : (
          userPosts.map(post => (
            <div key={post.id} className="card post-card mb-3 p-3">
              <p>{post.description}</p>

              {postImages[post.id] && postImages[post.id].length > 0 && (
                <div className="post-images mb-2">
                  {postImages[post.id].slice(0, 1).map(image => (
                    <img
                      key={image.id}
                      src={image.url}
                      alt="Imagen del post"
                      className="post-image"
                      style={{ maxWidth: '100%', borderRadius: '8px' }}
                    />
                  ))}
                </div>
              )}

              {post.tags && post.tags.length > 0 && (
                <div className="tags mb-2">
                  {post.tags.map(tag => (
                    <span key={tag.id} className="tag me-1">#{tag.name}</span>
                  ))}
                </div>
              )}

              <div className="post-footer d-flex justify-content-between align-items-center">
                <span>{commentsCount[post.id] || 0} comentarios</span>
                <Link to={`/post/${post.id}`} className="btn btn-primary btn-sm">
                  Ver más
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Profile;
