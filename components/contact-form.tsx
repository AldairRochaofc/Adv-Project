"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import * as Dialog from "@radix-ui/react-dialog";
import { FiX } from "react-icons/fi";

export default function ContactForm() {
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [area, setArea] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setSuccessMessage(null);
    setErrorMessage(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome,
          email,
          telefone,
          area,
          mensagem,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setSuccessMessage(data.message);
        setShowModal(true);
        // Limpar formulário
        setNome("");
        setTelefone("");
        setEmail("");
        setArea("");
        setMensagem("");
      } else {
        throw new Error(data.message || "Erro ao enviar mensagem");
      }
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Erro ao enviar mensagem"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="nome">Nome Completo</Label>
            <Input
              id="nome"
              name="nome"
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
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
          <Input
            id="email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
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

        {successMessage && (
          <div className="text-green-500">{successMessage}</div>
        )}
        {errorMessage && <div className="text-red-500">{errorMessage}</div>}

        <Button
          type="submit"
          className="w-full bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold"
          disabled={isLoading}
        >
          {isLoading ? "Enviando..." : "Enviar Mensagem"}
        </Button>
      </form>

      <Dialog.Root open={showModal} onOpenChange={setShowModal}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/50 data-[state=open]:animate-overlayShow" />
          <Dialog.Content className="fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none data-[state=open]:animate-contentShow">
            <Dialog.Title className="text-xl font-semibold text-gray-900 mb-4">
              Mensagem Enviada com Sucesso!
            </Dialog.Title>
            <Dialog.Description className="text-gray-600 mb-5">
              Agradecemos seu contato. Retornaremos em breve através dos dados
              fornecidos.
            </Dialog.Description>
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                <FiX className="mr-2" />
                Fechar
              </button>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}
