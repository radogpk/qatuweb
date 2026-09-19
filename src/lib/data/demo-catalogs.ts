export type DemoProduct = {
  id: string;
  name: string;
  detail: string;
  price: number;
  image: string;
};

export type DemoCatalog = {
  id: string;
  label: string;
  name: string;
  subtitle: string;
  domain: string;
  cover: string;
  coverAlt: string;
  products: DemoProduct[];
};

// Illustrative catalogs, not customer endorsements or live merchant inventory.
export const demoCatalogs: DemoCatalog[] = [
  {
    id: "cafe",
    label: "Cafetería",
    name: "Pausa",
    subtitle: "CAFÉ & BUENOS MOMENTOS",
    domain: "tucafeteria.qatu.pe",
    cover:
      "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1000&q=85",
    coverAlt: "Ambiente cálido de una cafetería, fotografía ilustrativa",
    products: [
      {
        id: "latte",
        name: "Café de la casa",
        detail: "Café de origen, recién preparado.",
        price: 12,
        image:
          "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=500&q=85",
      },
      {
        id: "grano",
        name: "Café de origen · 250 g",
        detail: "Tueste medio, para llevar.",
        price: 28,
        image:
          "https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=500&q=85",
      },
    ],
  },
  {
    id: "flores",
    label: "Florería",
    name: "Flor de día",
    subtitle: "DETALLES QUE DICEN MUCHO",
    domain: "tufloreria.qatu.pe",
    cover:
      "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=1000&q=85",
    coverAlt: "Arreglo floral, fotografía ilustrativa para una florería",
    products: [
      {
        id: "ramo",
        name: "Ramo de temporada",
        detail: "Flores frescas y dedicatoria.",
        price: 65,
        image:
          "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?auto=format&fit=crop&w=500&q=85",
      },
      {
        id: "arreglo",
        name: "Arreglo especial",
        detail: "Un detalle para celebrar.",
        price: 95,
        image:
          "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=500&q=85",
      },
    ],
  },
  {
    id: "tienda",
    label: "Tienda",
    name: "Casa nuestra",
    subtitle: "OBJETOS PARA LO COTIDIANO",
    domain: "tutienda.qatu.pe",
    cover:
      "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?auto=format&fit=crop&w=1000&q=85",
    coverAlt: "Espacio creativo, fotografía ilustrativa para una tienda",
    products: [
      {
        id: "lamina",
        name: "Lámina decorativa",
        detail: "Un acento para tu espacio.",
        price: 35,
        image:
          "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=500&q=85",
      },
      {
        id: "set",
        name: "Set de escritorio",
        detail: "Ideas listas para tomar forma.",
        price: 59,
        image:
          "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?auto=format&fit=crop&w=500&q=85",
      },
    ],
  },
];

export function formatSoles(value: number): string {
  return `S/ ${value.toFixed(2)}`;
}
