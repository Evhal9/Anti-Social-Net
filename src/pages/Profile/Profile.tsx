import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../../contexts/UserContexts';
import { getPosts, getCommentsByPostId, getPostImagesByPostId } from '../../services/api';
import { Post, PostImage } from '../../types';

const Profile: React.FC = () => {
  const { user } = useUser();
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [commentsCount, setCommentsCount] = useState<{ [key: string]: number }>({});
  const [postImages, setPostImages] = useState<{ [key: string]: PostImage[] }>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserPosts = async () => {
      if (!user) return;

      try {
        const posts = await getPosts();
        const userPosts = posts.filter(post => post.userId === user.nickName);
        setUserPosts(userPosts);

        const comments: { [key: string]: number } = {};
        const images: { [key: string]: PostImage[] } = {};

        for (const post of posts) {
          const [commentsData, imagesData] = await Promise.all([
            getCommentsByPostId(post.id),
            getPostImagesByPostId(post.id)
          ]);

          comments[post.id] = commentsData.length;
          images[post.id] = imagesData;
        }

        setCommentsCount(comments);
        setPostImages(images);
      } catch (error) {
        console.error('Error fetching user posts:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserPosts();
  }, [user]);

  if (!user) {
    return <div className="container text-center">No hay usuario logueado</div>;
  }

  return (
    <div className="container">
      <div className="card text-center">
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

      <div className="mt-2">
        <h2>Mis Publicaciones ({userPosts.length})</h2>
        
        {isLoading ? (
          <div className="text-center">Cargando publicaciones...</div>
        ) : userPosts.length === 0 ? (
          <div className="card text-center">
            <p>No has hecho ninguna publicación aún.</p>
            <Link to="/create-post" className="btn btn-primary">
              Crear primera publicación
            </Link>
          </div>
        ) : (
          userPosts.map(post => (
            <div key={post.id} className="card post-card">
              <p>{post.description}</p>
              
              {postImages[post.id] && postImages[post.id].length > 0 && (
                <div className="post-images">
                  {postImages[post.id].slice(0, 1).map(image => (
                    <img
                      key={image.id}
                      src={image.url}
                      alt="Imagen del post"
                      className="post-image"
                    />
                  ))}
                </div>
              )}
              
              {post.tags && post.tags.length > 0 && (
                <div className="tags">
                  {post.tags.map(tag => (
                    <span key={tag.id} className="tag">#{tag.name}</span>
                  ))}
                </div>
              )}
              
              <div className="post-footer">
                <span>{commentsCount[post.id] || 0} comentarios</span>
                <Link to={`/post/${post.id}`} className="btn btn-primary">
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