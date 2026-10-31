/**
 * SHORT N' SWEET BAKERY - Catálogo Centralizado de Productos
 * Universidad APEC - Diseño Web (Grupo No. 01)
 * 
 * Contiene la definición de productos en las cuatro líneas oficiales:
 * - Cheesecakes
 * - Rolls (Cinnamon Rolls / Roles)
 * - Cookies (Galletas Artesanales)
 * - Flan
 */

const PRODUCTS_DATA = [
  // --- CHEESECAKES ---
  {
    id: "chk-01",
    name: "Classic New York Cheesecake",
    category: "cheesecakes",
    price: 950,
    availability: "Disponible",
    image: "https://plus.unsplash.com/premium_photo-1702834009235-69b3e1dfe264?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
    description: "Cremoso cheesecake estilo Nueva York horneado a fuego lento con base crocante de galletas graham y toque de vainilla de Madagascar.",
    portions: "8-10 porciones (8 pulgadas)",
    ingredients: "Queso crema Philadelphia, galleta graham, mantequilla dulce, vainilla natural, crema agria.",
    badge: "Más Vendido",
    rating: 5.0,
    reviewCount: 38
  },
  {
    id: "chk-02",
    name: "Strawberry Swirl Cheesecake",
    category: "cheesecakes",
    price: 1100,
    availability: "Disponible",
    image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=800&q=80",
    description: "Nuestra clásica crema de queso con un remolino artesanal de mermelada de fresas frescas maceradas y fresas glaseadas en la corona.",
    portions: "8-10 porciones",
    ingredients: "Fresas naturales, queso crema, galleta de mantequilla, azúcar de caña.",
    badge: "Favorito de la Casa",
    rating: 4.9,
    reviewCount: 45
  },
  {
    id: "chk-03",
    name: "Salted Caramel & Pecan Cheesecake",
    category: "cheesecakes",
    price: 1250,
    availability: "Bajo Pedido",
    image: "https://images.unsplash.com/photo-1791793266757-01205c75cf62?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
    description: "Fusión irresistible de caramelo salado hecho en casa con nueces pecanas tostadas crujientes sobre terciopelo de queso crema.",
    portions: "10-12 porciones",
    ingredients: "Caramelo salado artesanal, nueces pecanas seleccionadas, flor de sal, queso crema.",
    badge: "Edición Especial",
    rating: 4.8,
    reviewCount: 22
  },
  {
    id: "chk-04",
    name: "Passion Fruit (Chinola) Bliss",
    category: "cheesecakes",
    price: 1050,
    availability: "Disponible",
    image: "https://images.unsplash.com/photo-1524351199678-941a58a3df50?auto=format&fit=crop&w=800&q=80",
    description: "Equilibrio tropical perfecto entre lo dulce y lo cítrico con coulis de chinola dominicana fresca sobre base dorada.",
    portions: "8 porciones",
    ingredients: "Pulpa pura de chinola, queso crema, ralladura de lima, masa sableé.",
    badge: "Toque Criollo",
    rating: 4.9,
    reviewCount: 19
  },

  // --- ROLLS ---
  {
    id: "rol-01",
    name: "Classic Cinnamon Roll Glaseado",
    category: "rolls",
    price: 240,
    availability: "Disponible",
    image: "https://images.unsplash.com/photo-1645995575875-ea6511c9d127?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
    description: "Esponjoso rol artesanal fermentado durante 24 horas, relleno de canela de Ceilán, azúcar morena y cubierto de un espeso glaseado de queso crema.",
    portions: "1 unidad individual grande (160g)",
    ingredients: "Harina de fuerza, canela Ceilán molida, mantequilla pura de vaca, frosting de queso.",
    badge: "Recién Salido del Horno",
    rating: 5.0,
    reviewCount: 64
  },
  {
    id: "rol-02",
    name: "Lotus Biscoff Crunch Roll",
    category: "rolls",
    price: 320,
    availability: "Disponible",
    image: "https://images.unsplash.com/photo-1599743527873-5930a502cfc4?q=80&w=1172&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
    description: "Rol esponjoso cubierto con generosa crema speculoos Lotus derretida y lluvia de galletas Biscoff crocantes.",
    portions: "1 unidad individual grande",
    ingredients: "Crema Lotus Biscoff, galleta crujiente, masa brioche perfumada, glaseado suave.",
    badge: "Tendencia",
    rating: 4.9,
    reviewCount: 51
  },
  {
    id: "rol-03",
    name: "Nutella & Roasted Hazelnuts Roll",
    category: "rolls",
    price: 295,
    availability: "Disponible",
    image: "https://plus.unsplash.com/premium_photo-1691917397035-a4297d3259b1?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
    description: "Cargado de auténtica crema de avellanas Nutella y trocitos de avellanas tostadas al momento.",
    portions: "1 unidad",
    ingredients: "Nutella original, avellanas tostadas, cacao de origen, masa hojaldrada.",
    badge: "Choco Lover",
    rating: 4.8,
    reviewCount: 33
  },
  {
    id: "rol-04",
    name: "Red Berry Glazed Roll",
    category: "rolls",
    price: 280,
    availability: "Agotado",
    image: "https://images.unsplash.com/photo-1608512110215-7f6acfe55016?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
    description: "Rol de canela cubierto con glaseado cítrico de frutos rojos silvestres macerados a fuego lento.",
    portions: "1 unidad",
    ingredients: "Arándanos, frambuesas, masa madre dulce, canela y glaseado rosado.",
    badge: "Agotado por hoy",
    rating: 4.7,
    reviewCount: 16
  },

  // --- COOKIES ---
  {
    id: "cok-01",
    name: "Triple Chocolate Chunk Cookie",
    category: "cookies",
    price: 180,
    availability: "Disponible",
    image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=800&q=80",
    description: "Galleta estilo Nueva York de centro suave y derretido, repleta de trozos generosos de chocolate amargo 70%, con leche y blanco.",
    portions: "1 galleta gigante (120g)",
    ingredients: "Chocolate belga Valrhona, mantequilla dorada, azúcar morena suave, flor de sal.",
    badge: "Estrella NYC",
    rating: 5.0,
    reviewCount: 72
  },
  {
    id: "cok-02",
    name: "Red Velvet Cream Cheese Stuffed",
    category: "cookies",
    price: 220,
    availability: "Disponible",
    image: "https://images.unsplash.com/photo-1586788680434-30d324b2d46f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
    description: "Vibrante masa suave de Red Velvet rellena de un centro de suave volcán de cheesecake de vainilla.",
    portions: "1 galleta rellena (130g)",
    ingredients: "Cacao fino, remolacha natural para coloración, relleno de queso crema artesanal.",
    badge: "Sensación",
    rating: 4.9,
    reviewCount: 40
  },
  {
    id: "cok-03",
    name: "S'mores Marshmallow Campfire",
    category: "cookies",
    price: 210,
    availability: "Disponible",
    image: "https://images.unsplash.com/photo-1654274322613-c60fd0486c32?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
    description: "Galleta con trozos de galleta graham, chocolate con leche derretido y malvavisco tostado elástico y dorado.",
    portions: "1 galleta artesanal (125g)",
    ingredients: "Malvaviscos tostados, galleta graham, chispas semiamargas Hershey's.",
    badge: "Para Compartir",
    rating: 4.8,
    reviewCount: 29
  },
  {
    id: "cok-04",
    name: "Salted Caramel Brownie Cookie",
    category: "cookies",
    price: 195,
    availability: "Bajo Pedido",
    image: "https://images.unsplash.com/photo-1618923850107-d1a234d7a73a?auto=format&fit=crop&w=800&q=80",
    description: "Híbrido sedoso entre un brownie húmedo con intenso sabor a cacao y gotas de caramelo masticable espolvoreado con cristales de sal.",
    portions: "1 galleta (120g)",
    ingredients: "Cacao alcalinizado, caramelo blando casero, sal Maldon, chocolate 60%.",
    badge: "Intenso Cacao",
    rating: 4.8,
    reviewCount: 18
  },

  // --- FLAN ---
  {
    id: "fln-01",
    name: "Flan Tradicional Casero",
    category: "flan",
    price: 650,
    availability: "Disponible",
    image: "https://images.unsplash.com/photo-1532556660262-1c45d5fae825?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
    description: "El auténtico flan de la abuela, con textura aterciopelada y suave sin burbujas, bañado en caramelo ámbar dorado preparado lentamente.",
    portions: "6-8 porciones",
    ingredients: "Huevos de granja frescos, leche condensada, leche evaporada, vainilla pura, azúcar caramelizada.",
    badge: "Tradición Criolla",
    rating: 5.0,
    reviewCount: 54
  },
  {
    id: "fln-02",
    name: "Flan de Queso Crema Aterciopelado",
    category: "flan",
    price: 780,
    availability: "Disponible",
    image: "https://plus.unsplash.com/premium_photo-1713816697239-14eae3e7385a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
    description: "La cremosidad densa y suntuosa de una tarta de queso fusionada con la dulzura seductora del caramelo líquido tradicional.",
    portions: "6-8 porciones",
    ingredients: "Queso crema Philadelphia, leche condensada, caramelo dorado, extracto de almendras.",
    badge: "El Más Cremoso",
    rating: 4.9,
    reviewCount: 41
  },
  {
    id: "fln-03",
    name: "Flan de Coco Isleño",
    category: "flan",
    price: 720,
    availability: "Disponible",
    image: "https://images.unsplash.com/photo-1772469625117-412cb49042e6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
    description: "Preparado con leche de coco recién extraída y lluvia fina de coco tostado caramelizado en la base.",
    portions: "6-8 porciones",
    ingredients: "Leche y crema de coco de Samaná, coco rallado tostado, caramelo rubio.",
    badge: "Sabor Caribe",
    rating: 4.9,
    reviewCount: 30
  },
  {
    id: "fln-04",
    name: "Chocoflan Pastel Imposible",
    category: "flan",
    price: 850,
    availability: "Bajo Pedido",
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80",
    description: "Doble placer en un solo bocado: base húmeda de bizcocho de chocolate negro coronado por flan suave de caramelo.",
    portions: "8-10 porciones",
    ingredients: "Bizcocho de chocolate fudgy, flan napolitano, caramelo espeso de dulce de leche.",
    badge: "Especialidad",
    rating: 4.8,
    reviewCount: 25
  }
];

