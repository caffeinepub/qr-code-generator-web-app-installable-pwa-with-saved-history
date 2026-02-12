import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { QRSettings } from '../../lib/qr/defaults';
import { toast } from 'sonner';

interface DownloadButtonProps {
  content: string;
  settings: QRSettings;
}

export default function DownloadButton({ content, settings }: DownloadButtonProps) {
  const handleDownload = () => {
    try {
      const canvas = document.getElementById('qr-code-canvas') as HTMLCanvasElement;
      if (!canvas) {
        toast.error('QR code not found. Please generate a QR code first.');
        return;
      }

      canvas.toBlob((blob) => {
        if (!blob) {
          toast.error('Failed to generate image');
          return;
        }

        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `qr-code-${Date.now()}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        
        toast.success('QR code downloaded successfully!');
      });
    } catch (error) {
      console.error('Download error:', error);
      toast.error('Failed to download QR code');
    }
  };

  return (
    <Button onClick={handleDownload} variant="default" className="w-full gap-2">
      <Download className="h-4 w-4" />
      Download PNG
    </Button>
  );
}
