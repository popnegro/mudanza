export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { origen, destino, tipo } = req.body;

  // Lógica básica de estimación (Simulada)
  const preciosBase = {
    "1 ambiente": 15000,
    "2 ambientes": 25000,
    "3 ambientes": 40000,
    "Casa grande": 60000
  };

  const base = preciosBase[tipo] || 20000;

  const opciones = [
    { nombre: "Económico", precio: base, tiempo: "4-6 horas (Solo traslado)" },
    { nombre: "Estándar", precio: base * 1.3, tiempo: "3-5 horas (Traslado + Carga)" },
    { nombre: "Premium", precio: base * 1.8, tiempo: "2-4 horas (Embalaje completo)" }
  ];

  // Simular latencia de red
  setTimeout(() => {
    res.status(200).json({ opciones });
  }, 1000);
}