// Datos de reseñas iniciales (RF-6.5 y Anexo B - OPINION)
const INITIAL_REVIEWS = [
  {
    id: 1,
    name: "Camila Sánchez",
    product: "Classic Cinnamon Roll",
    rating: 5,
    date: "Ayer",
    comment: "¡Los mejores roles de canela de Santo Domingo sin duda! La masa es súper suavecita y el glaseado tiene el nivel de dulce perfecto.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
  },
  {
    id: 2,
    name: "Alejandro Peña",
    product: "Triple Chocolate Chunk Cookie",
    rating: 5,
    date: "Hace 2 días",
    comment: "Pedí para retirar en tienda por la tarde. El servicio fue rapidísimo, en menos de 2 minutos ya tenía mi cajita lista. La galleta con centro derretido es de otro mundo.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
  },
  {
    id: 3,
    name: "Gabriela Ortiz",
    product: "Strawberry Swirl Cheesecake",
    rating: 5,
    date: "Hace 4 días",
    comment: "Lo compramos para el cumpleaños de mi hermana y todos los invitados quedaron fascinados. Muy fresca la mermelada y el cheesecake super sedoso.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80"
  },
  {
    id: 4,
    name: "Marcos De la Cruz",
    product: "Flan Tradicional Casero",
    rating: 5,
    date: "Hace 1 semana",
    comment: "Tiene exactamente el sabor del flan casero de mi abuela. Cero huequitos de aire, firme pero se deshace en la boca. Recomendadísimo.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80"
  }
];
