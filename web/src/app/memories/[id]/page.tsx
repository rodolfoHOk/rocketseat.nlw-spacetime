import Link from 'next/link'
import { cookies } from 'next/headers'
import { ChevronLeft } from 'lucide-react'

import { api } from '@/lib/api'
import { MemoryForm } from '@/components/MemoryForm'

interface Memory {
  id: string
  userId: string
  coverUrl: string
  content: string
  isPublic: boolean
  createdAt: string
}

export default async function EditMemory({
  params,
}: {
  params: { id: string }
}) {
  const { id } = params
  const token = cookies().get('token')?.value
  const memoryResponse = await api.get<Memory>(`/memories/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  const memory = memoryResponse.data

  return (
    <div className="flex flex-1 flex-col gap-4 p-16">
      <Link
        href="/"
        className="flex items-center gap-1 text-sm text-gray-200 hover:text-gray-100"
      >
        <ChevronLeft className="h-4 w-4" />
        voltar à timeline
      </Link>

      <MemoryForm memory={memory} />
    </div>
  )
}
