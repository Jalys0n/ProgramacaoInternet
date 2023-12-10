import { useState } from 'react';
import './formulario.css';


const formulario = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Formulário enviado:', formData);
  };

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
    </div>
  );
};

export default formulario;
