import { QRCodeData, QRContentType } from '../../backend';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { ExternalLink, Trash2, Calendar } from 'lucide-react';
import { format } from 'date-fns';

interface HistoryItemRowProps {
  item: QRCodeData;
  onSelect: () => void;
}

export default function HistoryItemRow({ item, onSelect }: HistoryItemRowProps) {
  const contentTypeLabels: Record<QRContentType, string> = {
    [QRContentType.text]: 'Text',
    [QRContentType.url]: 'URL',
    [QRContentType.email]: 'Email',
    [QRContentType.phoneNumber]: 'Phone',
    [QRContentType.sms]: 'SMS',
    [QRContentType.wifi]: 'WiFi',
    [QRContentType.contactInfo]: 'Contact',
    [QRContentType.geoLocation]: 'Location',
    [QRContentType.event]: 'Event',
  };

  const truncateContent = (content: string, maxLength: number = 50) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  };

  const formatDate = (timestamp: bigint) => {
    try {
      const date = new Date(Number(timestamp) / 1000000);
      return format(date, 'MMM d, yyyy h:mm a');
    } catch {
      return 'Unknown date';
    }
  };

  return (
    <Card className="p-4 hover:bg-accent/50 transition-colors">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-primary/10 text-primary">
              {contentTypeLabels[item.contentType]}
            </span>
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {formatDate(item.createdAt)}
            </span>
          </div>
          <p className="text-sm font-medium truncate">{truncateContent(item.content)}</p>
          <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
            <span>Size: {item.size?.toString() || '256'}px</span>
            {item.color && (
              <span className="flex items-center gap-1">
                <span 
                  className="w-3 h-3 rounded-full border border-border" 
                  style={{ backgroundColor: item.color }}
                />
                {item.color}
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            onClick={onSelect}
            variant="outline"
            size="sm"
            className="gap-1"
          >
            <ExternalLink className="h-3 w-3" />
            Open
          </Button>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="ghost" size="sm">
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete QR Code?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete this QR code from your history.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </Card>
  );
}
