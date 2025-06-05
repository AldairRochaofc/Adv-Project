import ContactForm from "@/components/contact-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function TestFormPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-4">Teste do Formulário</h1>
          <p className="text-slate-600">Esta página é para testar o funcionamento do formulário de contato.</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Formulário de Contato</CardTitle>
            <CardDescription>
              Preencha os dados abaixo para testar o envio. O email será enviado via Nodemailer + Gmail para
              aldairmurilo000@gmail.com
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ContactForm />
          </CardContent>
        </Card>

        <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="font-semibold text-blue-900 mb-2">📧 Configuração do Gmail:</h3>
          <ol className="list-decimal list-inside space-y-2 text-blue-800 text-sm">
            <li>
              <strong>Ative a verificação em 2 etapas</strong> na sua conta Google
            </li>
            <li>
              <strong>Gere uma senha de aplicativo:</strong>
              <br />
              <a
                href="https://myaccount.google.com/apppasswords"
                className="underline text-blue-600"
                target="_blank"
                rel="noreferrer"
              >
                myaccount.google.com/apppasswords
              </a>
            </li>
            <li>
              <strong>Configure as variáveis de ambiente:</strong>
              <br />
              <code className="bg-blue-100 px-2 py-1 rounded text-xs">GMAIL_USER=seu-email@gmail.com</code>
              <br />
              <code className="bg-blue-100 px-2 py-1 rounded text-xs">GMAIL_APP_PASSWORD=sua-senha-de-app</code>
            </li>
          </ol>
        </div>

        <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
          <h3 className="font-semibold text-green-900 mb-2">✅ Vantagens do Nodemailer:</h3>
          <ul className="list-disc list-inside space-y-1 text-green-800 text-sm">
            <li>
              <strong>Flexível:</strong> Funciona com qualquer provedor SMTP
            </li>
            <li>
              <strong>Gratuito:</strong> Sem limites de envio (depende do provedor)
            </li>
            <li>
              <strong>Confiável:</strong> Biblioteca madura e estável
            </li>
            <li>
              <strong>Reply-To:</strong> Permite responder diretamente ao cliente
            </li>
            <li>
              <strong>Sem restrições:</strong> Envia para qualquer email
            </li>
          </ul>
        </div>

        <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <h3 className="font-semibold text-yellow-900 mb-2">⚠️ Outros Provedores SMTP:</h3>
          <div className="text-yellow-800 text-sm space-y-2">
            <p>
              <strong>Outlook/Hotmail:</strong>
            </p>
            <code className="bg-yellow-100 px-2 py-1 rounded text-xs block">
              host: 'smtp-mail.outlook.com', port: 587
            </code>

            <p>
              <strong>Yahoo:</strong>
            </p>
            <code className="bg-yellow-100 px-2 py-1 rounded text-xs block">
              host: 'smtp.mail.yahoo.com', port: 587
            </code>

            <p>
              <strong>SMTP Personalizado:</strong>
            </p>
            <code className="bg-yellow-100 px-2 py-1 rounded text-xs block">host: 'seu-smtp.com', port: 587</code>
          </div>
        </div>

        <div className="mt-4 p-4 bg-purple-50 border border-purple-200 rounded-lg">
          <h3 className="font-semibold text-purple-900 mb-2">🔧 Status Atual:</h3>
          <ul className="list-disc list-inside space-y-1 text-purple-800 text-sm">
            <li>
              <strong>Destino:</strong> aldairmurilo000@gmail.com
            </li>
            <li>
              <strong>Provedor:</strong> Gmail SMTP
            </li>
            <li>
              <strong>Reply-To:</strong> Email do cliente (resposta direta)
            </li>
            <li>
              <strong>Template:</strong> HTML responsivo profissional
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
