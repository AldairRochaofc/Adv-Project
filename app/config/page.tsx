import EmailConfig from "@/components/email-config"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function ConfigPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="mb-6">
          <Button variant="outline" size="sm" asChild>
            <Link href="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar ao Site
            </Link>
          </Button>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-4">Configurações</h1>
          <p className="text-slate-600">Gerencie as configurações do seu site</p>
        </div>

        <div className="grid gap-6">
          <div className="flex justify-center">
            <EmailConfig />
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Como Funciona</CardTitle>
              <CardDescription>Entenda o sistema de configuração de email</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h3 className="font-semibold text-blue-900 mb-2">📧 Email Dinâmico</h3>
                  <p className="text-blue-800 text-sm">
                    O email de destino é salvo em um arquivo de configuração e pode ser alterado a qualquer momento.
                  </p>
                </div>

                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <h3 className="font-semibold text-green-900 mb-2">🔄 Atualização Instantânea</h3>
                  <p className="text-green-800 text-sm">
                    As mudanças são aplicadas imediatamente, sem necessidade de reiniciar o servidor.
                  </p>
                </div>

                <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                  <h3 className="font-semibold text-purple-900 mb-2">💾 Persistência</h3>
                  <p className="text-purple-800 text-sm">
                    A configuração é salva em arquivo local e mantida entre reinicializações.
                  </p>
                </div>

                <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                  <h3 className="font-semibold text-amber-900 mb-2">🔒 Validação</h3>
                  <p className="text-amber-800 text-sm">
                    Todos os emails são validados antes de serem salvos para garantir formato correto.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Páginas Disponíveis</CardTitle>
              <CardDescription>Links úteis para gerenciar seu site</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3">
                <Button variant="outline" asChild>
                  <Link href="/">🏠 Página Principal</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/test-form">🧪 Testar Formulário</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/setup">⚙️ Configurar Gmail</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/api/contact">📊 Status da API</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
