'use client'

import { Slider } from '@/components/ui/slider'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { ImageFormat } from '@/lib/image-processor'

interface SettingsPanelProps {
  quality: number
  outputFormat: string
  onQualityChange: (quality: number) => void
  onFormatChange: (format: string) => void
}

export function SettingsPanel({
  quality,
  outputFormat,
  onQualityChange,
  onFormatChange,
}: SettingsPanelProps) {
  return (
    <div className="rounded-lg border border-border bg-card p-4 md:p-6">
      <h3 className="mb-4 text-sm font-medium text-foreground">Compression Settings</h3>
      
      <div className="space-y-6">
        {/* Quality Slider */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-sm text-muted-foreground">Quality</Label>
            <span className="rounded bg-secondary px-2 py-0.5 text-sm font-mono font-medium text-foreground">
              {quality}%
            </span>
          </div>
          <Slider
            value={[quality]}
            onValueChange={([value]) => onQualityChange(value)}
            min={1}
            max={100}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground font-mono">
            <span>1%</span>
            <span>100%</span>
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
              <SelectItem value="same">Same as original</SelectItem>
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
