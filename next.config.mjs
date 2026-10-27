/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    root: import.meta.dirname,
  },
  experimental: {
    // Mete el CSS crítico directo en el HTML en vez de como <link> aparte,
    // para evitar las peticiones de red que bloquean el primer pintado.
    inlineCss: true,
  },
};

export default nextConfig;
