import { ReactNode } from 'react'

interface ButtonProps {
  children: ReactNode
}

export function Button({ children }: ButtonProps) {
  return (
    <button className="w-24 rounded bg-violet-600 px-3 py-2 text-white transition-colors duration-200 hover:bg-violet-500">
      {children}
    </button>
  )
}
