import imageCompression from 'browser-image-compression'

export type ImageFormat = 'image/png' | 'image/jpeg' | 'image/webp'

export type Preset = 'low' | 'medium' | 'high' | 'lossless'

export const PRESET_CONFIG = {
  low: {
    maxSizeMB: 0.3,
    maxWidthOrHeight: 1280,
    initialQuality: 0.5,
    maxIteration: 15,
  },
  medium: {
    maxSizeMB: 1,
    maxWidthOrHeight: 1920,
    initialQuality: 0.7,
    maxIteration: 10,
  },
  high: {
    maxSizeMB: 2,
    maxWidthOrHeight: 2560,
    initialQuality: 0.85,
    maxIteration: 10,
  },
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

async function hasAlphaChannel(file: File): Promise<boolean> {
  if (file.type === 'image/jpeg') return false

  return new Promise((resolve) => {
    const img = new Image()
    img.onload = () => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      if (!ctx) {
        URL.revokeObjectURL(img.src)
        resolve(false)
        return
      }

      // Sample at reduced resolution for speed
      const maxDim = 256
      const ratio = Math.min(maxDim / img.width, maxDim / img.height, 1)
      canvas.width = Math.round(img.width * ratio)
      canvas.height = Math.round(img.height * ratio)

      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
      const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data

      for (let i = 3; i < data.length; i += 4) {
        if (data[i] < 250) {
          URL.revokeObjectURL(img.src)
          resolve(true)
          return
        }
      }

      URL.revokeObjectURL(img.src)
      resolve(false)
    }
    img.onerror = () => {
      URL.revokeObjectURL(img.src)
      resolve(false)
    }
    img.src = URL.createObjectURL(file)
  })
}

export async function compressImage(
  file: File,
  preset: Preset,
  requestedFormat: string
): Promise<CompressResult> {
  const inputFormat = getOriginalFormat(file)

  // Resolve output format
  let outputFormat: ImageFormat
  if (requestedFormat === 'auto') {
    // Auto: alpha → WebP (preserves transparency), no alpha → JPEG (best compression)
    const hasAlpha = await hasAlphaChannel(file)
    outputFormat = hasAlpha ? 'image/webp' : 'image/jpeg'
  } else {
    outputFormat = requestedFormat as ImageFormat
    // Safety: if converting to JPEG from alpha-capable format, check for transparency
    if (outputFormat === 'image/jpeg' && inputFormat !== 'image/jpeg') {
      const hasAlpha = await hasAlphaChannel(file)
      if (hasAlpha) {
        outputFormat = 'image/webp'
      }
    }
  }

  // Lossless preset
  if (preset === 'lossless') {
    if (outputFormat === inputFormat) {
      return { blob: file, format: inputFormat }
    }
    // Format conversion at max quality
    const converted = await imageCompression(file, {
      maxSizeMB: Number.POSITIVE_INFINITY,
      useWebWorker: true,
      fileType: outputFormat,
      initialQuality: 1,
      alwaysKeepResolution: true,
    })
    return { blob: converted, format: outputFormat }
  }

  const config = PRESET_CONFIG[preset]

  const compressed = await imageCompression(file, {
    maxSizeMB: config.maxSizeMB,
    maxWidthOrHeight: config.maxWidthOrHeight,
    initialQuality: config.initialQuality,
    maxIteration: config.maxIteration,
    useWebWorker: true,
    fileType: outputFormat,
    ...(preset === 'high' ? { alwaysKeepResolution: true } : {}),
  })

  // Safety: if result is bigger, return original
  if (compressed.size >= file.size) {
    return { blob: file, format: inputFormat }
  }

  return { blob: compressed, format: outputFormat }
}

export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`
}
