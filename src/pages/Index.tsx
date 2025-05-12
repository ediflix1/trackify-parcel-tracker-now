
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import TrackingForm from '@/components/TrackingForm';
import TrackingResult from '@/components/TrackingResult';
import { useToast } from "@/components/ui/use-toast";
import { Package, Truck, MapPin } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const Index = () => {
  const { toast } = useToast();
  const location = useLocation();
  const [trackingCode, setTrackingCode] = useState<string | null>(null);

  useEffect(() => {
    // Parse URL params to get tracking code if provided
    const searchParams = new URLSearchParams(location.search);
    const trackingParam = searchParams.get('tracking');
    if (trackingParam) {
      setTrackingCode(trackingParam);
      toast({
        title: "Buscando informações",
        description: `Rastreando código ${trackingParam}...`,
        duration: 2000,
      });
    }
  }, [location.search, toast]);

  const handleTrackingSubmit = (code: string) => {
    setTrackingCode(code);
    toast({
      title: "Buscando informações",
      description: `Rastreando código ${code}...`,
      duration: 2000,
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <div className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {!trackingCode ? (
            <div className="py-12">
              <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-delivery-dark mb-4">Rastreamento de Encomendas</h1>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Rastreie suas encomendas de forma rápida e simples. Basta inserir o código de rastreamento abaixo.
                </p>
              </div>
              
              <TrackingForm onSubmit={handleTrackingSubmit} />
              
              <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white p-6 rounded-lg shadow-md text-center">
                  <div className="w-16 h-16 bg-delivery-light rounded-full flex items-center justify-center mx-auto mb-4">
                    <Package className="text-delivery-primary" size={24} />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Rastreamento em Tempo Real</h3>
                  <p className="text-gray-600">Acompanhe sua encomenda com atualizações detalhadas em tempo real.</p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md text-center">
                  <div className="w-16 h-16 bg-delivery-light rounded-full flex items-center justify-center mx-auto mb-4">
                    <Truck className="text-delivery-primary" size={24} />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Entrega Confiável</h3>
                  <p className="text-gray-600">Conte com nossa rede de entrega para receber sua encomenda com segurança.</p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md text-center">
                  <div className="w-16 h-16 bg-delivery-light rounded-full flex items-center justify-center mx-auto mb-4">
                    <MapPin className="text-delivery-primary" size={24} />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Cobertura Nacional</h3>
                  <p className="text-gray-600">Entregamos em todo o território nacional com eficiência e rapidez.</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="py-8">
              <h2 className="text-2xl font-semibold text-center mb-6">Resultado do Rastreamento</h2>
              <TrackingResult trackingCode={trackingCode} />
              
              <div className="mt-8 text-center">
                <button 
                  onClick={() => setTrackingCode(null)}
                  className="text-delivery-primary hover:underline"
                >
                  Rastrear outro pacote
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <footer className="bg-delivery-dark text-white py-6">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Package size={20} />
              <span className="text-xl font-bold">ExpressTrack</span>
            </div>
            <p className="text-sm opacity-75">© {new Date().getFullYear()} ExpressTrack. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
