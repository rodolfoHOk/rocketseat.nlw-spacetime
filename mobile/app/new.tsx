import { useRouter } from 'expo-router'
import * as SecureStore from 'expo-secure-store'

import MemoryForm from '../src/components/MemoryForm'
import { api } from '../src/lib/api'

export default function NewMemory() {
  const router = useRouter()

  async function handleSubmitMemory(
    memoryDate: Date,
    preview: string,
    isPublic: boolean,
    content: string,
  ) {
    const token = await SecureStore.getItemAsync('token')

    let coverUrl = ''

    if (preview) {
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
    }

    await api.post(
      '/memories',
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

  return <MemoryForm handleSubmitMemory={handleSubmitMemory} />
}
