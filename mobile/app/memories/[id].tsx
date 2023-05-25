import { useEffect, useState } from 'react'
import MemoryForm from '../../src/components/MemoryForm'
import { useRouter, useSearchParams } from 'expo-router'
import * as SecureStore from 'expo-secure-store'
import { api } from '../../src/lib/api'

interface Memory {
  id: string
  userId: string
  memoryDate: string
  coverUrl: string
  content: string
  isPublic: boolean
  createdAt: string
}

export default function MemoryDetails() {
  const { id } = useSearchParams()
  const router = useRouter()

  const [memory, setMemory] = useState<Memory | null>(null)

  async function handleSubmitMemory(
    memoryDate: Date,
    preview: string,
    isPublic: boolean,
    content: string,
  ) {
    const token = await SecureStore.getItemAsync('token')

    let coverUrl = ''

    if (preview && preview !== memory.coverUrl) {
      const uploadFormData = new FormData()

      uploadFormData.append('file', {
        uri: preview,
        name: 'image.png',
        type: 'image/png',
      } as any)

      const uploadResponse = await api.post('/upload', uploadFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      coverUrl = uploadResponse.data.fileUrl
    } else {
      coverUrl = memory.coverUrl
    }

    await api.put(
      `/memories/${memory.id}`,
      {
        memoryDate,
        content,
        isPublic,
        coverUrl,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )

    router.push('/memories')
  }

  async function loadMemory(id: string) {
    const token = await SecureStore.getItemAsync('token')

    const memoryResponse = await api.get(`/memories/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    setMemory(memoryResponse.data)
  }

  useEffect(() => {
    loadMemory(id as string)
  }, [id])

  return <MemoryForm memory={memory} handleSubmitMemory={handleSubmitMemory} />
}
