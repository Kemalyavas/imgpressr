'use client'

import { useCallback, useState } from 'react'
import { Upload, ImageIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface DropzoneProps {
  onFilesSelected: (files: File[]) => void
  disabled?: boolean
}

export function Dropzone({ onFilesSelected, disabled }: DropzoneProps) {
  const [isDragging, setIsDragging] = useState(false)

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (!disabled) {
      setIsDragging(true)
    }
  }, [disabled])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
    
    if (disabled) return
    
    const files = Array.from(e.dataTransfer.files).filter(file =>
      file.type.startsWith('image/')
    )
    
    if (files.length > 0) {
      onFilesSelected(files)
    }
  }, [onFilesSelected, disabled])

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []).filter(file =>
      file.type.startsWith('image/')
    )
    
    if (files.length > 0) {
      onFilesSelected(files)
    }
    
    e.target.value = ''
  }, [onFilesSelected])

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={cn(
        'relative flex flex-col items-center justify-center gap-4 rounded-lg border-2 border-dashed p-8 md:p-12 transition-all duration-200',
        isDragging 
          ? 'border-primary bg-primary/5 scale-[1.01]' 
          : 'border-border hover:border-muted-foreground/50',
        disabled && 'opacity-50 cursor-not-allowed'
      )}
    >
      <div className={cn(
        'flex h-16 w-16 items-center justify-center rounded-full transition-colors',
        isDragging ? 'bg-primary/10' : 'bg-secondary'
      )}>
        {isDragging ? (
          <Upload className="h-8 w-8 text-primary" />
        ) : (
          <ImageIcon className="h-8 w-8 text-muted-foreground" />
        )}
      </div>
      
      <div className="text-center">
        <p className="text-lg font-medium text-foreground">
          {isDragging ? 'Drop images here' : 'Drag & drop images'}
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          or click to browse files
        </p>
      </div>
      
      <p className="text-xs text-muted-foreground font-mono">
        PNG, JPG, WebP supported
      </p>
      
      <input
        type="file"
        accept="image/png,image/jpeg,image/webp"
        multiple
        onChange={handleFileInput}
        disabled={disabled}
        className="absolute inset-0 cursor-pointer opacity-0"
      />
    </div>
  )
}
