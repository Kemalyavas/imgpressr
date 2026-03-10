'use client'

import { useState, useCallback } from 'react'
import { Download, Trash2, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Dropzone } from '@/components/dropzone'
import { ImagePreview } from '@/components/image-preview'
import { SettingsPanel } from '@/components/settings-panel'
import {
  ProcessedImage,
  ImageFormat,
  Preset,
  compressImage,
  generateId,
  getOriginalFormat,
  formatBytes,
  getCompressionPercentage,
  getFormatExtension,
} from '@/lib/image-processor'

interface ImageCompressorProps {
  defaultFormat?: string
  hideHeader?: boolean
}

export function ImageCompressor({ defaultFormat = 'same', hideHeader = false }: ImageCompressorProps) {
  const [images, setImages] = useState<ProcessedImage[]>([])
  const [preset, setPreset] = useState<Preset>('medium')
  const [outputFormat, setOutputFormat] = useState<string>(defaultFormat)
  const [isProcessing, setIsProcessing] = useState(false)
  const [progress, setProgress] = useState(0)

  const handleFilesSelected = useCallback((files: File[]) => {
    const newImages: ProcessedImage[] = files.map((file) => ({
      id: generateId(),
      originalFile: file,
      originalSize: file.size,
      originalUrl: URL.createObjectURL(file),
      compressedBlob: null,
      compressedSize: 0,
      compressedUrl: null,
      outputFormat: getOriginalFormat(file),
      preset,
      status: 'pending' as const,
    }))

    setImages((prev) => [...prev, ...newImages])
  }, [preset])

  const processImages = useCallback(async () => {
    const pendingImages = images.filter((img) => img.status === 'pending')
    if (pendingImages.length === 0) return

    setIsProcessing(true)
    setProgress(0)

    for (let i = 0; i < pendingImages.length; i++) {
      const image = pendingImages[i]

      setImages((prev) =>
        prev.map((img) =>
          img.id === image.id ? { ...img, status: 'processing' as const } : img
        )
      )

      try {
        const targetFormat: ImageFormat = outputFormat === 'same'
          ? getOriginalFormat(image.originalFile)
          : (outputFormat as ImageFormat)

        const result = await compressImage(image.originalFile, preset, targetFormat)
        const compressedUrl = URL.createObjectURL(result.blob)

        setImages((prev) =>
          prev.map((img) =>
            img.id === image.id
              ? {
                  ...img,
                  compressedBlob: result.blob,
                  compressedSize: result.blob.size,
                  compressedUrl,
                  outputFormat: result.format,
                  preset,
                  status: 'completed' as const,
                }
              : img
          )
        )
      } catch (error) {
        setImages((prev) =>
          prev.map((img) =>
            img.id === image.id
              ? {
                  ...img,
                  status: 'error' as const,
                  error: error instanceof Error ? error.message : 'Unknown error',
                }
              : img
          )
        )
      }

      setProgress(Math.round(((i + 1) / pendingImages.length) * 100))
    }

    setIsProcessing(false)
    setProgress(100)
  }, [images, preset, outputFormat])

  const handleRemove = useCallback((id: string) => {
    setImages((prev) => {
      const image = prev.find((img) => img.id === id)
      if (image) {
        URL.revokeObjectURL(image.originalUrl)
        if (image.compressedUrl) {
          URL.revokeObjectURL(image.compressedUrl)
        }
      }
      return prev.filter((img) => img.id !== id)
    })
  }, [])

  const handleClearAll = useCallback(() => {
    images.forEach((image) => {
      URL.revokeObjectURL(image.originalUrl)
      if (image.compressedUrl) {
        URL.revokeObjectURL(image.compressedUrl)
      }
    })
    setImages([])
    setProgress(0)
  }, [images])

  const handleDownload = useCallback((image: ProcessedImage) => {
    if (!image.compressedBlob) return

    const extension = getFormatExtension(image.outputFormat)
    const originalName = image.originalFile.name.replace(/\.[^.]+$/, '')
    const filename = `${originalName}_compressed.${extension}`

    const link = document.createElement('a')
    link.href = image.compressedUrl!
    link.download = filename
    link.click()
  }, [])

  const handleDownloadAll = useCallback(async () => {
    const completedImages = images.filter(
      (img) => img.status === 'completed' && img.compressedBlob
    )

    if (completedImages.length === 0) return

    if (completedImages.length === 1) {
      handleDownload(completedImages[0])
      return
    }

    const JSZip = (await import('jszip')).default
    const zip = new JSZip()

    completedImages.forEach((image) => {
      const extension = getFormatExtension(image.outputFormat)
      const originalName = image.originalFile.name.replace(/\.[^.]+$/, '')
      const filename = `${originalName}_compressed.${extension}`
      zip.file(filename, image.compressedBlob!)
    })

    const blob = await zip.generateAsync({ type: 'blob' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = 'compressed_images.zip'
    link.click()
    URL.revokeObjectURL(link.href)
  }, [images, handleDownload])

  const pendingCount = images.filter((img) => img.status === 'pending').length
  const completedCount = images.filter((img) => img.status === 'completed').length
  const totalOriginalSize = images.reduce((acc, img) => acc + img.originalSize, 0)
  const totalCompressedSize = images
    .filter((img) => img.status === 'completed')
    .reduce((acc, img) => acc + img.compressedSize, 0)

  return (
    <div className="space-y-6">
      {!hideHeader && (
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Image Compressor
          </h1>
          <p className="text-muted-foreground">
            Compress and convert images in your browser. Fast, free, and private.
          </p>
        </div>
      )}

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column - Settings */}
        <div className="lg:col-span-1">
          <SettingsPanel
            preset={preset}
            outputFormat={outputFormat}
            onPresetChange={setPreset}
            onFormatChange={setOutputFormat}
          />
        </div>

        {/* Right Column - Upload & Preview */}
        <div className="space-y-4 lg:col-span-2">
          <Dropzone onFilesSelected={handleFilesSelected} disabled={isProcessing} />

          {/* Action Bar */}
          {images.length > 0 && (
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-border bg-card p-3">
              <div className="flex flex-wrap items-center gap-3 text-sm">
                <span className="font-mono text-muted-foreground">
                  {images.length} {images.length === 1 ? 'file' : 'files'}
                </span>
                {completedCount > 0 && (
                  <>
                    <span className="text-muted-foreground">&bull;</span>
                    <span className="font-mono text-muted-foreground">
                      {formatBytes(totalOriginalSize)} &rarr; {formatBytes(totalCompressedSize)}
                    </span>
                    <span className="rounded bg-success/20 px-2 py-0.5 text-xs font-mono font-medium text-success">
                      -{getCompressionPercentage(totalOriginalSize, totalCompressedSize)}%
                    </span>
                  </>
                )}
              </div>

              <div className="flex items-center gap-2">
                {pendingCount > 0 && (
                  <Button
                    onClick={processImages}
                    disabled={isProcessing}
                    className="gap-2"
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        Compress {pendingCount} {pendingCount === 1 ? 'file' : 'files'}
                      </>
                    )}
                  </Button>
                )}

                {completedCount > 0 && (
                  <Button variant="secondary" onClick={handleDownloadAll} className="gap-2">
                    <Download className="h-4 w-4" />
                    {completedCount === 1 ? 'Download' : 'Download All'}
                  </Button>
                )}

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleClearAll}
                  className="text-muted-foreground hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {/* Progress Bar */}
          {isProcessing && (
            <div className="space-y-2 rounded-lg border border-border bg-card p-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Processing images...</span>
                <span className="font-mono text-foreground">{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          )}

          {/* Image Previews */}
          {images.length > 0 && (
            <div className="space-y-4">
              {images.map((image) => (
                <ImagePreview
                  key={image.id}
                  image={image}
                  onRemove={handleRemove}
                  onDownload={handleDownload}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="text-center text-xs text-muted-foreground">
        <p>
          All processing happens locally in your browser. Your images never leave your device.
        </p>
      </div>
    </div>
  )
}
