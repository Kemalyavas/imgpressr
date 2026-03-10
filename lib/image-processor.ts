export type ImageFormat = 'image/png' | 'image/jpeg' | 'image/webp'

export type Preset = 'low' | 'medium' | 'high' | 'lossless'

export const PRESET_CONFIG = {
  low: { quality: 0.4, label: 'Low', estimate: '~80%' },
  medium: { quality: 0.7, label: 'Medium', estimate: '~60%' },
  high: { quality: 0.85, label: 'High', estimate: '~30%' },
  lossless: { quality: 1.0, label: 'Lossless', estimate: '~5%' },
} as const

export interface CompressResult {
  blob: Blob
  format: ImageFormat
}

export interface ProcessedImage {
  id: string
  originalFile: File
  originalSize: number
  originalUrl: string
  compressedBlob: Blob | null
  compressedSize: number
  compressedUrl: string | null
  outputFormat: ImageFormat
  preset: Preset
  status: 'pending' | 'processing' | 'completed' | 'error'
  error?: string
}

export function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`
}

export function getCompressionPercentage(original: number, compressed: number): number {
  if (original === 0) return 0
  return Math.round(((original - compressed) / original) * 100)
}

export function getFormatExtension(mimeType: ImageFormat): string {
  switch (mimeType) {
    case 'image/png': return 'png'
    case 'image/jpeg': return 'jpg'
    case 'image/webp': return 'webp'
    default: return 'jpg'
  }
}

export function getOriginalFormat(file: File): ImageFormat {
  if (file.type === 'image/png') return 'image/png'
  if (file.type === 'image/webp') return 'image/webp'
  return 'image/jpeg'
}

function canvasCompress(file: File, quality: number, format: ImageFormat): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = 'anonymous'

    img.onload = () => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      if (!ctx) { reject(new Error('Failed to get canvas context')); return }

      canvas.width = img.width
      canvas.height = img.height
      ctx.drawImage(img, 0, 0)

      canvas.toBlob(
        (blob) => {
          URL.revokeObjectURL(img.src)
          blob ? resolve(blob) : reject(new Error('Failed to compress image'))
        },
        format,
        quality
      )
    }

    img.onerror = () => {
      URL.revokeObjectURL(img.src)
      reject(new Error('Failed to load image'))
    }

    img.src = URL.createObjectURL(file)
  })
}

export async function compressImage(
  file: File,
  preset: Preset,
  requestedFormat: ImageFormat
): Promise<CompressResult> {
  const inputFormat = getOriginalFormat(file)
  const config = PRESET_CONFIG[preset]

  // Lossless: return original file unchanged
  if (preset === 'lossless') {
    return { blob: file, format: requestedFormat === 'image/png' ? inputFormat : requestedFormat }
  }

  // Determine actual output format
  // PNG output can't be compressed by canvas — auto-convert to WebP (supports transparency)
  let actualFormat = requestedFormat
  if (actualFormat === 'image/png') {
    actualFormat = 'image/webp'
  }

  // Compress with canvas
  const blob = await canvasCompress(file, config.quality, actualFormat)

  // Safety: if result is bigger than original, return original file
  if (blob.size >= file.size) {
    return { blob: file, format: inputFormat }
  }

  return { blob, format: actualFormat }
}

export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`
}
