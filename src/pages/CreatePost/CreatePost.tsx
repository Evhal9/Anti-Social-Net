import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../contexts/UserContexts';
import { createPost, getTags, createPostImage } from '../../services/api';
import { Tag } from '../../types';
import Alert from '../../components/Alert/Alert';
import { usePosts } from '../../contexts/PostContext';


const CreatePost: React.FC = () => {
   const { setPosts } = usePosts();
  const { user } = useUser();
  const navigate = useNavigate();

  const [description, setDescription] = useState('');
  const [imageUrls, setImageUrls] = useState<string[]>(['']);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [availableTags, setAvailableTags] = useState<Tag[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingTags, setIsLoadingTags] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Cargar etiquetas
  useEffect(() => {
    const fetchTags = async () => {
      try {
        const tags = await getTags();
        setAvailableTags(tags);
      } catch (err) {
        console.error('Error fetching tags:', err);
        setError('No se pudieron cargar las etiquetas');
      } finally {
        setIsLoadingTags(false);
      }
    };
    fetchTags();
  }, []);

  // Manejo de URLs de imágenes
  const handleAddImageUrl = () => setImageUrls(prev => [...prev, '']);
  const handleRemoveImageUrl = (index: number) => setImageUrls(prev => prev.filter((_, i) => i !== index));
  const handleImageUrlChange = (index: number, value: string) =>
    setImageUrls(prev => prev.map((url, i) => (i === index ? value : url)));

  // Manejo de selección de tags
  const handleTagToggle = (tagId: string) => {
    setSelectedTags(prev =>
      prev.includes(tagId) ? prev.filter(id => id !== tagId) : [...prev, tagId]
    );
  };

  // Enviar formulario
 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!user) return;

  setIsLoading(true);
  setError(null);
  setSuccess(null);

  try {
    const postPayload = {
      description,
      nickName: user.nickName,
    };

    const post = await createPost(postPayload);

    if (!post.id) throw new Error('Post no creado correctamente');

    const validImageUrls = imageUrls.filter(url => url.trim() !== '');
    if (validImageUrls.length > 0) {
      await Promise.all(
        validImageUrls.map(url =>
          createPostImage({ url: url.trim(), postId: post.id })
        )
      );
    }

    // actualizamos el contexto para que aparezca de inmediato
    setPosts(prevPosts => [post, ...prevPosts]);

    setSuccess('¡Publicación creada con éxito!');
    setTimeout(() => navigate('/profile'), 2000);

  } catch (err) {
    console.error(err);
    setError('Error creando el post');
  } finally {
    setIsLoading(false);
  }
};


  if (!user) return <div className="container text-center">Debes iniciar sesión para crear publicaciones</div>;

  return (
    <div className="container">
      <div className="form-container">
        <h2 className="text-center">Crear Nueva Publicación</h2>
        <form onSubmit={handleSubmit}>
          <Alert message={error} type="error" onClose={() => setError(null)} />
          <Alert message={success} type="success" />

          <div className="form-group">
            <label htmlFor="description">Descripción *</label>
            <textarea
              id="description"
              className="form-control"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={5}
              required
              placeholder="¿Qué quieres compartir con la comunidad?"
            />
          </div>

          <div className="form-group">
            <label>URLs de Imágenes (opcional)</label>
            {imageUrls.map((url, index) => (
              <div key={index} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <input
                  type="url"
                  className="form-control"
                  value={url}
                  onChange={(e) => handleImageUrlChange(index, e.target.value)}
                  placeholder="https://ejemplo.com/imagen.jpg"
                />
                {imageUrls.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveImageUrl(index)}
                    className="btn btn-danger"
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
            <button type="button" onClick={handleAddImageUrl} className="btn btn-secondary">
              + Agregar otra imagen
            </button>
          </div>

          <div className="form-group">
            <label>Etiquetas (opcional)</label>
            {isLoadingTags ? (
              <div>Cargando etiquetas...</div>
            ) : (
              <div className="tags">
                {availableTags.map(tag => (
                  <button
                    key={tag.id}
                    type="button"
                    className={`tag ${selectedTags.includes(tag.id) ? 'active' : ''}`}
                    style={{
                      backgroundColor: selectedTags.includes(tag.id) ? 'var(--accent-blue)' : 'var(--primary-light)',
                      cursor: 'pointer'
                    }}
                    onClick={() => handleTagToggle(tag.id)}
                  >
                    #{tag.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            disabled={isLoading || !description.trim() || !!success}
          >
            {isLoading ? 'Publicando...' : 'Publicar'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
