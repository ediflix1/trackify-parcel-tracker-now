
// Serviço simples de autenticação
interface User {
  name: string;
  username: string;
}

// Dados específicos para o usuário mencionado
const mockUser: User = {
  name: "Patrick Hernand",
  username: "patrick"
};

// Login pré-definido conforme solicitado
const mockLogin = {
  username: "patrick hernand",
  password: "01320313612"
};

export const authService = {
  login: (username: string, password: string): Promise<User | null> => {
    return new Promise((resolve) => {
      // Simular uma chamada de API com delay
      setTimeout(() => {
        const isValidUser = 
          username.toLowerCase() === mockLogin.username.toLowerCase() && 
          password === mockLogin.password;
        
        if (isValidUser) {
          localStorage.setItem("user", JSON.stringify(mockUser));
          resolve(mockUser);
        } else {
          resolve(null);
        }
      }, 800);
    });
  },
  
  logout: (): void => {
    localStorage.removeItem("user");
  },
  
  getCurrentUser: (): User | null => {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      return JSON.parse(userStr);
    }
    return null;
  },
  
  isAuthenticated: (): boolean => {
    return localStorage.getItem("user") !== null;
  }
};
