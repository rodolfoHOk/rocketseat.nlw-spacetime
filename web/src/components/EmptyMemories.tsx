export function EmptyMemories() {
  return (
    <div className="flex flex-1 items-center justify-center">
      <p className="w-[360px] text-center leading-relaxed">
        Você ainda não registrou nenhuma lembrança, comece a{' '}
        <a
          className="underline transition-colors duration-200 hover:text-gray-50"
          href=""
        >
          criar agora
        </a>
        !
      </p>
    </div>
  )
}
