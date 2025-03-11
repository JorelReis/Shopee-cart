import React, { useState } from "react";
import "./Sidebar.css"; // Importando os estilos

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false); // Estado para abrir/fechar a sidebar

  return (
    <div>
      {/* 🔹 O botão agora acompanha a sidebar */}
      <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
        <button className="sidebar-toggle" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? "❌ Fechar" : "☰ Menu"} {/* Ícone de abrir/fechar */}
        </button>

        {/* 🔹 Seção do Perfil do Usuário */}
        <div className="sidebar-section profile-section">
          <h2>Perfil do Usuário</h2>
          <p>Nome: Jorel Reis</p>
          <p>Idade: 23 anos</p>
        </div>

        {/* 🔹 Seção da Lista de Produtos */}
        <div className="sidebar-section product-section">
          <h3>Lista de Produtos</h3>
          <ul>
            <li>Teclado Mecânico</li>
            <li>Mouse Gamer</li>
            <li>Monitor 24" Full HD</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
