import { type NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Configuração do transportador
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

// Função para verificar a conexão com o Gmail
async function verificarConexaoGmail() {
  try {
    await transporter.verify();
    console.log("✅ Conexão com Gmail OK!");
    return true;
  } catch (error) {
    console.error("❌ Erro na conexão com Gmail:", error);
    return false;
  }
}

// POST - Envia o email
export async function POST(request: NextRequest) {
  try {
    console.log("📧 Iniciando processamento do envio de email...");

    const { nome, email, telefone, area, mensagem } = await request.json();

    console.log("📝 Dados recebidos:", { nome, email, telefone, area });

    // Validação dos campos
    if (!nome || !email || !telefone || !area || !mensagem) {
      return NextResponse.json(
        { success: false, message: "Todos os campos são obrigatórios" },
        { status: 400 }
      );
    }

    // Verifica conexão com Gmail
    const gmailConectado = await verificarConexaoGmail();
    if (!gmailConectado) {
      console.log("❌ Não foi possível conectar ao Gmail");
      return NextResponse.json(
        { success: false, message: "Erro ao conectar com servidor de email" },
        { status: 500 }
      );
    }

    // Configuração do email
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: "aldairmurilo000@gmail.com", // Email fixo para receber as mensagens
      subject: `Novo Contato - ${area}`,
      html: `
        <h2>Novo Contato do Site</h2>
        <p><strong>Nome:</strong> ${nome}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Telefone:</strong> ${telefone}</p>
        <p><strong>Área:</strong> ${area}</p>
        <p><strong>Mensagem:</strong></p>
        <p>${mensagem}</p>
      `,
    };

    console.log("📨 Tentando enviar email...");

    // Envia o email
    await transporter.sendMail(mailOptions);

    console.log("✅ Email enviado com sucesso!");

    return NextResponse.json({
      success: true,
      message: "Mensagem enviada com sucesso!",
    });
  } catch (error: any) {
    console.error("❌ Erro ao enviar email:", error);
    // Verifica se é um erro de autenticação
    if (error.message?.includes("Invalid login")) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Erro de autenticação no servidor de email. Por favor, entre em contato por telefone.",
        },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { success: false, message: "Erro ao enviar mensagem" },
      { status: 500 }
    );
  }
}
