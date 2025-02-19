import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
}

export const hideEmail = (email: string): string => {
  const [user, domain] = email.split('@')
  if (!user || !domain) return 'Email inválido'

  const hiddenUser = user[0] + '*'.repeat(Math.max(user.length - 2, 2))
  const domainParts = domain.split('.')

  if (domainParts.length < 2) return 'Email inválido'

  const hiddenDomain =
    domainParts[0][0] +
    '*'.repeat(Math.max(domainParts[0].length - 2, 2)) +
    '.' +
    domainParts.slice(1).join('.')

  return `${hiddenUser}@${hiddenDomain}`
}
