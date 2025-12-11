import type { ReactNode } from "react";

interface SignLayoutProps {
  children: ReactNode;
  orientation?: "left" | "right";
}

function SignLayout({ children, orientation = "right" }: SignLayoutProps) {
  return (
    <div className="grid h-screen md:grid-cols-2">
      {/* Columna con imagen y frase */}
      <div
        className={`relative hidden h-full md:block ${
          orientation === "left" ? "order-2" : "order-1"
        }`}
      >
        {/* Imagen de fondo */}
        <div className="absolute inset-0 bg-[url('/vista_ufps.webp')] bg-cover bg-center" />

        {/* Overlay oscuro */}
        <div className="absolute inset-0 bg-black/40" />

      </div>

      {/* Columna del formulario */}
      <div
        className={`relative grid h-full place-items-center ${
          orientation === "left" ? "order-1" : "order-2"
        }`}
      >
        <div>{children}</div>
      </div>
    </div>
  );
}

export default SignLayout;
