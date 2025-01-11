// app/admin/layout.jsx
import Navbar from './(shared)/Navbar';

export default function AdminLayout({ children }) {
  return (
    <div className="admin-layout">
      {/* Navbar o cualquier otro componente común para /admin */}
      <Navbar /> 
      {/* Aquí se renderizarán todas las páginas dentro de /admin */}
      <div className="admin-container">
        {children}
      </div>
    </div>
  );
}
