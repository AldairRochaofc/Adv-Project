import dotenv from "dotenv";

// Carrega as variáveis de ambiente do arquivo .env
dotenv.config();

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // As variáveis de ambiente já estarão disponíveis através do dotenv
};

export default nextConfig;
