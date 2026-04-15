// 🚀 GUÍA COMPLETA: DESPLEGAR EN VERCEL (Frontend + API)

// =============================
// 1. ESTRUCTURA FINAL PROYECTO
// =============================

// /mudanzas-app/
// ├── /pages
// │   ├── index.js              ← ESTE COMPONENTE
// │   └── /api
// │       └── calcular.js       ← backend
// ├── /components
// ├── /public
// ├── package.json
// └── next.config.js


// =============================
// 2. COMPONENTE PRINCIPAL (YA LISTO)
// =============================

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function CotizadorMudanza() {
  const [step, setStep] = useState(1);
  const [origen, setOrigen] = useState("");
  const [destino, setDestino] = useState("");
  const [tipo, setTipo] = useState("1 ambiente");
  const [resultado, setResultado] = useState(null);
  const [loading, setLoading] = useState(false);

  const calcularPrecio = async () => {
    setLoading(true);

    try {
      const res = await fetch("/api/calcular", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ origen, destino, tipo })
      });

      const data = await res.json();
      setResultado(data.opciones);
      setStep(4);
    } catch (e) {
      console.error(e);
      alert("Error calculando precio");
    }

    setLoading(false);
  };

  const enviarWhatsApp = (opcion) => {
    const mensaje = `Hola, quiero una mudanza:%0AOrigen: ${origen}%0ADestino: ${destino}%0ATipo: ${tipo}%0APlan: ${opcion.nombre}%0APrecio: $${opcion.precio}`;
    window.open(`https://wa.me/549XXXXXXXXXX?text=${mensaje}`, "_blank");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-md rounded-2xl shadow-xl">
        <CardContent className="p-6">
          <motion.div key={step} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>

            {step === 1 && (
              <div>
                <h2 className="text-xl font-bold mb-4">¿Desde dónde te mudás?</h2>
                <input className="w-full p-3 border rounded mb-4" placeholder="Ej: Las Heras" value={origen} onChange={(e) => setOrigen(e.target.value)} />
                <Button onClick={() => setStep(2)}>Continuar</Button>
              </div>
            )}

            {step === 2 && (
              <div>
                <h2 className="text-xl font-bold mb-4">¿A dónde vas?</h2>
                <input className="w-full p-3 border rounded mb-4" placeholder="Ej: Godoy Cruz" value={destino} onChange={(e) => setDestino(e.target.value)} />
                <Button onClick={() => setStep(3)}>Continuar</Button>
              </div>
            )}

            {step === 3 && (
              <div>
                <h2 className="text-xl font-bold mb-4">Tipo de mudanza</h2>
                <select className="w-full p-3 border rounded mb-4" value={tipo} onChange={(e) => setTipo(e.target.value)}>
                  <option>1 ambiente</option>
                  <option>2 ambientes</option>
                  <option>3 ambientes</option>
                  <option>Casa grande</option>
                </select>
                <Button onClick={calcularPrecio}>Calcular precio</Button>
              </div>
            )}

            {loading && (
              <div className="text-center py-10">
                <p className="text-lg font-semibold">Calculando tarifa...</p>
                <p className="text-sm text-gray-500">Buscando vehículos disponibles</p>
              </div>
            )}

            {step === 4 && resultado && !loading && (
              <div>
                <h2 className="text-xl font-bold mb-4">Opciones disponibles</h2>
                {resultado.map((op, i) => (
                  <div key={i} className="border rounded p-4 mb-3">
                    <h3 className="font-semibold">{op.nombre}</h3>
                    <p className="text-lg font-bold">${op.precio.toLocaleString()}</p>
                    <p className="text-sm text-gray-500">{op.tiempo}</p>
                    <Button className="mt-2 w-full" onClick={() => enviarWhatsApp(op)}>
                      Elegir y reservar
                    </Button>
                  </div>
                ))}
              </div>
            )}

          </motion.div>
        </CardContent>
      </Card>
    </div>
  );
}


// =============================
// 3. BACKEND (pages/api/calcular.js)
// =============================

export default function handler(req, res) {
  const { tipo } = req.body;

  let base = 15000;
  if (tipo === "2 ambientes") base = 25000;
  if (tipo === "3 ambientes") base = 35000;
  if (tipo === "Casa grande") base = 50000;

  const distancia = Math.floor(Math.random() * 20) + 5;

  const opciones = [
    { nombre: "Económico", precio: base + distancia * 800, tiempo: "24-48 hs" },
    { nombre: "Express", precio: base + distancia * 1200, tiempo: "En el día" },
    { nombre: "Premium", precio: base + distancia * 1600, tiempo: "Prioritario" }
  ];

  res.status(200).json({ opciones });
}


// =============================
// 4. package.json
// =============================

{
  "name": "mudanzas-app",
  "version": "1.0.0",
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  },
  "dependencies": {
    "next": "latest",
    "react": "latest",
    "react-dom": "latest",
    "framer-motion": "latest"
  }
}


// =============================
// 5. DEPLOY EN VERCEL
// =============================

// PASOS:

// 1. Crear repo en GitHub
// 2. Subir proyecto
// 3. Ir a https://vercel.com
// 4. "New Project"
// 5. Importar repo
// 6. Deploy automático

// Vercel detecta Next.js automáticamente


// =============================
// 6. RESULTADO FINAL
// =============================

// Tendrás:
// https://tuapp.vercel.app

// Con:
// - Frontend funcionando
// - API funcionando
// - Widget listo


// =============================
// 7. BONUS (PRO)
// =============================

// Dominio propio:
// mudanzas-argentina.com

// Variables de entorno:
// GOOGLE_MAPS_API_KEY

// Escalabilidad automática ✔
