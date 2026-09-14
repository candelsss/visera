import { Geist, Geist_Mono } from "next/font/google";
import { Header } from "@/components/header/Header";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { Hero } from "@/components/hero/Hero";
import "./globals.css";
import { Footer } from "@/components/footer/Footer";

// Se ejecuta ANTES de que React pinte nada, directo en el <head>.
// Por defecto el tema es "dark" salvo que el usuario ya haya elegido "light"
// antes (guardado en localStorage). Así evitamos el flash de tema incorrecto.
const themeInitScript = `
  (function () {
    try {
      var stored = localStorage.getItem("theme");
      var theme = stored === "light" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", theme);
    } catch (e) {
      document.documentElement.setAttribute("data-theme", "dark");
    }
  })();
`;

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// ============================================================
// SEO — pendiente de contenido final del cliente. Todo lo de
// abajo YA funciona con estos valores provisionales; cuando el
// cliente entregue cada cosa, solo hay que sustituir el valor
// marcado con TODO (no hace falta tocar la estructura).
// ============================================================
const SITE_URL = "https://visera-tau.vercel.app"; // TODO: cambiar por el dominio definitivo cuando lo tengan

export const metadata = {
  metadataBase: new URL(SITE_URL),

  // TODO (cliente): título de marca definitivo.
  // "%s | Visera" hace que cualquier página hija (ej. Servicios)
  // añada su propio título delante automáticamente.
  title: {
    default: "Visera — Estudio creativo",
    template: "%s | Visera",
  },

  // TODO (cliente): meta description definitiva (150-160 caracteres,
  // con la propuesta de valor real de Visera).
  description:
    "Visera es un estudio creativo independiente que aporta valor real y tangible a las marcas a través de ideas frescas, diseño y campañas que impactan.",

  // TODO (cliente): palabras clave reales del negocio (impacto SEO
  // bajo hoy en día, pero no cuesta nada tenerlas).
  keywords: ["estudio creativo", "diseño de marca", "branding", "Visera"],

  authors: [{ name: "Visera" }],

  // Le dice a Google que SÍ indexe y siga enlaces (por defecto ya es
  // así, pero lo dejamos explícito para no depender del default).
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },

  alternates: {
    canonical: SITE_URL, // TODO: actualizar si cambia el dominio
  },

  // Cómo se ve la card al compartir en WhatsApp, iMessage, LinkedIn...
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: SITE_URL,
    siteName: "Visera",
    title: "Visera — Estudio creativo", // TODO (cliente): igual que el title de arriba
    description:
      "Visera es un estudio creativo independiente que aporta valor real y tangible a las marcas.", // TODO (cliente)
    images: [
      {
        // TODO (cliente): imagen de portada para compartir, 1200x630px,
        // formato .jpg o .png, colocarla en /public/img/og-cover.jpg
        url: "/img/og-cover.jpg",
        width: 1200,
        height: 630,
        alt: "Visera — Estudio creativo",
      },
    ],
  },

  // Cómo se ve la card al compartir en Twitter/X.
  twitter: {
    card: "summary_large_image",
    title: "Visera — Estudio creativo", // TODO (cliente)
    description:
      "Visera es un estudio creativo independiente que aporta valor real y tangible a las marcas.", // TODO (cliente)
    images: ["/img/og-cover.jpg"], // mismo archivo que openGraph.images
  },

  // TODO (cliente): favicon definitivo. De momento usa el que ya hay
  // en src/app/favicon.ico (el de por defecto de Next.js) — cuando
  // llegue el nuevo, basta con sustituir ese archivo por el real
  // (o añadir aquí rutas a /public/favicon-32x32.png, apple-touch-icon.png, etc.)
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    // apple: "/apple-touch-icon.png",
  },
};

// themeColor/colorScheme viven en su propio export desde Next 14+
// (ya no dentro de "metadata"). El de abajo es el fondo del modo
// oscuro (el que se ve por defecto al entrar) — se puede afinar
// cuando el cliente confirme los colores de marca definitivos.
export const viewport = {
  themeColor: "#79797B", // TODO (cliente): confirmar color de marca
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        {/*
          TODO (opcional, cliente): datos estructurados (JSON-LD) para
          que Google entienda que Visera es una organización — ayuda a
          aparecer con más info en los resultados de búsqueda. Rellenar
          con los datos reales y descomentar cuando estén listos.

          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Organization",
                name: "Visera",
                url: SITE_URL,
                logo: `${SITE_URL}/img/vector.webp`,
                sameAs: [
                  "https://www.instagram.com/viseravisera/",
                ],
              }),
            }}
          />
        */}
      </head>
      <body>
        <ThemeProvider>
          <Header />
          <Hero>{children}</Hero>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
