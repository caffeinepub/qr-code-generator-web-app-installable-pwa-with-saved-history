import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import { useSaveQRCode } from '../../hooks/useQueries';
import { QRCodeData } from '../../backend';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Save, Lock } from 'lucide-react';
import { toast } from 'sonner';

interface SaveToHistoryButtonProps {
  qrData: QRCodeData | null;
}

export default function SaveToHistoryButton({ qrData }: SaveToHistoryButtonProps) {
  const { identity } = useInternetIdentity();
  const { mutate: saveQRCode, isPending } = useSaveQRCode();

  const isAuthenticated = !!identity;

  const handleSave = () => {
    if (!qrData) return;

    saveQRCode(qrData, {
      onSuccess: () => {
        toast.success('QR code saved to history!');
      },
      onError: (error) => {
        console.error('Save error:', error);
        toast.error('Failed to save QR code');
      },
    });
  };

  if (!isAuthenticated) {
    return (
      <Alert>
        <Lock className="h-4 w-4" />
        <AlertDescription>
          Sign in to save QR codes to your history
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <Button 
      onClick={handleSave} 
      disabled={!qrData || isPending}
      variant="secondary"
      className="w-full gap-2"
    >
      <Save className="h-4 w-4" />
      {isPending ? 'Saving...' : 'Save to History'}
    </Button>
  );
}
