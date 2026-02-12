import { useRef, useEffect, useState } from 'react';
import { QRSettings } from '../../lib/qr/defaults';
import { QrCode, AlertCircle } from 'lucide-react';
import { generateQRCodeToCanvas } from '../../lib/qr/generator';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface QRCodePreviewProps {
  content: string;
  settings: QRSettings;
  hasGenerated: boolean;
}

export default function QRCodePreview({ content, settings, hasGenerated }: QRCodePreviewProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!hasGenerated || !content || !canvasRef.current) return;

    const canvas = canvasRef.current;
    setError(null);

    generateQRCodeToCanvas(canvas, content, {
      width: settings.size,
      height: settings.size,
      color: {
        dark: settings.fgColor,
        light: settings.bgColor,
      },
    }).catch((err) => {
      console.error('QR generation error:', err);
      setError('Failed to generate QR code. Please try again.');
    });
  }, [content, settings, hasGenerated]);

  if (!hasGenerated || !content) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
        <QrCode className="h-16 w-16 mb-4 opacity-20" />
        <p className="text-sm">Your QR code will appear here</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-8">
      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
      <div 
        className="bg-white p-6 rounded-lg shadow-sm border border-border"
        style={{ 
          width: 'fit-content',
        }}
      >
        <canvas
          ref={canvasRef}
          id="qr-code-canvas"
          className="block"
          width={settings.size}
          height={settings.size}
        />
      </div>
      <p className="text-xs text-muted-foreground mt-4 text-center max-w-md truncate">
        {content}
      </p>
    </div>
  );
}
