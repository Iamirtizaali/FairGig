// ─── Auth Form Types ──────────────────────────────────────────────────────────

export interface SignInFormData {
  email: string
  password: string
  rememberMe: boolean
}

export interface SignUpFormData {
  fullName: string
  email: string
  phone: string
  password: string
  confirmPassword: string
  categories: string[]
  city: string
  zone: string
  platforms: string[]
}

export interface ForgotPasswordFormData {
  email: string
}

export interface ResetPasswordFormData {
  password: string
  confirmPassword: string
}

// ─── Auth State ───────────────────────────────────────────────────────────────

export type AuthStep = 1 | 2 | 3

export type PasswordStrength = 0 | 1 | 2 | 3 | 4

export interface PasswordStrengthInfo {
  score: PasswordStrength
  label: string
  color: string
}

// ─── Constants ────────────────────────────────────────────────────────────────

export const GIG_CATEGORIES = [
  { id: 'delivery',     label: 'Delivery Rider' },
  { id: 'ride-hailing', label: 'Ride-Hailing Driver' },
  { id: 'food-courier', label: 'Food Courier' },
  { id: 'freelancer',   label: 'Freelancer' },
  { id: 'domestic',     label: 'Domestic Worker' },
]

export const GIG_PLATFORMS = [
  { id: 'careem', label: 'Careem' },
  { id: 'uber', label: 'Uber' },
  { id: 'bykea', label: 'Bykea' },
  { id: 'foodpanda', label: 'Foodpanda' },
  { id: 'indrive', label: 'inDrive' },
  { id: 'other', label: 'Other' },
]

export const PAKISTAN_CITIES = [
  'Karachi', 'Lahore', 'Islamabad', 'Rawalpindi',
  'Faisalabad', 'Multan', 'Peshawar', 'Quetta',
]
