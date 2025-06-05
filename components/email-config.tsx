"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Settings, Save, Mail, CheckCircle, AlertCircle } from "lucide-react"

export default function EmailConfig() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)
  const [currentEmail, setCurrentEmail] = useState("")

  // Carregar email atual ao montar o componente
  useEffect(() => {
    fetchCurrentEmail()
  }, [])

  const fetchCurrentEmail = async () => {
    try {
      const response = await fetch("/api/email-config")
      const data = await response.json()
      setCurrentEmail(data.email || "aldairmurilo000@gmail.com")
      setEmail(data.email || "aldairmurilo000@gmail.com")
    } catch (error) {
      console.error("Erro ao carregar email:", error)
    }
  }

  const handleSave = async () => {
    if (!email) {
      setMessage({ type: "error", text: "Email é obrigatório" })
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setMessage({ type: "error", text: "Email inválido" })
      return
    }

    setIsLoading(true)
    setMessage(null)

    try {
      const response = await fetch("/api/email-config", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (response.ok) {
        setCurrentEmail(email)
        setMessage({ type: "success", text: "Email atualizado com sucesso!" })
      } else {
        setMessage({ type: "error", text: data.message || "Erro ao salvar email" })
      }
    } catch (error) {
      setMessage({ type: "error", text: "Erro de conexão. Tente novamente." })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="h-5 w-5" />
          Configurar Email
        </CardTitle>
        <CardDescription>Altere o email de destino dos formulários de contato</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="current-email">Email Atual</Label>
          <div className="flex items-center gap-2 p-2 bg-slate-50 rounded-md">
            <Mail className="h-4 w-4 text-slate-500" />
            <span className="text-sm text-slate-700">{currentEmail}</span>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="new-email">Novo Email</Label>
          <Input
            id="new-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Digite o novo email"
            disabled={isLoading}
          />
        </div>

        <Button onClick={handleSave} className="w-full" disabled={isLoading || email === currentEmail}>
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Salvando...
            </>
          ) : (
            <>
              <Save className="h-4 w-4 mr-2" />
              Salvar Email
            </>
          )}
        </Button>

        {message && (
          <div
            className={`flex items-center gap-2 p-3 rounded-md ${
              message.type === "success"
                ? "bg-green-50 border border-green-200 text-green-700"
                : "bg-red-50 border border-red-200 text-red-700"
            }`}
          >
            {message.type === "success" ? <CheckCircle className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
            <span className="text-sm">{message.text}</span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
