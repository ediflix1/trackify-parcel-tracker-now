
// ExpressTrack initialization script
// This script loads the React application

document.addEventListener('DOMContentLoaded', () => {
  console.log('ExpressTrack initialized');
  
  // Check if we're on the root path or need to redirect
  const currentPath = window.location.pathname;
  
  if (currentPath === '/' || currentPath === '/index.html') {
    // We're on the root path, the React app will handle routing
    console.log('Loading React app...');
  } else {
    // For direct access to other routes, we need to ensure React router handles it
    console.log(`Accessing route: ${currentPath}`);
  }
});

// Import the main React entry point
import('/src/main.tsx')
  .then(() => {
    console.log('React app loaded successfully');
  })
  .catch(error => {
    console.error('Failed to load React app:', error);
    document.getElementById('root').innerHTML = `
      <div style="padding: 20px; text-align: center;">
        <h2>Não foi possível carregar o ExpressTrack</h2>
        <p>Por favor, tente novamente mais tarde ou contate o suporte.</p>
      </div>
    `;
  });
