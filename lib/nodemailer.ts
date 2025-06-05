import nodemailer from "nodemailer";

// Configuração do transporter do Nodemailer
export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

// Função para verificar a conexão
export async function verificarConexao() {
  try {
    await transporter.verify();
    console.log("Conexão com o servidor de email estabelecida com sucesso!");
    return true;
  } catch (error) {
    console.error("Erro ao conectar com o servidor de email:", error);
    return false;
  }
}
