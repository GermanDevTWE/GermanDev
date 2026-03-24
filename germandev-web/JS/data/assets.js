/* ============================================
   GERMAN DEV - ASSETS DATA
   Catálogo de Assets y Productos
   ============================================ */

const ASSETS_DATA = {
  // Categorías de assets
  categories: [
    { id: 'all', name: 'Todos', icon: 'fa-layer-group' },
    { id: 'ui', name: 'UI', icon: 'fa-desktop' },
    { id: 'scripts', name: 'Scripts', icon: 'fa-code' },
    { id: 'systems', name: 'Sistemas', icon: 'fa-cogs' },
    { id: 'models', name: 'Modelos', icon: 'fa-cube' },
    { id: 'packs', name: 'Packs', icon: 'fa-box-open' },
    { id: 'animations', name: 'Animaciones', icon: 'fa-running' }
  ],

  // Opciones de ordenamiento
  sortOptions: [
    { id: 'popular', name: 'Más populares' },
    { id: 'newest', name: 'Más recientes' },
    { id: 'price-asc', name: 'Precio: Menor a Mayor' },
    { id: 'price-desc', name: 'Precio: Mayor a Menor' },
    { id: 'rating', name: 'Mejor valorados' }
  ],

  // Catálogo de assets
  assets: [
    {
      id: 'asset-001',
      name: 'Starter Pack RPG',
      description: 'Pack completo para juegos RPG con sistemas de niveles, estadísticas y misiones.',
      category: 'packs',
      price: 49.99,
      currency: 'USD',
      robuxPrice: 15000,
      rating: 5.0,
      reviews: 56,
      tags: ['RPG', 'Starter Pack', 'Sistemas'],
      features: [
        'Sistema de niveles completo',
        'Estadísticas (STR, DEX, INT...)',
        'Sistema de misiones',
        'Inventario básico'
      ],
      icon: 'fa-dungeon',
      downloads: 1250,
      createdAt: '2024-01-15',
      updatedAt: '2024-03-20'
    },
    {
      id: 'asset-002',
      name: 'Sistema de Inventario Pro',
      description: 'Sistema de inventario avanzado con drag & drop, categorías y persistencia de datos.',
      category: 'systems',
      price: 29.99,
      currency: 'USD',
      robuxPrice: 9000,
      rating: 4.9,
      reviews: 42,
      tags: ['Sistema', 'Inventario', 'DataStore'],
      features: [
        'Drag & drop intuitivo',
        'Categorías personalizables',
        'Persistencia con DataStore',
        'UI moderna y responsive'
      ],
      icon: 'fa-box',
      downloads: 890,
      createdAt: '2024-02-01',
      updatedAt: '2024-03-15'
    },
    {
      id: 'asset-003',
      name: 'Pack de Armas Sci-Fi',
      description: '10 armas futuristas con animaciones, sonidos y efectos de partículas.',
      category: 'models',
      price: 34.99,
      currency: 'USD',
      robuxPrice: 10500,
      rating: 4.9,
      reviews: 31,
      tags: ['Armas', 'Sci-Fi', '3D'],
      features: [
        '10 modelos únicos',
        'Animaciones incluidas',
        'Sonidos de alta calidad',
        'Efectos de partículas'
      ],
      icon: 'fa-rocket',
      downloads: 650,
      createdAt: '2024-01-20',
      updatedAt: '2024-03-10'
    },
    {
      id: 'asset-004',
      name: 'Darkwave UI Pack',
      description: 'UI Pack con estilo neón/morado perfecto para juegos de temática oscura.',
      category: 'ui',
      price: 15.99,
      currency: 'USD',
      robuxPrice: 4800,
      rating: 4.8,
      reviews: 24,
      tags: ['UI', 'Neón', 'Moderno'],
      features: [
        '50+ elementos UI',
        'Totalmente escalable',
        'Compatible con todos los dispositivos',
        'Fácil de personalizar'
      ],
      icon: 'fa-palette',
      downloads: 1100,
      createdAt: '2024-02-10',
      updatedAt: '2024-03-22'
    },
    {
      id: 'asset-005',
      name: 'Sistema de Tienda/Economía',
      description: 'Sistema económico completo con múltiples monedas, tiendas y transacciones.',
      category: 'systems',
      price: 22.99,
      currency: 'USD',
      robuxPrice: 6900,
      rating: 4.8,
      reviews: 22,
      tags: ['Economía', 'Tienda', 'Monedas'],
      features: [
        'Múltiples monedas',
        'Tiendas personalizables',
        'Historial de transacciones',
        'Sistema de ofertas'
      ],
      icon: 'fa-coins',
      downloads: 520,
      createdAt: '2024-01-25',
      updatedAt: '2024-03-18'
    },
    {
      id: 'asset-006',
      name: 'Script de Combate Avanzado',
      description: 'Sistema de combate melee con combos, bloqueo y habilidades especiales.',
      category: 'scripts',
      price: 24.99,
      currency: 'USD',
      robuxPrice: 7500,
      rating: 4.7,
      reviews: 18,
      tags: ['Combate', 'Melee', 'Multiplayer'],
      features: [
        'Sistema de combos',
        'Bloqueo y esquiva',
        'Habilidades especiales',
        'Sincronización multiplayer'
      ],
      icon: 'fa-fist-raised',
      downloads: 430,
      createdAt: '2024-02-05',
      updatedAt: '2024-03-12'
    },
    {
      id: 'asset-007',
      name: 'Animaciones de Movimiento',
      description: '20+ animaciones de movimiento profesionales para personajes.',
      category: 'animations',
      price: 19.99,
      currency: 'USD',
      robuxPrice: 6000,
      rating: 4.6,
      reviews: 15,
      tags: ['Animaciones', 'Movimiento', 'Personaje'],
      features: [
        '20+ animaciones únicas',
        'Estilo realista',
        'Loops perfectos',
        'Fácil integración'
      ],
      icon: 'fa-walking',
      downloads: 380,
      createdAt: '2024-02-15',
      updatedAt: '2024-03-08'
    },
    {
      id: 'asset-008',
      name: 'HUD Minimalista',
      description: 'HUD limpio y moderno para cualquier tipo de juego.',
      category: 'ui',
      price: 12.99,
      currency: 'USD',
      robuxPrice: 3900,
      rating: 4.5,
      reviews: 12,
      tags: ['HUD', 'UI', 'Minimalista'],
      features: [
        'Diseño limpio',
        'Personalizable',
        'Bajo uso de recursos',
        'Responsive'
      ],
      icon: 'fa-tachometer-alt',
      downloads: 670,
      createdAt: '2024-02-20',
      updatedAt: '2024-03-05'
    },
    {
      id: 'asset-009',
      name: 'Sistema de Misiones Quest',
      description: 'Sistema completo de misiones con objetivos, recompensas y progresión.',
      category: 'systems',
      price: 27.99,
      currency: 'USD',
      robuxPrice: 8400,
      rating: 4.9,
      reviews: 28,
      tags: ['Misiones', 'Quest', 'Progresión'],
      features: [
        'Tipos de misiones variados',
        'Sistema de recompensas',
        'Progresión guardada',
        'UI intuitiva'
      ],
      icon: 'fa-scroll',
      downloads: 480,
      createdAt: '2024-01-30',
      updatedAt: '2024-03-16'
    },
    {
      id: 'asset-010',
      name: 'Pack de Vehículos',
      description: '8 vehículos personalizables con física realista.',
      category: 'models',
      price: 32.99,
      currency: 'USD',
      robuxPrice: 9900,
      rating: 4.7,
      reviews: 19,
      tags: ['Vehículos', 'Física', '3D'],
      features: [
        '8 modelos diferentes',
        'Física personalizable',
        'Sistema de daño',
        'Personalización de colores'
      ],
      icon: 'fa-car',
      downloads: 340,
      createdAt: '2024-02-08',
      updatedAt: '2024-03-14'
    },
    {
      id: 'asset-011',
      name: 'Chat System Pro',
      description: 'Sistema de chat avanzado con canales, emojis y moderación.',
      category: 'scripts',
      price: 18.99,
      currency: 'USD',
      robuxPrice: 5700,
      rating: 4.6,
      reviews: 14,
      tags: ['Chat', 'Comunicación', 'Social'],
      features: [
        'Canales personalizables',
        'Sistema de emojis',
        'Herramientas de moderación',
        'Menciones y PMs'
      ],
      icon: 'fa-comments',
      downloads: 290,
      createdAt: '2024-02-22',
      updatedAt: '2024-03-06'
    },
    {
      id: 'asset-012',
      name: 'Pack de Efectos de Partículas',
      description: 'Colección de 30+ efectos de partículas para magia, explosiones y más.',
      category: 'packs',
      price: 21.99,
      currency: 'USD',
      robuxPrice: 6600,
      rating: 4.8,
      reviews: 21,
      tags: ['Partículas', 'Efectos', 'VFX'],
      features: [
        '30+ efectos únicos',
        'Magia, fuego, hielo, etc.',
        'Fácil de personalizar',
        'Optimizado para rendimiento'
      ],
      icon: 'fa-magic',
      downloads: 560,
      createdAt: '2024-02-12',
      updatedAt: '2024-03-19'
    }
  ],

  // Métodos de utilidad
  getAssetById(id) {
    return this.assets.find(asset => asset.id === id);
  },

  getAssetsByCategory(category) {
    if (category === 'all') return this.assets;
    return this.assets.filter(asset => asset.category === category);
  },

  getAssetsByTag(tag) {
    return this.assets.filter(asset => asset.tags.includes(tag));
  },

  searchAssets(query) {
    const lowerQuery = query.toLowerCase();
    return this.assets.filter(asset => 
      asset.name.toLowerCase().includes(lowerQuery) ||
      asset.description.toLowerCase().includes(lowerQuery) ||
      asset.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
    );
  },

  sortAssets(assets, sortBy) {
    const sorted = [...assets];
    switch (sortBy) {
      case 'price-asc':
        return sorted.sort((a, b) => a.price - b.price);
      case 'price-desc':
        return sorted.sort((a, b) => b.price - a.price);
      case 'rating':
        return sorted.sort((a, b) => b.rating - a.rating);
      case 'newest':
        return sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      case 'popular':
      default:
        return sorted.sort((a, b) => b.downloads - a.downloads);
    }
  }
};

// Exportar para uso en otros archivos
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ASSETS_DATA;
}
