import Link from 'next/link'

export function EmptyMemories() {
  return (
    <div className="flex flex-1 items-center justify-center p-16">
      <p className="w-[360px] text-center leading-relaxed">
        Você ainda não registrou nenhuma lembrança, comece a{' '}
        <Link
          className="underline transition-colors duration-200 hover:text-gray-50"
          href="/memories/new"
        >
          criar agora
        </Link>
        !
      </p>
    </div>
  )
}
