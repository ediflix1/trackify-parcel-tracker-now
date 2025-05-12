
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, MapPin, Package, Truck } from 'lucide-react';
import { format } from 'date-fns';

interface TrackingResultProps {
  trackingCode: string;
}

// Função para criar dados fictícios de rastreamento com base no código
const getTrackingData = (code: string) => {
  // Data e hora atuais
  const currentDate = new Date();
  
  // Caso específico para o código mencionado
  if (code === 'AO5467860076BRN') {
    // Data específica de entrega - 20/05/2024
    const specificDate = new Date(2024, 4, 20); // Mês é baseado em zero (0-11), então 4 = maio
    
    return {
      status: 'Em trânsito',
      origin: 'Centro de Distribuição - Natal, RN',
      destination: 'Uberlândia, Minas Gerais',
      estimatedDelivery: specificDate,
      updates: [
        {
          status: 'Objeto postado',
          location: 'Agência dos Correios - Natal, RN',
          date: currentDate,
          time: format(currentDate, 'HH:mm'),
          description: 'Objeto foi postado de Natal/RN para Uberlândia, Minas Gerais'
        }
      ]
    };
  }
  
  // Para outros códigos, gerar dados aleatórios
  return {
    status: 'Processando',
    origin: 'Centro de Distribuição - Localidade',
    destination: 'Endereço de destino',
    estimatedDelivery: new Date(currentDate.getTime() + 7 * 24 * 60 * 60 * 1000), // 7 dias a partir de hoje
    updates: [
      {
        status: 'Objeto em processamento',
        location: 'Centro de Distribuição',
        date: currentDate,
        time: format(currentDate, 'HH:mm'),
        description: 'Objeto em processamento'
      }
    ]
  };
};

const TrackingResult: React.FC<TrackingResultProps> = ({ trackingCode }) => {
  const trackingData = getTrackingData(trackingCode);
  
  return (
    <div className="w-full max-w-3xl mx-auto space-y-6">
      <Card className="shadow-lg">
        <CardHeader className="bg-delivery-light">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <div>
              <p className="text-sm text-gray-500">Código de Rastreamento</p>
              <CardTitle className="text-delivery-primary text-xl md:text-2xl">{trackingCode}</CardTitle>
            </div>
            <div className="px-4 py-2 bg-delivery-primary text-white rounded-md inline-flex items-center">
              <span className="font-medium">{trackingData.status}</span>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="flex items-start space-x-3">
              <div className="p-3 bg-delivery-light rounded-full">
                <Package className="text-delivery-primary" size={20} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Origem</p>
                <p className="font-medium">{trackingData.origin}</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="p-3 bg-delivery-light rounded-full">
                <MapPin className="text-delivery-primary" size={20} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Destino</p>
                <p className="font-medium">{trackingData.destination}</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="p-3 bg-delivery-light rounded-full">
                <Clock className="text-delivery-primary" size={20} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Data estimada de entrega</p>
                <p className="font-medium">{format(trackingData.estimatedDelivery, 'dd/MM/yyyy')}</p>
              </div>
            </div>
          </div>
          
          <h3 className="text-lg font-semibold mb-4">Atualizações</h3>
          
          <div className="space-y-6">
            {trackingData.updates.map((update, index) => (
              <div key={index} className="flex">
                <div className="mr-4 relative">
                  <div className="w-10 h-10 rounded-full bg-delivery-primary flex items-center justify-center">
                    <Truck className="text-white" size={20} />
                  </div>
                  {index < trackingData.updates.length - 1 && (
                    <div className="absolute top-10 left-1/2 w-0.5 h-16 bg-gray-200 -translate-x-1/2"></div>
                  )}
                </div>
                
                <div className="pb-6">
                  <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                    <p className="font-semibold text-delivery-dark">{update.status}</p>
                    <p className="text-sm text-gray-500">
                      {format(update.date, 'dd/MM/yyyy')} às {update.time}
                    </p>
                  </div>
                  <p className="text-gray-600">{update.location}</p>
                  <p className="text-gray-700 mt-1 font-medium">{update.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TrackingResult;
