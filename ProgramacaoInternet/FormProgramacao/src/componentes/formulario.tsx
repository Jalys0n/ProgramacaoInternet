import { useState, useEffect } from 'react';
import './formulario.css';

interface Usuario {
  id: number;
  name: string;
  email: string;
}

const Formulario: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });

  const [usuarios, setUsuarios] = useState<Usuario[]>([]);

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/demo/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(formData),
      });

      if (response.ok) {
        console.log('Usuário adicionado com sucesso!');
        alert('Usuário adicionado com sucesso!'); 
        fetchUsuarios();
      } else {
        console.error('Erro ao adicionar usuário');
      }
    } catch (error) {
      console.error('Erro de rede', error);
    }
  };

  const fetchUsuarios = async () => {
    try {
      const response = await fetch('http://localhost:8080/demo/all');
      if (response.ok) {
        const data = await response.json();
        setUsuarios(data);
      } else {
        console.error('Erro ao obter usuários');
      }
    } catch (error) {
      console.error('Erro de rede', error);
    }
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  return (
    <div className="formulario-container">
      <form onSubmit={submitForm}>
        <label htmlFor="name">Nome:</label>
        <input
          type="text"
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
  
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
  
        <button type="submit">Enviar</button>
      </form>
      <div className="tabela">
        <h1>Usuários adicionados:</h1>
        {usuarios.map((usuario) => (
          <div key={usuario.id}>
            <p>Nome: {usuario.name}</p>
            <p>Email: {usuario.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Formulario;
