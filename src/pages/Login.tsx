
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from "@/hooks/use-toast";
import { authService } from '@/services/authService';
import { Package } from 'lucide-react';
import Navbar from '@/components/Navbar';

const Login: React.FC = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      const user = await authService.login(username, password);
      
      if (user) {
        toast({
          title: "Login bem-sucedido",
          description: `Bem-vindo de volta, ${user.name}!`,
          duration: 3000,
        });
        navigate('/dashboard');
      } else {
        setError('Nome de usuário ou senha inválidos');
      }
    } catch (error) {
      setError('Ocorreu um erro durante o login. Tente novamente.');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <div className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-xl">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center mb-2">
              <Package size={28} className="text-delivery-primary" />
            </div>
            <CardTitle className="text-2xl">Acesso ao Sistema</CardTitle>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="username" className="text-sm font-medium">
                  Nome de Usuário
                </label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Digite seu nome de usuário"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="h-12"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium">
                  Senha
                </label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Digite sua senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="h-12"
                />
              </div>
              
              {error && (
                <div className="p-3 bg-red-50 text-red-600 text-sm rounded-md">
                  {error}
                </div>
              )}
              
              <Button
                type="submit"
                className="w-full h-12 bg-delivery-primary hover:bg-delivery-secondary"
                disabled={isLoading}
              >
                {isLoading ? "Processando..." : "Entrar"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
      
      <footer className="bg-delivery-dark text-white py-6">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm opacity-75">© {new Date().getFullYear()} ExpressTrack. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default Login;
