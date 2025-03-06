import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchLinks, fetchTags } from './api';


function HomePage() {
  const [links, setLinks] = useState([]);
  const [tags, setTags] = useState([]);
  const [selectedTag, setSelectedTag] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const linksData = await fetchLinks(selectedTag);
        const tagsData = await fetchTags();
        setLinks(linksData);
        setTags(tagsData);
        setError(null);
      } catch (err) {
        setError('Error al cargar datos. Por favor intenta de nuevo.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [selectedTag]);

  const handleTagChange = (e) => {
    setSelectedTag(e.target.value);
  };

  if (loading) return <p>Cargando enlaces...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div>
      <h2>Todos los Enlaces</h2>
      
      <div className="tag-filter">
        <label>
          Filtrar por etiqueta:
          <select value={selectedTag} onChange={handleTagChange}>
            <option value="">Todas las etiquetas</option>
            {tags.map(tag => (
              <option key={tag.id} value={tag.name}>{tag.name}</option>
            ))}
          </select>
        </label>
      </div>

      {links.length === 0 ? (
        <p>No se encontraron enlaces.</p>
      ) : (
        <div className="links-list">
          {links.map(link => (
            <div key={link.id} className="link-card">
              <h3>
                <Link to={`/link/${link.id}`}>{link.title}</Link>
              </h3>
              <p>{link.description || ''}</p>
              <p>
                <a href={link.url} target="_blank" rel="noopener noreferrer">
                  {link.url}
                </a>
              </p>
              <div>
                {link.tags && link.tags.map(tag => (
                  <span key={tag.id} className="tag">{tag.name}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default HomePage;