'use client'

import { X, Download, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'
import { ProcessedImage, formatBytes, getCompressionPercentage, getFormatExtension } from '@/lib/image-processor'

interface ImagePreviewProps {
  image: ProcessedImage
  onRemove: (id: string) => void
  onDownload: (image: ProcessedImage) => void
}

export function ImagePreview({ image, onRemove, onDownload }: ImagePreviewProps) {
  const compressionPercentage = image.compressedSize > 0 
    ? getCompressionPercentage(image.originalSize, image.compressedSize)
    : 0
  
  const isSmaller = image.compressedSize < image.originalSize
  
  return (
    <div className="group relative overflow-hidden rounded-lg border border-border bg-card">
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Original Image */}
        <div className="relative aspect-video overflow-hidden border-b border-border md:border-b-0 md:border-r bg-secondary/30">
          <img
            src={image.originalUrl}
            alt="Original"
            className="h-full w-full object-contain"
          />
          <div className="absolute left-2 top-2 rounded bg-background/90 px-2 py-1 text-xs font-mono backdrop-blur-sm">
            Original
          </div>
          <div className="absolute bottom-2 left-2 rounded bg-background/90 px-2 py-1 text-xs font-mono backdrop-blur-sm text-muted-foreground">
            {formatBytes(image.originalSize)}
          </div>
        </div>
        
        {/* Compressed Image or Processing State */}
        <div className="relative aspect-video overflow-hidden bg-secondary/30">
          {image.status === 'processing' && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-background/80 backdrop-blur-sm">
              <div className="w-32">
                <Progress value={50} className="h-1.5" />
              </div>
              <p className="text-sm text-muted-foreground">Processing...</p>
            </div>
          )}
          
          {image.status === 'error' && (
            <div className="absolute inset-0 flex items-center justify-center bg-destructive/10">
              <p className="text-sm text-destructive">{image.error || 'Error processing image'}</p>
            </div>
          )}
          
          {image.status === 'completed' && image.compressedUrl && (
            <>
              <img
                src={image.compressedUrl}
                alt="Compressed"
                className="h-full w-full object-contain"
              />
              <div className="absolute left-2 top-2 rounded bg-background/90 px-2 py-1 text-xs font-mono backdrop-blur-sm">
                Compressed
              </div>
              <div className="absolute bottom-2 left-2 rounded bg-background/90 px-2 py-1 text-xs font-mono backdrop-blur-sm text-muted-foreground">
                {formatBytes(image.compressedSize)}
              </div>
            </>
          )}
          
          {image.status === 'pending' && (
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-sm text-muted-foreground">Pending...</p>
            </div>
          )}
        </div>
      </div>
      
      {/* Footer with stats and actions */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border bg-background p-3">
        <div className="flex flex-wrap items-center gap-3">
          <span className="truncate text-sm font-medium max-w-[200px]">
            {image.originalFile.name}
          </span>
          
          {image.status === 'completed' && (
            <div className="flex items-center gap-2 text-sm">
              <span className="font-mono text-muted-foreground">
                {formatBytes(image.originalSize)}
              </span>
              <ArrowRight className="h-3 w-3 text-muted-foreground" />
              <span className="font-mono text-foreground">
                {formatBytes(image.compressedSize)}
              </span>
              <span className={cn(
                'rounded px-2 py-0.5 text-xs font-mono font-medium',
                isSmaller ? 'bg-success/20 text-success' : 'bg-muted text-muted-foreground'
              )}>
                {isSmaller ? `-${compressionPercentage}%` : `+${Math.abs(compressionPercentage)}%`}
              </span>
            </div>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          {image.status === 'completed' && (
            <Button
              size="sm"
              variant="secondary"
              onClick={() => onDownload(image)}
              className="gap-1.5"
            >
              <Download className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Download</span>
            </Button>
          )}
          <Button
            size="sm"
            variant="ghost"
            onClick={() => onRemove(image.id)}
            className="text-muted-foreground hover:text-destructive"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
