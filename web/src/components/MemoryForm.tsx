'use client'

import { FormEvent, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Cookie from 'js-cookie'
import { ImagePlus } from 'lucide-react'

import { MediaPicker } from './MediaPicker'
import { api } from '@/lib/api'

interface Memory {
  id?: string
  userId: string
  memoryDate: string
  coverUrl: string
  content: string
  isPublic: boolean
  createdAt: string
}

interface MemoryFormProps {
  memory?: Memory
}

interface File extends Blob {
  name: string
  lastModified: number
  webkitRelativePath: string
  size: number
  type: string
}

export function MemoryForm({ memory }: MemoryFormProps) {
  const router = useRouter()

  const [memoryForm, setMemoryForm] = useState<Memory>({
    id: '',
    userId: '',
    memoryDate: '',
    coverUrl: '',
    content: '',
    isPublic: false,
    createdAt: '',
  })

  async function handleSaveMemory(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)

    const fileToUpload = formData.get('coverUrl') as File

    let coverUrl = ''

    if (fileToUpload && fileToUpload.size > 0 && fileToUpload.name !== '') {
      const uploadFormData = new FormData()
      uploadFormData.set('file', fileToUpload)

      const uploadResponse = await api.post('/upload', uploadFormData)

      coverUrl = uploadResponse.data.fileUrl
    }

    const token = Cookie.get('token')

    if (memory) {
      await api.put(
        `/memories/${memory.id}`,
        {
          coverUrl: coverUrl || memoryForm.coverUrl,
          memoryDate: new Date(memoryForm.memoryDate).toISOString(),
          content: memoryForm.content,
          isPublic: memoryForm.isPublic,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
    } else {
      await api.post(
        '/memories',
        {
          coverUrl,
          memoryDate: new Date(memoryForm.memoryDate).toISOString(),
          content: memoryForm.content,
          isPublic: memoryForm.isPublic,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
    }

    router.push('/')
  }

  useEffect(() => {
    if (memory) {
      setMemoryForm({
        ...memory,
        memoryDate: new Date(memory.memoryDate).toISOString().split('T')[0],
      })
    }
  }, [memory])

  return (
    <form className="flex flex-1 flex-col gap-2" onSubmit={handleSaveMemory}>
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <label
          htmlFor="isPublic"
          className="flex cursor-pointer items-center gap-1.5 text-sm text-gray-200 hover:text-gray-100"
        >
          <input
            type="date"
            name="memoryDate"
            id="memoryDate"
            defaultValue={memoryForm.memoryDate}
            onChange={(event) =>
              setMemoryForm((previous) => ({
                ...previous,
                memoryDate: event.target.value,
              }))
            }
            className="rounded-lg border-gray-400 bg-gray-700 text-sm text-gray-200"
          />
        </label>
        <div className="flex flex-row items-center justify-between gap-4">
          <label
            htmlFor="media"
            className="flex cursor-pointer items-center gap-1.5 text-sm text-gray-200 hover:text-gray-100"
          >
            <ImagePlus className="h-4 w-4" />
            Anexar mídia
          </label>

          <label
            htmlFor="isPublic"
            className="flex cursor-pointer items-center gap-1.5 text-sm text-gray-200 hover:text-gray-100"
          >
            <input
              type="checkbox"
              name="isPublic"
              id="isPublic"
              value="true"
              checked={memoryForm.isPublic}
              onChange={(event) =>
                setMemoryForm((previous) => ({
                  ...previous,
                  isPublic: !memoryForm?.isPublic,
                }))
              }
              className="h-4 w-4 rounded border-gray-400 bg-gray-700 text-purple-500"
            />
            Tornar memória pública
          </label>
        </div>
      </div>

      <MediaPicker coverUrl={memoryForm.coverUrl} />

      <textarea
        name="content"
        spellCheck="false"
        className="w-full flex-1 resize-none rounded border-0 bg-transparent p-0 text-lg leading-relaxed text-gray-100 placeholder:text-gray-400 focus:ring-0"
        placeholder="Fique livre para adicionar fotos, vídeos e relatos sobre essa experiência que você quer lembrar para sempre."
        value={memoryForm.content}
        onChange={(event) =>
          setMemoryForm((previous) => ({
            ...previous,
            content: event.target.value,
          }))
        }
      />

      <button
        type="submit"
        className="inline-block self-end rounded-full bg-green-500 px-5 py-3 font-alt text-sm uppercase leading-none text-black transition-colors duration-200 hover:bg-green-600"
      >
        {memory ? 'Atualizar' : 'Salvar'}
      </button>
    </form>
  )
}
