import { useQRCodeHistory } from '../../hooks/useQueries';
import { QRCodeData } from '../../backend';
import HistoryItemRow from './HistoryItemRow';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, History, AlertCircle } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

interface HistoryViewProps {
  onItemSelect: (item: QRCodeData) => void;
}

export default function HistoryView({ onItemSelect }: HistoryViewProps) {
  const { data: history, isLoading, isError } = useQRCodeHistory();

  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-16">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    );
  }

  if (isError) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Failed to load history. Please try again later.
        </AlertDescription>
      </Alert>
    );
  }

  if (!history || history.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-16 text-muted-foreground">
          <History className="h-16 w-16 mb-4 opacity-20" />
          <p className="text-sm">No saved QR codes yet</p>
          <p className="text-xs mt-2">Generate and save QR codes to see them here</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <History className="h-5 w-5" />
          Saved QR Codes ({history.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[600px] pr-4">
          <div className="space-y-3">
            {history.map((item, index) => (
              <HistoryItemRow
                key={index}
                item={item}
                onSelect={() => onItemSelect(item)}
              />
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
