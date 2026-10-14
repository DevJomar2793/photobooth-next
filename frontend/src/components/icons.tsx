export interface IconProps {
  className?: string
}

export function CameraIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 48 40" fill="none" aria-hidden="true">
      <path d="M5 10.5h8l3-5h16l3 5h8a3 3 0 0 1 3 3V34a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3V13.5a3 3 0 0 1 3-3Z" fill="currentColor" />
      <circle cx="24" cy="24" r="10" fill="white" />
      <circle className="camera-lens" cx="24" cy="24" r="6" fill="currentColor" />
      <circle cx="39" cy="15" r="2" fill="white" />
    </svg>
  )
}

export function OutlineCameraIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 48 40" fill="none" aria-hidden="true">
      <path d="M5 10.5h8l3-5h16l3 5h8a3 3 0 0 1 3 3V34a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3V13.5a3 3 0 0 1 3-3Z" stroke="currentColor" strokeWidth="2.8" strokeLinejoin="round" />
      <circle cx="24" cy="24" r="8" stroke="currentColor" strokeWidth="2.8" />
      <circle cx="39" cy="15" r="1.8" fill="currentColor" />
    </svg>
  )
}

export function WandIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 42 42" fill="none" aria-hidden="true">
      <path d="m7 34 20-20 6 6-20 20H7v-6Z" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
      <path d="m24 17 6 6M10 6v7M6.5 9.5h7M32 4v8M28 8h8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  )
}

export function DownloadIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 42 42" fill="none" aria-hidden="true">
      <path d="M21 5v22m0 0-8-8m8 8 8-8M7 29v7h28v-7" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function ArrowIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="m9 5 7 7-7 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function ExitIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <path d="M12 4H5v20h7M16 8l6 6-6 6m6-6H9" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function GridIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 44 44" fill="none" aria-hidden="true">
      <rect x="4" y="4" width="15" height="15" rx="2" stroke="currentColor" strokeWidth="3" />
      <rect x="25" y="4" width="15" height="15" rx="2" stroke="currentColor" strokeWidth="3" />
      <rect x="4" y="25" width="15" height="15" rx="2" stroke="currentColor" strokeWidth="3" />
      <rect x="25" y="25" width="15" height="15" rx="2" stroke="currentColor" strokeWidth="3" />
    </svg>
  )
}

export function ImageIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 44 44" fill="none" aria-hidden="true">
      <rect x="4" y="7" width="36" height="30" rx="3" stroke="currentColor" strokeWidth="3" />
      <circle cx="15" cy="17" r="3" fill="currentColor" />
      <path d="m7 33 10-10 7 7 5-5 8 8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function StudentsIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 44 44" fill="none" aria-hidden="true">
      <circle cx="22" cy="14" r="6" stroke="currentColor" strokeWidth="3" />
      <circle cx="9" cy="18" r="4" stroke="currentColor" strokeWidth="3" />
      <circle cx="35" cy="18" r="4" stroke="currentColor" strokeWidth="3" />
      <path d="M11 37v-4c0-6 5-10 11-10s11 4 11 10v4M2 36v-3c0-4 3-7 7-7M42 36v-3c0-4-3-7-7-7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  )
}

export function ShieldIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 44 44" fill="none" aria-hidden="true">
      <path d="M22 3 38 9v11c0 10-6 17-16 21C12 37 6 30 6 20V9l16-6Z" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
      <path d="m14 22 5 5 11-12" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function HeartIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 44 40" fill="none" aria-hidden="true">
      <path d="M22 36 6 21C-2 13 3 3 12 4c5 0 8 4 10 8 2-4 5-8 10-8 9-1 14 9 6 17L22 36Z" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function GalleryIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 42 42" fill="none" aria-hidden="true">
      <rect x="4" y="6" width="34" height="30" rx="3" stroke="currentColor" strokeWidth="3" />
      <circle cx="14" cy="16" r="3" fill="currentColor" />
      <path d="m7 32 9-9 6 6 5-5 8 8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function SearchIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2.2" />
      <path d="m16 16 5 5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  )
}

export function CheckIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="m5 12 4 4L19 6" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function EyeIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 28 22" fill="none" aria-hidden="true">
      <path d="M2 11s4-8 12-8 12 8 12 8-4 8-12 8S2 11 2 11Z" fill="currentColor" />
      <circle cx="14" cy="11" r="4" fill="white" />
      <circle cx="14" cy="11" r="2" fill="currentColor" />
    </svg>
  )
}

export function CalendarIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="2" />
      <path d="M7 3v4m10-4v4M3 10h18M8 14h2m4 0h2m-8 4h2m4 0h2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

export function InfoIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
      <path d="M12 11v6m0-10h.01" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  )
}

export function TrashIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 7h16M9 7V4h6v3m3 0-1 14H7L6 7m4 4v6m4-6v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function ClockIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
      <path d="M12 7v6l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function LightbulbIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M8.5 16c-1.6-1.2-2.5-3-2.5-5a6 6 0 1 1 12 0c0 2-.9 3.8-2.5 5-.8.6-1.2 1.2-1.3 2h-4.4c-.1-.8-.5-1.4-1.3-2Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M10 21h4M4 4l2 2m14-2-2 2M12 1v2M2 11h2m16 0h2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

export function BackIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="m11 5-7 7 7 7M4 12h16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function RefreshIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M20 7v5h-5M4 17v-5h5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M18.5 9A7 7 0 0 0 6 6.5L4 9m2 6a7 7 0 0 0 12 2.5L20 15" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
