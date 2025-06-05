"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Copy, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export default function SetupPage() {
  const [copiedStep, setCopiedStep] = useState<number | null>(null)

  const copyToClipboard = (text: string, step: number) => {
    navigator.clipboard.writeText(text)
    setCopiedStep(step)
    setTimeout(() => setCopiedStep(null), 2000)
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-4">Configuração do Email</h1>
          <p className="text-slate-600">Siga os passos abaixo para configurar o envio de emails com Nodemailer</p>
        </div>

        <div className="grid gap-6">
          {/* Passo 1 */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Badge className="bg-blue-500">Passo 1</Badge>
                <CardTitle>Ativar Verificação em 2 Etapas</CardTitle>
              </div>
              <CardDescription>Configure a segurança da sua conta Google</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ol className="list-decimal list-inside space-y-2 text-sm">
                <li>Acesse sua conta Google</li>
                <li>Vá em "Segurança" → "Verificação em duas etapas"</li>
                <li>Siga as instruções para ativar</li>
              </ol>
              <Button variant="outline" size="sm" asChild>
                <a href="https://myaccount.google.com/security" target="_blank" rel="noreferrer">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Abrir Configurações
                </a>
              </Button>
            </CardContent>
          </Card>

          {/* Passo 2 */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Badge className="bg-green-500">Passo 2</Badge>
                <CardTitle>Gerar Senha de Aplicativo</CardTitle>
              </div>
              <CardDescription>Crie uma senha específica para o aplicativo</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ol className="list-decimal list-inside space-y-2 text-sm">
                <li>Acesse o gerador de senhas de aplicativo</li>
                <li>Selecione "Aplicativo" → "Outro (nome personalizado)"</li>
                <li>Digite "Landing Page Advogado"</li>
                <li>Copie a senha gerada (16 caracteres)</li>
              </ol>
              <Button variant="outline" size="sm" asChild>
                <a href="https://myaccount.google.com/apppasswords" target="_blank" rel="noreferrer">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Gerar Senha
                </a>
              </Button>
            </CardContent>
          </Card>

          {/* Passo 3 */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Badge className="bg-purple-500">Passo 3</Badge>
                <CardTitle>Configurar Variáveis de Ambiente</CardTitle>
              </div>
              <CardDescription>Adicione as credenciais no seu projeto</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-slate-600">
                Adicione estas variáveis no seu arquivo <code className="bg-slate-100 px-1 rounded">.env.local</code>:
              </p>

              <div className="space-y-3">
                <div className="bg-slate-900 text-green-400 p-4 rounded-lg font-mono text-sm">
                  <div className="flex items-center justify-between">
                    <span>GMAIL_USER=seu-email@gmail.com</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard("GMAIL_USER=seu-email@gmail.com", 1)}
                    >
                      {copiedStep === 1 ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>

                <div className="bg-slate-900 text-green-400 p-4 rounded-lg font-mono text-sm">
                  <div className="flex items-center justify-between">
                    <span>GMAIL_APP_PASSWORD=sua-senha-de-16-caracteres</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard("GMAIL_APP_PASSWORD=sua-senha-de-16-caracteres", 2)}
                    >
                      {copiedStep === 2 ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                <p className="text-yellow-800 text-sm">
                  <strong>⚠️ Importante:</strong> Substitua "seu-email@gmail.com" pelo seu email real e
                  "sua-senha-de-16-caracteres" pela senha gerada no Passo 2.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Passo 4 */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Badge className="bg-amber-500">Passo 4</Badge>
                <CardTitle>Testar Configuração</CardTitle>
              </div>
              <CardDescription>Verifique se tudo está funcionando</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ol className="list-decimal list-inside space-y-2 text-sm">
                <li>Reinicie o servidor de desenvolvimento</li>
                <li>Acesse a página de teste do formulário</li>
                <li>Preencha e envie um teste</li>
                <li>Verifique se o email chegou em aldairmurilo000@gmail.com</li>
              </ol>
              <Button variant="outline" size="sm" asChild>
                <a href="/test-form">Testar Formulário</a>
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 p-6 bg-green-50 border border-green-200 rounded-lg">
          <h3 className="font-semibold text-green-900 mb-4 flex items-center">
            <CheckCircle className="w-5 h-5 mr-2" />
            Configuração Completa!
          </h3>
          <p className="text-green-800 text-sm mb-4">
            Após seguir todos os passos, seu formulário estará enviando emails automaticamente para
            <strong> aldairmurilo000@gmail.com</strong> sempre que alguém preencher o formulário de contato.
          </p>
          <div className="flex gap-2">
            <Button size="sm" asChild>
              <a href="/">Voltar ao Site</a>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <a href="/test-form">Testar Agora</a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
