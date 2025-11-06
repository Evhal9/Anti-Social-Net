import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useUser } from '../../contexts/UserContexts';
import { getPostById, getCommentsByPostId, getPostImagesByPostId, createComment } from '../../services/api';
import { Post, Comment, PostImage } from '../../types';

const PostDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useUser();
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [images, setImages] = useState<PostImage[]>([]);
  const [newComment, setNewComment] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;

      try {
        const [postData, commentsData, imagesData] = await Promise.all([
          getPostById(id),
          getCommentsByPostId(id),
          getPostImagesByPostId(id)
        ]);

        setPost(postData);
        setComments(commentsData);
        setImages(imagesData);
      } catch (error) {
        console.error('Error fetching post details:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !post || !newComment.trim()) return;

    setIsSubmitting(true);
    try {
      const comment = await createComment({
        content: newComment,
        postId: post.id,
        userId: user.nickName
      });

      setComments(prev => [...prev, comment]);
      setNewComment('');
    } catch (error) {
      console.error('Error creating comment:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <div className="container text-center">Cargando...</div>;
  }

  if (!post) {
    return <div className="container text-center">Publicación no encontrada</div>;
  }

  return (
    <div className="container">
      <Link to="/" className="btn btn-secondary mb-2">← Volver al inicio</Link>
      
      <div className="card">
        <div className="post-header">
          <h2>{post.user?.nickName || 'Usuario'}</h2>
          <small>{new Date(post.createdAt).toLocaleDateString()}</small>
        </div>
        <p>{post.description}</p>
        
        {images.length > 0 && (
          <div className="post-images">
            {images.map(image => (
              <img
                key={image.id}
                src={image.url}
                alt={`Imagen de ${post.user?.nickName}`}
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
      </div>

      {/* Comments Section */}
      <div className="comments-section">
        <h3>Comentarios ({comments.length})</h3>
        
        {user ? (
          <form onSubmit={handleSubmitComment} className="card">
            <div className="form-group">
              <textarea
                className="form-control"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Escribe tu comentario..."
                rows={3}
                required
              />
            </div>
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={isSubmitting || !newComment.trim()}
            >
              {isSubmitting ? 'Publicando...' : 'Publicar Comentario'}
            </button>
          </form>
        ) : (
          <div className="card text-center">
            <p>
              <Link to="/login">Inicia sesión</Link> para comentar
            </p>
          </div>
        )}

        {comments.map(comment => (
          <div key={comment.id} className="comment">
            <div className="comment-header">
              <strong>{comment.user?.nickName || 'Usuario'}</strong>
              <span>{new Date(comment.createdAt).toLocaleDateString()}</span>
            </div>
            <p>{comment.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostDetail;