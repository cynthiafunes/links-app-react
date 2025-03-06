import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Home from './HomePage';
import Detail from './DetailPage';
import AddLink from './AddLinkPage';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="header">
          <h1>Links App</h1>
          <nav>
            <Link to="/" className="nav-button">Inicio</Link>
            <Link to="/add" className="nav-button">Añadir Link</Link>
          </nav>
        </header>
        <main className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/link/:id" element={<Detail />} />
            <Route path="/add" element={<AddLink />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
