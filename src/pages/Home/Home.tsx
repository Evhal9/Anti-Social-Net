import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getPostImagesByPostId, getCommentsByPostId } from '../../services/api';
import { PostImage } from '../../types';
import { usePosts } from '../../contexts/PostContext';

const Home: React.FC = () => {
  
  const { posts, setPosts } = usePosts();  // ✅ Usamos contexto
  const [postImages, setPostImages] = useState<{ [key: string]: PostImage[] }>({});
  const [commentsCount, setCommentsCount] = useState<{ [key: string]: number }>({});
  const [isLoading, setIsLoading] = useState(true);

useEffect(() => {
  const fetchData = async () => {
    try {
      let postsData = posts;

      if (posts.length === 0) {
        postsData = await (await fetch('/api/posts')).json();
        setPosts(postsData);
      }

      const images: { [key: string]: PostImage[] } = {};
      const comments: { [key: string]: number } = {};

      for (const post of postsData) {
        const [imagesData, commentsData] = await Promise.all([
          getPostImagesByPostId(post.id),
          getCommentsByPostId(post.id),
        ]);

        images[post.id] = imagesData;
        comments[post.id] = commentsData.length;
      }

      setPostImages(images);
      setCommentsCount(comments);
    } catch (error) {
      console.error('Error fetching posts data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  fetchData();
}, [posts, setPosts]);


  if (isLoading) {
    return <div className="container text-center">Cargando...</div>;
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <h1>UnaHur Anti-Social Net</h1>
          <p>Conecta con la comunidad universitaria de manera diferente</p>
        </div>
      </section>

      <div className="container">
        {/* About Section */}
        <section className="features">
          <div className="feature-card">
            <h3>Comparte tus ideas</h3>
            <p>Publica tus pensamientos, proyectos y experiencias con la comunidad.</p>
          </div>
          <div className="feature-card">
            <h3>Conecta sin distracciones</h3>
            <p>Una red social enfocada en el contenido de calidad.</p>
          </div>
          <div className="feature-card">
            <h3>Comunidad Universitaria</h3>
            <p>Exclusivo para la comunidad de la Universidad Nacional de Hurlingham.</p>
          </div>
        </section>

        {/* Posts Feed */}
        <section>
          <h2>Publicaciones Recientes</h2>
          {posts.length === 0 ? (
            <div className="card text-center">
              <p>No hay publicaciones aún. ¡Sé el primero en publicar!</p>
            </div>
          ) : (
            posts.map(post => (
              <div key={post.id} className="card post-card">
                <div className="post-header">
                  <h3>{post.userId || 'Usuario'}</h3>
                  <small>{new Date(post.createdAt).toLocaleDateString()}</small>
                </div>

                <p>{post.description}</p>

                {postImages[post.id] && postImages[post.id].length > 0 && (
                  <div className="post-images">
                    {postImages[post.id].map(image => (
                      <img
                        key={image.id}
                        src={image.url}
                        alt={`Imagen de ${post.userId}`}
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
        </section>
      </div>
    </div>
  );
};

export default Home;
