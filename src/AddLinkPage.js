import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createLink } from './api';

function AddLinkPage() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!title.trim() || !url.trim()) {
      setError('Por favor completa los campos obligatorios');
      return;
    }

    const tags = tagsInput
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag !== '');

    try {
      await createLink({ title, url, description, tags });
      alert('Enlace añadido correctamente');
      navigate('/');
    } catch (err) {
      setError('Error al crear el enlace. Por favor intenta de nuevo.');
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Añadir Nuevo Enlace</h2>
      
      {error && <p className="error">{error}</p>}
      
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Título:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
          />
        </div>
        
        <div>
          <label htmlFor="url">URL:</label>
          <input
            type="url"
            id="url"
            value={url}
            onChange={e => setUrl(e.target.value)}
            required
          />
        </div>
        
        <div>
          <label htmlFor="description">Descripción:</label>
          <textarea
            id="description"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
        </div>
        
        <div>
          <label htmlFor="tags">Etiquetas (separadas por comas):</label>
          <input
            type="text"
            id="tags"
            value={tagsInput}
            onChange={e => setTagsInput(e.target.value)}
          />
        </div>
        
        <div className="form-buttons">
          <button type="submit">Guardar</button>
          <button type="button" onClick={() => navigate('/')}>Cancelar</button>
        </div>
      </form>
    </div>
  );
}

export default AddLinkPage;