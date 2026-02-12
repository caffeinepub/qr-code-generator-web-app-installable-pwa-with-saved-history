import { QRSettings } from '../../lib/qr/defaults';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { RotateCcw } from 'lucide-react';

interface CustomizePanelProps {
  settings: QRSettings;
  onChange: (settings: QRSettings) => void;
  onReset: () => void;
}

export default function CustomizePanel({ settings, onChange, onReset }: CustomizePanelProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="size">Size: {settings.size}px</Label>
        </div>
        <Slider
          id="size"
          min={128}
          max={512}
          step={32}
          value={[settings.size]}
          onValueChange={([value]) => onChange({ ...settings, size: value })}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="fgColor">Foreground Color</Label>
          <div className="flex gap-2">
            <Input
              id="fgColor"
              type="color"
              value={settings.fgColor}
              onChange={(e) => onChange({ ...settings, fgColor: e.target.value })}
              className="h-10 w-16 p-1 cursor-pointer"
            />
            <Input
              type="text"
              value={settings.fgColor}
              onChange={(e) => onChange({ ...settings, fgColor: e.target.value })}
              className="flex-1 font-mono text-sm"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="bgColor">Background Color</Label>
          <div className="flex gap-2">
            <Input
              id="bgColor"
              type="color"
              value={settings.bgColor}
              onChange={(e) => onChange({ ...settings, bgColor: e.target.value })}
              className="h-10 w-16 p-1 cursor-pointer"
            />
            <Input
              type="text"
              value={settings.bgColor}
              onChange={(e) => onChange({ ...settings, bgColor: e.target.value })}
              className="flex-1 font-mono text-sm"
            />
          </div>
        </div>
      </div>

      <Button onClick={onReset} variant="outline" className="w-full gap-2">
        <RotateCcw className="h-4 w-4" />
        Reset to Defaults
      </Button>
    </div>
  );
}
