'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { Preset } from '@/lib/image-processor'
import { cn } from '@/lib/utils'

interface SettingsPanelProps {
  preset: Preset
  outputFormat: string
  onPresetChange: (preset: Preset) => void
  onFormatChange: (format: string) => void
}

const PRESETS: { key: Preset; label: string; description: string }[] = [
  { key: 'low', label: 'Low', description: 'Smallest file' },
  { key: 'medium', label: 'Medium', description: 'Balanced' },
  { key: 'high', label: 'High', description: 'Best quality' },
  { key: 'lossless', label: 'Lossless', description: 'No quality loss' },
]

export function SettingsPanel({
  preset,
  outputFormat,
  onPresetChange,
  onFormatChange,
}: SettingsPanelProps) {
  return (
    <div className="rounded-lg border border-border bg-card p-4 md:p-6">
      <h3 className="mb-4 text-sm font-medium text-foreground">Compression Settings</h3>

      <div className="space-y-6">
        {/* Quality Presets */}
        <div className="space-y-2">
          <Label className="text-sm text-muted-foreground">Quality</Label>
          <div className="grid grid-cols-2 gap-2">
            {PRESETS.map((p) => (
              <button
                key={p.key}
                onClick={() => onPresetChange(p.key)}
                className={cn(
                  'flex flex-col items-center gap-0.5 rounded-lg border px-3 py-3 text-center transition-colors',
                  preset === p.key
                    ? 'border-foreground bg-foreground text-background'
                    : 'border-border bg-secondary/50 text-foreground hover:border-foreground/30'
                )}
              >
                <span className="text-sm font-semibold">{p.label}</span>
                <span className={cn(
                  'text-xs',
                  preset === p.key ? 'text-background/70' : 'text-muted-foreground'
                )}>
                  {p.description}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Output Format */}
        <div className="space-y-2">
          <Label className="text-sm text-muted-foreground">Output Format</Label>
          <Select value={outputFormat} onValueChange={onFormatChange}>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="auto">Auto (best compression)</SelectItem>
              <SelectItem value="image/jpeg">JPEG</SelectItem>
              <SelectItem value="image/png">PNG</SelectItem>
              <SelectItem value="image/webp">WebP</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}
