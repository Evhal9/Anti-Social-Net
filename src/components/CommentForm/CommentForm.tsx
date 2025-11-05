import React, { useState } from 'react';
import { useUser } from '../../contexts/UserContexts';
import { createComment } from '../../services/api';

interface CommentFormProps {
  postId: number;
  onCommentAdded: () => void;
}

const CommentForm: React.FC<CommentFormProps> = ({ postId, onCommentAdded }) => {
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useUser();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !content.trim()) return;

    setIsSubmitting(true);
    try {
      await createComment({
        content,
        postId,
        userId: user.id
      });
      setContent('');
      onCommentAdded(); // Llama a la función para actualizar los comentarios
    } catch (error) {
      console.error('Error creating comment:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) {
    return (
      <div className="card text-center">
        <p>Inicia sesión para comentar</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="card">
      <div className="form-group">
        <textarea
          className="form-control"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Escribe tu comentario..."
          rows={3}
          required
        />
      </div>
      <button 
        type="submit" 
        className="btn btn-primary"
        disabled={isSubmitting || !content.trim()}
      >
        {isSubmitting ? 'Publicando...' : 'Publicar Comentario'}
      </button>
    </form>
  );
};

export default CommentForm;