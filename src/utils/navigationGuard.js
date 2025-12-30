export function setupNavigationGuard(navigate) {
  // Prevenir retroceso en páginas protegidas
  window.history.pushState(null, null, window.location.pathname);
  
  const handlePopState = () => {
    window.history.pushState(null, null, window.location.pathname);
  };

  window.addEventListener('popstate', handlePopState);

  // Retornar función para limpiar
  return () => {
    window.removeEventListener('popstate', handlePopState);
  };
}
