import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

// Carrega as variáveis de ambiente
dotenv.config();

// Configuração do transportador
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

// Função para verificar a configuração
async function verificarConfiguracao() {
  console.log("Verificando configuração do email:");
  console.log("GMAIL_USER:", process.env.GMAIL_USER);
  console.log(
    "GMAIL_APP_PASSWORD está definido:",
    !!process.env.GMAIL_APP_PASSWORD
  );

  try {
    await transporter.verify();
    console.log("✅ Conexão com o Gmail estabelecida com sucesso!");
    return true;
  } catch (error) {
    console.error("❌ Erro na conexão:", error);
    return false;
  }
}

// Função para verificar o token do reCAPTCHA
async function verificarRecaptcha(token: string) {
  try {
    const response = await fetch(
      "https://www.google.com/recaptcha/api/siteverify",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`,
      }
    );

    const data = await response.json();
    return data.success;
  } catch (error) {
    console.error("Erro ao verificar reCAPTCHA:", error);
    return false;
  }
}

export async function POST(request: NextRequest) {
  try {
    // Verifica a configuração primeiro
    const configuracaoOk = await verificarConfiguracao();
    if (!configuracaoOk) {
      throw new Error(
        "Erro na configuração do email. Verifique as credenciais."
      );
    }

    const formData = await request.formData();
    const nome = formData.get("nome") as string;
    const email = formData.get("email") as string;
    const telefone = formData.get("telefone") as string;
    const area = formData.get("area") as string;
    const mensagem = formData.get("mensagem") as string;
    const recaptchaToken = formData.get("recaptchaToken") as string;

    // Validação básica
    if (!nome || !telefone || !email || !area || !mensagem) {
      return NextResponse.json(
        {
          success: false,
          message: "Todos os campos são obrigatórios.",
        },
        { status: 400 }
      );
    }

    // Validar reCAPTCHA
    if (!recaptchaToken) {
      return NextResponse.json(
        {
          success: false,
          message: "Verificação de segurança necessária.",
        },
        { status: 400 }
      );
    }

    const recaptchaValido = await verificarRecaptcha(recaptchaToken);
    if (!recaptchaValido) {
      return NextResponse.json(
        {
          success: false,
          message: "Verificação de segurança falhou. Tente novamente.",
        },
        { status: 400 }
      );
    }

    // Configuração do email
    const mailOptions = {
      from: `"Formulário Advogado" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      subject: `Nova Consulta Jurídica - ${area}`,
      replyTo: email,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #1e293b 0%, #334155 100%); color: white; padding: 30px; border-radius: 10px 10px 0 0;">
            <h1 style="margin: 0; font-size: 28px;">⚖️ Nova Consulta Jurídica</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">Formulário de contato do site</p>
          </div>
          
          <div style="background: #f8fafc; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #e2e8f0;">
            <div style="background: white; padding: 25px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
              <h2 style="color: #1e293b; margin-top: 0; border-bottom: 2px solid #f59e0b; padding-bottom: 10px;">
                📋 Dados do Cliente
              </h2>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #374151; width: 120px;">Nome:</td>
                  <td style="padding: 8px 0; color: #1f2937;">${nome}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #374151;">Email:</td>
                  <td style="padding: 8px 0; color: #1f2937;">
                    <a href="mailto:${email}" style="color: #3b82f6; text-decoration: none;">${email}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #374151;">Telefone:</td>
                  <td style="padding: 8px 0; color: #1f2937;">${telefone}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #374151;">Área:</td>
                  <td style="padding: 8px 0; color: #1f2937;">${area}</td>
                </tr>
              </table>
            </div>

            <div style="background: white; padding: 25px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
              <h2 style="color: #1e293b; margin-top: 0; border-bottom: 2px solid #f59e0b; padding-bottom: 10px;">
                💬 Mensagem
              </h2>
              <p style="color: #1f2937; line-height: 1.6; white-space: pre-wrap;">${mensagem}</p>
            </div>
          </div>
        </div>
      `,
    };

    // Enviar email
    const info = await transporter.sendMail(mailOptions);

    return NextResponse.json(
      {
        success: true,
        message: "Mensagem enviada com sucesso!",
        details: {
          messageId: info.messageId,
          timestamp: new Date().toISOString(),
          recipient: process.env.GMAIL_USER,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Erro ao enviar email:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Erro ao enviar mensagem. Por favor, tente novamente.",
        error: error instanceof Error ? error.message : "Erro desconhecido",
      },
      { status: 500 }
    );
  }
}
