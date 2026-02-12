import { useState } from 'react';
import { useInternetIdentity } from './hooks/useInternetIdentity';
import { useGetCallerUserProfile } from './hooks/useQueries';
import AppShell from './components/layout/AppShell';
import ProfileSetupDialog from './components/auth/ProfileSetupDialog';
import QRGenerator from './components/qr/QRGenerator';
import HistoryView from './components/history/HistoryView';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { QRCodeData } from './backend';

export default function App() {
  const { identity } = useInternetIdentity();
  const { data: userProfile, isLoading: profileLoading, isFetched } = useGetCallerUserProfile();
  const [activeTab, setActiveTab] = useState<'generator' | 'history'>('generator');
  const [selectedHistoryItem, setSelectedHistoryItem] = useState<QRCodeData | null>(null);

  const isAuthenticated = !!identity;
  const showProfileSetup = isAuthenticated && !profileLoading && isFetched && userProfile === null;

  const handleHistoryItemSelect = (item: QRCodeData) => {
    setSelectedHistoryItem(item);
    setActiveTab('generator');
  };

  const handleNewQRGenerated = () => {
    setSelectedHistoryItem(null);
  };

  return (
    <AppShell>
      <ProfileSetupDialog open={showProfileSetup} />
      
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'generator' | 'history')} className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
            <TabsTrigger value="generator">Generator</TabsTrigger>
            <TabsTrigger value="history" disabled={!isAuthenticated}>
              History {!isAuthenticated && '🔒'}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="generator" className="mt-0">
            <QRGenerator 
              initialData={selectedHistoryItem}
              onGenerate={handleNewQRGenerated}
            />
          </TabsContent>

          <TabsContent value="history" className="mt-0">
            {isAuthenticated ? (
              <HistoryView onItemSelect={handleHistoryItemSelect} />
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                Please sign in to view your saved QR codes.
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </AppShell>
  );
}
