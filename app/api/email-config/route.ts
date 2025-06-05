import { type NextRequest, NextResponse } from "next/server"
import { writeFile, readFile } from "fs/promises"
import { join } from "path"

const CONFIG_FILE = join(process.cwd(), "email-config.json")

// Função para ler a configuração atual
async function readEmailConfig() {
  try {
    const data = await readFile(CONFIG_FILE, "utf8")
    return JSON.parse(data)
  } catch (error) {
    // Se o arquivo não existir, retorna configuração padrão
    return { email: "aldairmurilo000@gmail.com" }
  }
}

// Função para salvar a configuração
async function saveEmailConfig(email: string) {
  const config = { email, updatedAt: new Date().toISOString() }
  await writeFile(CONFIG_FILE, JSON.stringify(config, null, 2))
  return config
}

// GET - Retorna o email atual
export async function GET() {
  try {
    const config = await readEmailConfig()
    return NextResponse.json(config)
  } catch (error) {
    console.error("Erro ao ler configuração:", error)
    return NextResponse.json({ email: "aldairmurilo000@gmail.com" })
  }
}

// POST - Atualiza o email
export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json({ message: "Email é obrigatório" }, { status: 400 })
    }

    // Validação de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ message: "Email inválido" }, { status: 400 })
    }

    const config = await saveEmailConfig(email)

    return NextResponse.json({
      message: "Email atualizado com sucesso",
      email: config.email,
      updatedAt: config.updatedAt,
    })
  } catch (error) {
    console.error("Erro ao salvar configuração:", error)
    return NextResponse.json({ message: "Erro interno do servidor" }, { status: 500 })
  }
}
