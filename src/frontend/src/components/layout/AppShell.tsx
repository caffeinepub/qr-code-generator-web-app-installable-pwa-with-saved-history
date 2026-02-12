import { ReactNode } from 'react';
import LoginButton from '../auth/LoginButton';
import { SiGithub } from 'react-icons/si';
import { Heart } from 'lucide-react';

interface AppShellProps {
  children: ReactNode;
}

export default function AppShell({ children }: AppShellProps) {
  const currentYear = new Date().getFullYear();
  const appIdentifier = typeof window !== 'undefined' 
    ? encodeURIComponent(window.location.hostname) 
    : 'qr-generator-app';

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img 
              src="/assets/generated/qr-logo.dim_512x512.png" 
              alt="QR Generator Logo" 
              className="h-10 w-10"
            />
            <div>
              <h1 className="text-xl font-bold tracking-tight">QR Generator</h1>
              <p className="text-xs text-muted-foreground">Create & Save QR Codes</p>
            </div>
          </div>
          <LoginButton />
        </div>
      </header>

      <main className="flex-1">
        {children}
      </main>

      <footer className="border-t border-border bg-card/30 py-6 mt-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <span>© {currentYear} QR Generator</span>
            </div>
            <div className="flex items-center gap-2">
              <span>Built with</span>
              <Heart className="h-4 w-4 text-red-500 fill-red-500" />
              <span>using</span>
              <a 
                href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appIdentifier}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium hover:text-foreground transition-colors"
              >
                caffeine.ai
              </a>
            </div>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-foreground transition-colors"
            >
              <SiGithub className="h-4 w-4" />
              <span>Open Source</span>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
