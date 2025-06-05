"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Scale, Shield, Users, Phone, Mail, MapPin, Clock, CheckCircle, Star, Settings } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import ContactForm from "@/components/contact-form"

const ContactFormInner = () => {
  const [nome, setNome] = useState("")
  const [telefone, setTelefone] = useState("")
  const [email, setEmail] = useState("")
  const [area, setArea] = useState("")
  const [mensagem, setMensagem] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    setIsLoading(true)
    setSuccessMessage(null)
    setErrorMessage(null)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nome, telefone, email, area, mensagem }),
      })

      if (response.ok) {
        setSuccessMessage("Mensagem enviada com sucesso! Entraremos em contato em breve.")
        setNome("")
        setTelefone("")
        setEmail("")
        setArea("")
        setMensagem("")
      } else {
        const errorData = await response.json()
        setErrorMessage(errorData.message || "Ocorreu um erro ao enviar a mensagem.")
      }
    } catch (error) {
      console.error("Erro ao enviar o formulário:", error)
      setErrorMessage("Ocorreu um erro ao enviar a mensagem.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="nome">Nome Completo</Label>
          <Input id="nome" name="nome" type="text" value={nome} onChange={(e) => setNome(e.target.value)} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="telefone">Telefone</Label>
          <Input
            id="telefone"
            name="telefone"
            type="tel"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="area">Área de Interesse</Label>
        <select
          id="area"
          name="area"
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          value={area}
          onChange={(e) => setArea(e.target.value)}
          required
        >
          <option value="">Selecione uma área</option>
          <option value="civil">Direito Civil</option>
          <option value="trabalhista">Direito Trabalhista</option>
          <option value="empresarial">Direito Empresarial</option>
          <option value="previdenciario">Direito Previdenciário</option>
          <option value="consumidor">Direito do Consumidor</option>
          <option value="imobiliario">Direito Imobiliário</option>
        </select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="mensagem">Descreva seu caso</Label>
        <Textarea
          id="mensagem"
          name="mensagem"
          rows={4}
          placeholder="Conte-nos brevemente sobre sua situação..."
          value={mensagem}
          onChange={(e) => setMensagem(e.target.value)}
          required
        />
      </div>

      {successMessage && <div className="text-green-500">{successMessage}</div>}
      {errorMessage && <div className="text-red-500">{errorMessage}</div>}

      <Button
        type="submit"
        className="w-full bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold"
        disabled={isLoading}
      >
        {isLoading ? "Enviando..." : "Enviar Mensagem"}
      </Button>
    </form>
  )
}

