import type { PhotoTemplateId } from '../types/PhotoBoothTypes'

export interface PhotoTemplateOption {
  id: PhotoTemplateId
  name: string
  title: string
}

export const photoTemplateOptions: PhotoTemplateOption[] = [
  { id: 'classic', name: 'Classic', title: 'Good Vibes' },
  { id: 'best-friends', name: 'Best Friends', title: 'Best Friends' },
  { id: 'school-life', name: 'School Life', title: 'School Life' },
  { id: 'film-strip', name: 'Film Strip', title: 'Good Memories' },
  { id: 'cute-doodles', name: 'Cute Doodles', title: 'Capture Good Vibes!' },
  { id: 'colorful', name: 'Colorful', title: 'Friends Forever' },
  { id: 'notebook', name: 'Notebook', title: 'School Memories' },
  { id: 'premium', name: 'Premium', title: 'Make It Special' },
]
