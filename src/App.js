import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    async function loadingRepositories() {
      const response = await api.get('/repositories');
      setRepositories(response.data);
    }
    loadingRepositories();
  }, []);

  async function handleAddRepository() {
    const response = await api.post('/repositories', {
      title: 'Test Create',
      url: 'http://localhost:8080/reposmaneiro',
      techs: ['ReactJS', 'Node JS', 'Java'],
    });
    setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);
    setRepositories(repositories.filter(repository => repository.id !== id));
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id} >
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