export default function LawyerLanding() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header */}
      <header className="bg-slate-900 text-white px-4 lg:px-6 h-16 flex items-center fixed w-full top-0 z-50 shadow-lg">
        <div className="container mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Scale className="h-8 w-8 text-amber-400" />
            <span className="text-xl font-bold">Dr. Advogado</span>
          </Link>
          <nav className="hidden md:flex space-x-6">
            <Link href="#sobre" className="hover:text-amber-400 transition-colors">
              Sobre
            </Link>
            <Link href="#servicos" className="hover:text-amber-400 transition-colors">
              Serviços
            </Link>
            <Link href="#contato" className="hover:text-amber-400 transition-colors">
              Contato
            </Link>
          </nav>
          <Button className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold">Consulta Gratuita</Button>
          <Button variant="outline" size="sm" asChild className="ml-2">
            <Link href="/config">
              <Settings className="mr-2 h-4 w-4" />
              Config
            </Link>
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-16 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="container mx-auto px-4 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Badge className="bg-amber-500 text-slate-900 hover:bg-amber-600">Advocacia Especializada</Badge>
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                Defenda Seus <span className="text-amber-400">Direitos</span> com Excelência
              </h1>
              <p className="text-xl text-slate-300 leading-relaxed">
                Mais de 15 anos de experiência em direito civil, trabalhista e empresarial. Consultoria jurídica
                personalizada para proteger seus interesses.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold">
                  <Phone className="mr-2 h-5 w-5" />
                  Consulta Gratuita
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-amber-400 text-amber-400 hover:bg-amber-400 hover:text-slate-900"
                >
                  Saiba Mais
                </Button>
              </div>
              <div className="flex items-center space-x-6 pt-4">
                <div className="flex items-center space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="h-5 w-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-slate-300">500+ casos resolvidos</span>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/placeholder.svg?height=600&width=500"
                alt="Advogado profissional"
                width={500}
                height={600}
                className="rounded-lg shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-amber-500 text-slate-900 p-4 rounded-lg shadow-lg">
                <div className="text-2xl font-bold">98%</div>
                <div className="text-sm">Taxa de Sucesso</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sobre Section */}
      <section id="sobre" className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">Experiência e Dedicação</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Comprometido em oferecer soluções jurídicas eficazes e personalizadas para cada cliente
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <Shield className="h-12 w-12 text-amber-500 mx-auto mb-4" />
                <CardTitle className="text-slate-900">Proteção Total</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 text-center">
                  Defendemos seus direitos com estratégias jurídicas sólidas e comprovadas
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <Users className="h-12 w-12 text-amber-500 mx-auto mb-4" />
                <CardTitle className="text-slate-900">Atendimento Personalizado</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 text-center">
                  Cada caso é único e merece atenção especializada e dedicada
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <CheckCircle className="h-12 w-12 text-amber-500 mx-auto mb-4" />
                <CardTitle className="text-slate-900">Resultados Comprovados</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 text-center">Histórico de sucesso em mais de 500 casos resolvidos</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Serviços Section */}
      <section id="servicos" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">Áreas de Atuação</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Expertise em diversas áreas do direito para atender todas as suas necessidades jurídicas
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Direito Civil",
                description: "Contratos, responsabilidade civil, direito de família e sucessões",
                features: ["Contratos", "Indenizações", "Divórcio", "Inventário"],
              },
              {
                title: "Direito Trabalhista",
                description: "Defesa dos direitos do trabalhador e consultoria empresarial",
                features: ["Rescisões", "Horas Extras", "Assédio", "FGTS"],
              },
              {
                title: "Direito Empresarial",
                description: "Consultoria jurídica para empresas e empreendedores",
                features: ["Contratos", "Sociedades", "Compliance", "Tributário"],
              },
              {
                title: "Direito Previdenciário",
                description: "Aposentadorias, pensões e benefícios previdenciários",
                features: ["Aposentadoria", "Auxílio-doença", "Pensões", "Revisões"],
              },
              {
                title: "Direito do Consumidor",
                description: "Proteção dos direitos do consumidor contra abusos",
                features: ["Produtos Defeituosos", "Serviços", "Bancos", "Planos de Saúde"],
              },
              {
                title: "Direito Imobiliário",
                description: "Compra, venda, locação e regularização de imóveis",
                features: ["Compra e Venda", "Locação", "Usucapião", "Regularização"],
              },
            ].map((servico, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                <CardHeader>
                  <CardTitle className="text-slate-900 text-xl">{servico.title}</CardTitle>
                  <CardDescription className="text-slate-600">{servico.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {servico.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-slate-600">
                        <CheckCircle className="h-4 w-4 text-amber-500 mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contato" className="py-20 bg-slate-900 text-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">Entre em Contato</h2>
              <p className="text-xl text-slate-300 mb-8">
                Agende sua consulta gratuita e descubra como podemos ajudar você
              </p>

              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <Phone className="h-6 w-6 text-amber-400" />
                  <div>
                    <div className="font-semibold">Telefone</div>
                    <div className="text-slate-300">(11) 99999-9999</div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <Mail className="h-6 w-6 text-amber-400" />
                  <div>
                    <div className="font-semibold">Email</div>
                    <div className="text-slate-300">contato@dradvogado.com</div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <MapPin className="h-6 w-6 text-amber-400" />
                  <div>
                    <div className="font-semibold">Endereço</div>
                    <div className="text-slate-300">Av. Paulista, 1000 - São Paulo, SP</div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <Clock className="h-6 w-6 text-amber-400" />
                  <div>
                    <div className="font-semibold">Horário</div>
                    <div className="text-slate-300">Seg-Sex: 8h às 18h</div>
                  </div>
                </div>
              </div>
            </div>

            <Card className="bg-white text-slate-900">
              <CardHeader>
                <CardTitle className="text-2xl">Consulta Gratuita</CardTitle>
                <CardDescription>Preencha o formulário e entraremos em contato em até 24 horas</CardDescription>
              </CardHeader>
              <CardContent>
                <ContactForm />
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Scale className="h-8 w-8 text-amber-400" />
                <span className="text-xl font-bold">Dr. Advogado</span>
              </div>
              <p className="text-slate-300">Defendendo seus direitos com excelência e dedicação há mais de 15 anos.</p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Serviços</h3>
              <ul className="space-y-2 text-slate-300">
                <li>Direito Civil</li>
                <li>Direito Trabalhista</li>
                <li>Direito Empresarial</li>
                <li>Direito Previdenciário</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Contato</h3>
              <ul className="space-y-2 text-slate-300">
                <li>(11) 99999-9999</li>
                <li>contato@dradvogado.com</li>
                <li>Av. Paulista, 1000</li>
                <li>São Paulo, SP</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Horários</h3>
              <ul className="space-y-2 text-slate-300">
                <li>Segunda a Sexta</li>
                <li>8h às 18h</li>
                <li>Sábado</li>
                <li>8h às 12h</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-700 mt-8 pt-8 text-center text-slate-300">
            <p>&copy; {new Date().getFullYear()} Dr. Advogado. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
