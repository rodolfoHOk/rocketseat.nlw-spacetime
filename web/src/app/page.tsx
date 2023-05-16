import { Button } from '../components/Button'

export default function Home() {
  return (
    <div className="h-screen bg-zinc-900 p-6">
      <h1 className="text-4xl font-bold text-zinc-50">Sua capsula do tempo</h1>

      <div className="mt-4 flex flex-col gap-2">
        <Button>Botão 1</Button>
        <Button>Botão 2</Button>
        <Button>Botão 3</Button>
      </div>
    </div>
  )
}
