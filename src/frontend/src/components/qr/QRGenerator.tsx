import { useState, useEffect } from 'react';
import { QRCodeData, QRContentType } from '../../backend';
import ContentForm from './ContentForm';
import CustomizePanel from './CustomizePanel';
import QRCodePreview from './QRCodePreview';
import DownloadButton from './DownloadButton';
import SaveToHistoryButton from './SaveToHistoryButton';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { getDefaultSettings, QRSettings } from '../../lib/qr/defaults';

interface QRGeneratorProps {
  initialData?: QRCodeData | null;
  onGenerate?: () => void;
}

export default function QRGenerator({ initialData, onGenerate }: QRGeneratorProps) {
  const [content, setContent] = useState('');
  const [contentType, setContentType] = useState<QRContentType>(QRContentType.text);
  const [settings, setSettings] = useState<QRSettings>(getDefaultSettings());
  const [hasGenerated, setHasGenerated] = useState(false);

  useEffect(() => {
    if (initialData) {
      setContent(initialData.content);
      setContentType(initialData.contentType);
      setSettings({
        size: initialData.size ? Number(initialData.size) : getDefaultSettings().size,
        fgColor: initialData.color || getDefaultSettings().fgColor,
        bgColor: initialData.backgroundColor || getDefaultSettings().bgColor,
      });
      setHasGenerated(true);
    }
  }, [initialData]);

  const handleGenerate = (newContent: string, newType: QRContentType) => {
    setContent(newContent);
    setContentType(newType);
    setHasGenerated(true);
    onGenerate?.();
  };

  const handleReset = () => {
    setSettings(getDefaultSettings());
  };

  const currentQRData: QRCodeData | null = hasGenerated && content ? {
    content,
    contentType,
    size: BigInt(settings.size),
    color: settings.fgColor,
    backgroundColor: settings.bgColor,
    createdAt: BigInt(Date.now() * 1000000),
    lastModified: BigInt(Date.now() * 1000000),
  } : null;

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Content</CardTitle>
          </CardHeader>
          <CardContent>
            <ContentForm 
              onGenerate={handleGenerate}
              initialContent={content}
              initialType={contentType}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Customize</CardTitle>
          </CardHeader>
          <CardContent>
            <CustomizePanel
              settings={settings}
              onChange={setSettings}
              onReset={handleReset}
            />
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <QRCodePreview
              content={content}
              settings={settings}
              hasGenerated={hasGenerated}
            />
          </CardContent>
        </Card>

        {hasGenerated && content && (
          <Card>
            <CardHeader>
              <CardTitle>Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <DownloadButton content={content} settings={settings} />
              <Separator />
              <SaveToHistoryButton qrData={currentQRData} />
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
