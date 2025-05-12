
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Search } from 'lucide-react';

interface TrackingFormProps {
  onSubmit: (trackingCode: string) => void;
}

const TrackingForm: React.FC<TrackingFormProps> = ({ onSubmit }) => {
  const [trackingCode, setTrackingCode] = useState('');
  const [isError, setIsError] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!trackingCode.trim()) {
      setIsError(true);
      return;
    }
    
    setIsError(false);
    onSubmit(trackingCode.trim());
  };
  
  return (
    <Card className="w-full max-w-md mx-auto shadow-lg border-t-4 border-t-delivery-accent">
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <h2 className="text-xl font-medium text-center">Rastreie sua encomenda</h2>
            <p className="text-sm text-center text-gray-500">
              Digite o código de rastreamento para verificar o status da sua entrega
            </p>
          </div>
          
          <div className="relative">
            <Input
              placeholder="Digite o código de rastreamento (ex: AO5467860076BRN)"
              value={trackingCode}
              onChange={(e) => {
                setTrackingCode(e.target.value.toUpperCase());
                if (isError) setIsError(false);
              }}
              className={`pl-10 py-6 text-lg ${
                isError ? 'border-red-500 focus-visible:ring-red-500' : ''
              }`}
            />
            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
          </div>
          
          {isError && (
            <p className="text-sm text-red-500">Por favor, digite um código de rastreamento válido.</p>
          )}
          
          <Button type="submit" className="w-full py-6 bg-delivery-primary hover:bg-delivery-secondary">
            Rastrear Pacote
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default TrackingForm;
