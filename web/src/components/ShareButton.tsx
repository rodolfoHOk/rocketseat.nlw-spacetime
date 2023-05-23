'use client'

import { ToastContainer, Zoom, toast } from 'react-toastify'
import { Share2 } from 'lucide-react'
import 'react-toastify/dist/ReactToastify.css'

export function ShareButton() {
  function onShare() {
    navigator.clipboard.writeText(window.location.href)

    toast('Copiado para área de transferência')
  }

  return (
    <>
      <button
        type="button"
        onClick={onShare}
        className="flex items-center justify-center gap-2 self-end rounded-full bg-violet-500 px-5 py-3 font-alt text-sm uppercase leading-none text-black transition-colors duration-200 hover:bg-violet-600"
      >
        <Share2 className="h-4 w-4" />
        Compartilhar
      </button>

      <ToastContainer
        position="top-right"
        autoClose={4000}
        pauseOnHover
        theme="dark"
        transition={Zoom}
      />
    </>
  )
}
