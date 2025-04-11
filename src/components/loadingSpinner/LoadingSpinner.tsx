import { cn } from "@/lib/utils"

interface LoadingSpinnerProps {
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

export default function LoadingSpinner({ className, size = 'md' }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'h-4 w-4 border-2',
    md: 'h-8 w-8 border-4',
    lg: 'h-12 w-12 border-4'
  }

  return (
    <div className={cn("flex justify-center items-center min-h-screen", className)}>
      <div
        className={cn(
          "animate-spin rounded-full border-solid border-t-transparent",
          sizeClasses[size],
          "border-gray-200"
        )}
        style={{
          borderTopColor: '#E46A10'
        }}
      />
    </div>
  )
}

export function FullPageSpinner() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white/80 z-50">
      <LoadingSpinner size="lg" />
    </div>
  )
}