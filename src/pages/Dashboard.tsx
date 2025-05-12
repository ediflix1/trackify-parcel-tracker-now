import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { authService } from '@/services/authService';
import { Package, Truck, MapPin, Clock } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { format } from 'date-fns';

interface Shipment {
  id: string;
  trackingCode: string;
  description: string;
  status: string;
  origin: string;
  destination: string;
  updatedAt: Date;
  estimatedDelivery: Date;
  additionalInfo?: string;
}

// Data específica de entrega - 20/05/2024
const specificDate = new Date(2024, 4, 20); // Mês é baseado em zero (0-11), então 4 = maio

// Dados fictícios de envios - apenas uma encomenda conforme solicitado
const mockShipments: Shipment[] = [
  {
    id: '1',
    trackingCode: 'AO5467860076BRN',
    description: 'Pacote Eletrônico',
    status: 'Em trânsito',
    origin: 'Natal, RN',
    destination: 'Uberlândia, MG',
    updatedAt: new Date(),
    estimatedDelivery: specificDate,
    additionalInfo: 'Objeto foi postado de Natal/RN para Uberlândia, Minas Gerais'
  }
];

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [user, setUser] = useState(authService.getCurrentUser());
  
  useEffect(() => {
    if (!authService.isAuthenticated()) {
      navigate('/login');
      return;
    }
    
    // Simular carregamento de dados
    setTimeout(() => {
      setShipments(mockShipments);
    }, 500);
  }, [navigate]);
  
  const handleTrackShipment = (trackingCode: string) => {
    // Redirecionar para a página inicial com o código de rastreamento
    navigate(`/?tracking=${trackingCode}`);
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <div className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="bg-gradient-to-r from-delivery-primary to-delivery-secondary text-white p-8 rounded-lg shadow-md mb-6">
            <h1 className="text-2xl font-bold">Bem-vindo, {user?.name}!</h1>
            <p className="opacity-80">Confira suas encomendas e rastreamentos recentes.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="border-l-4 border-l-delivery-primary">
              <CardContent className="p-6">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-500">Encomendas</p>
                    <p className="text-2xl font-bold">{shipments.length}</p>
                  </div>
                  <div className="p-3 bg-delivery-light rounded-full">
                    <Package className="text-delivery-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-l-4 border-l-yellow-500">
              <CardContent className="p-6">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-500">Em trânsito</p>
                    <p className="text-2xl font-bold">
                      {shipments.filter(s => s.status === 'Em trânsito').length}
                    </p>
                  </div>
                  <div className="p-3 bg-yellow-100 rounded-full">
                    <Truck className="text-yellow-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-l-4 border-l-green-500">
              <CardContent className="p-6">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-500">Entregues</p>
                    <p className="text-2xl font-bold">
                      {shipments.filter(s => s.status === 'Entregue').length}
                    </p>
                  </div>
                  <div className="p-3 bg-green-100 rounded-full">
                    <MapPin className="text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-l-4 border-l-delivery-accent">
              <CardContent className="p-6">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-500">Pendentes</p>
                    <p className="text-2xl font-bold">
                      {shipments.filter(s => s.status === 'Aguardando postagem').length}
                    </p>
                  </div>
                  <div className="p-3 bg-orange-100 rounded-full">
                    <Clock className="text-orange-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader className="border-b">
              <CardTitle>Minhas Encomendas</CardTitle>
            </CardHeader>
            
            <CardContent className="p-0">
              {shipments.length > 0 ? (
                <div className="divide-y">
                  {shipments.map((shipment) => (
                    <div key={shipment.id} className="p-6">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-delivery-primary">{shipment.trackingCode}</span>
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              shipment.status === 'Em trânsito' 
                                ? 'bg-blue-100 text-blue-800' 
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {shipment.status}
                            </span>
                          </div>
                          <p className="text-lg font-semibold">{shipment.description}</p>
                          <p className="text-sm text-gray-500">
                            De: {shipment.origin} • Para: {shipment.destination}
                          </p>
                          {shipment.additionalInfo && (
                            <p className="text-sm text-blue-600 font-medium">
                              {shipment.additionalInfo}
                            </p>
                          )}
                          <p className="text-sm text-gray-500">
                            Atualizado em: {format(shipment.updatedAt, 'dd/MM/yyyy')} às {format(shipment.updatedAt, 'HH:mm')}
                          </p>
                        </div>
                        
                        <div className="flex flex-col gap-2">
                          <p className="text-sm">
                            Entrega prevista: <span className="font-medium">{format(shipment.estimatedDelivery, 'dd/MM/yyyy')}</span>
                          </p>
                          <Button 
                            variant="outline" 
                            className="border-delivery-primary text-delivery-primary hover:bg-delivery-light"
                            onClick={() => handleTrackShipment(shipment.trackingCode)}
                          >
                            Rastrear
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center text-gray-500">
                  <p>Você não possui encomendas registradas no momento.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
      
      <footer className="bg-delivery-dark text-white py-6">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm opacity-75">© {new Date().getFullYear()} ExpressTrack. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
