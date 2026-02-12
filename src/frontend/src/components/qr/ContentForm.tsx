import { useState, useEffect } from 'react';
import { QRContentType } from '../../backend';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { QrCode, AlertCircle } from 'lucide-react';

interface ContentFormProps {
  onGenerate: (content: string, type: QRContentType) => void;
  initialContent?: string;
  initialType?: QRContentType;
}

export default function ContentForm({ onGenerate, initialContent = '', initialType = QRContentType.text }: ContentFormProps) {
  const [content, setContent] = useState(initialContent);
  const [contentType, setContentType] = useState<QRContentType>(initialType);
  const [error, setError] = useState('');

  useEffect(() => {
    setContent(initialContent);
    setContentType(initialType);
  }, [initialContent, initialType]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!content.trim()) {
      setError('Please enter some content to generate a QR code');
      return;
    }

    onGenerate(content.trim(), contentType);
  };

  const contentTypeOptions = [
    { value: QRContentType.text, label: 'Plain Text' },
    { value: QRContentType.url, label: 'URL / Website' },
    { value: QRContentType.email, label: 'Email Address' },
    { value: QRContentType.phoneNumber, label: 'Phone Number' },
    { value: QRContentType.sms, label: 'SMS Message' },
    { value: QRContentType.wifi, label: 'WiFi Network' },
    { value: QRContentType.contactInfo, label: 'Contact Info (vCard)' },
    { value: QRContentType.geoLocation, label: 'Geo Location' },
    { value: QRContentType.event, label: 'Calendar Event' },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="contentType">Content Type</Label>
        <Select value={contentType} onValueChange={(v) => setContentType(v as QRContentType)}>
          <SelectTrigger id="contentType">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {contentTypeOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="content">Content</Label>
        {contentType === QRContentType.text ? (
          <Textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Enter text to encode..."
            rows={4}
            className="resize-none"
          />
        ) : (
          <Input
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={
              contentType === QRContentType.url ? 'https://example.com' :
              contentType === QRContentType.email ? 'email@example.com' :
              contentType === QRContentType.phoneNumber ? '+1234567890' :
              'Enter content...'
            }
          />
        )}
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Button type="submit" className="w-full gap-2">
        <QrCode className="h-4 w-4" />
        Generate QR Code
      </Button>
    </form>
  );
}
