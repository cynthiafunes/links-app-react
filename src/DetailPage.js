import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchLinkById, addComment, addVote } from './api';

function DetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [link, setLink] = useState(null);
  const [userName, setUserName] = useState('');
  const [commentText, setCommentText] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadLink = async () => {
      try {
        setLoading(true);
        const data = await fetchLinkById(id);
        setLink(data);
        setError(null);
      } catch (err) {
        setError('Error al cargar los detalles del enlace.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadLink();
  }, [id]);

  const handleVote = async () => {
    try {
      await addVote(id);
      const updatedLink = await fetchLinkById(id);
      setLink(updatedLink);
      alert('Voto registrado correctamente');
    } catch (err) {
      alert('Error al registrar el voto');
      console.error(err);
    }
  };

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (!userName.trim() || !commentText.trim()) {
      alert('Por favor completa todos los campos');
      return;
    }

    try {
      await addComment(id, { userName, text: commentText });
      const updatedLink = await fetchLinkById(id);
      setLink(updatedLink);
      setUserName('');
      setCommentText('');
      alert('Comentario añadido correctamente');
    } catch (err) {
      alert('Error al añadir el comentario');
      console.error(err);
    }
  };

  if (loading) return <p>Cargando detalles del enlace...</p>;
  if (error) return <p className="error">{error}</p>;
  if (!link) return <p>No se encontró el enlace.</p>;

  const totalVotes = link.votes ? link.votes.reduce((sum, vote) => sum + vote.value, 0) : 0;

  return (
    <div className="link-detail">
      <h2>{link.title}</h2>
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
      
      <div className="vote-section">
        <h3>Votar por este enlace</h3>
        <p>Votos actuales: <strong>{totalVotes}</strong></p>
        <button onClick={handleVote}>Me gusta</button>
      </div>
      
      <div className="comments-section">
        <h3>Comentarios</h3>
        
        {link.comments && link.comments.length > 0 ? (
          link.comments.map(comment => (
            <div key={comment.id} className="comment">
              <p>{comment.text}</p>
              <small>Por: {comment.userName}</small>
            </div>
          ))
        ) : (
          <p>Aún no hay comentarios.</p>
        )}
        
        <h4>Añadir un Comentario</h4>
        <form onSubmit={handleSubmitComment}>
          <div>
            <label htmlFor="userName">Tu Nombre:</label>
            <input
              type="text"
              id="userName"
              value={userName}
              onChange={e => setUserName(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="commentText">Comentario:</label>
            <textarea
              id="commentText"
              value={commentText}
              onChange={e => setCommentText(e.target.value)}
              required
            />
          </div>
          <button type="submit">Enviar</button>
        </form>
      </div>

      <button onClick={() => navigate('/')}>Volver a la lista</button>
    </div>
  );
}

export default DetailPage;