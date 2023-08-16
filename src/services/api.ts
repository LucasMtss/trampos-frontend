import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:3000',
  });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('@trampos:token'); // Obtenha o token do localStorage

  const isExcludedRoute = config.url?.includes('login');

  if (token && !isExcludedRoute) {
    config.headers.Authorization = `Bearer ${token}`; // Adicione o token ao cabeçalho de autorização
  }
  else {
    if(!isExcludedRoute)
      window.location.replace('/login');
    
  }
  return config;
});

export default api;