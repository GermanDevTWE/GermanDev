/* ============================================
   GERMAN DEV - SERVICES DATA
   Planes de Comisión y Servicios
   ============================================ */

const SERVICES_DATA = {
  // Planes de comisión
  tiers: [
    {
      id: 'basic',
      name: 'Básico',
      description: 'Perfecto para proyectos pequeños o mejoras simples',
      price: 5,
      currency: 'USD',
      robuxPrice: 1500,
      deliveryDays: '3-5 días',
      featured: false,
      icon: 'fa-star',
      features: [
        '1 script simple',
        'Corrección de bugs',
        'Optimización básica',
        '1 revisión incluida',
        'Soporte por Discord'
      ],
      notIncluded: [
        'Sistemas complejos',
        'UI/UX personalizado',
        'Modelos 3D'
      ]
    },
    {
      id: 'standard',
      name: 'Estándar',
      description: 'Ideal para la mayoría de proyectos de Roblox',
      price: 15,
      currency: 'USD',
      robuxPrice: 4500,
      deliveryDays: '7-10 días',
      featured: true,
      icon: 'fa-gem',
      features: [
        'Sistema completo',
        'UI/UX personalizado',
        'Hasta 3 revisiones',
        'Documentación incluida',
        'Soporte prioritario',
        'Código comentado'
      ],
      notIncluded: [
        'Modelos 3D complejos',
        'Animaciones personalizadas'
      ]
    },
    {
      id: 'premium',
      name: 'Premium',
      description: 'Para proyectos ambiciosos que necesitan lo mejor',
      price: 50,
      currency: 'USD',
      robuxPrice: 15000,
      deliveryDays: '15-20 días',
      featured: false,
      icon: 'fa-crown',
      features: [
        'Proyecto completo',
        'Sistemas avanzados',
        'UI/UX premium',
        'Revisiones ilimitadas',
        'Soporte 24/7',
        'Código optimizado',
        'Modelos 3D básicos',
        'Guía de implementación'
      ],
      notIncluded: []
    }
  ],

  // Servicios adicionales
  additionalServices: [
    {
      id: 'consulting',
      name: 'Consultoría',
      description: 'Asesoramiento profesional para tu proyecto de Roblox',
      pricePerHour: 10,
      currency: 'USD',
      icon: 'fa-user-tie',
      features: [
        'Revisión de código',
        'Optimización de rendimiento',
        'Arquitectura de sistemas',
        'Mejores prácticas'
      ]
    },
    {
      id: 'debugging',
      name: 'Debugging',
      description: 'Encuentro y soluciono errores en tu juego',
      pricePerHour: 8,
      currency: 'USD',
      icon: 'fa-bug',
      features: [
        'Análisis de errores',
        'Corrección de bugs',
        'Testing completo',
        'Reporte detallado'
      ]
    },
    {
      id: 'optimization',
      name: 'Optimización',
      description: 'Mejoro el rendimiento de tu juego',
      pricePerHour: 12,
      currency: 'USD',
      icon: 'fa-tachometer-alt',
      features: [
        'Análisis de rendimiento',
        'Optimización de scripts',
        'Reducción de lag',
        'Mejora de FPS'
      ]
    }
  ],

  // Tipos de proyectos
  projectTypes: [
    {
      id: 'simulator',
      name: 'Simulador',
      description: 'Juegos de simulación con mecánicas de progresión',
      basePrice: 20,
      icon: 'fa-gamepad'
    },
    {
      id: 'obby',
      name: 'Obby/Tower',
      description: 'Juegos de parkour y torres',
      basePrice: 15,
      icon: 'fa-mountain'
    },
    {
      id: 'rpg',
      name: 'RPG',
      description: 'Juegos de rol con sistemas de progresión',
      basePrice: 35,
      icon: 'fa-dragon'
    },
    {
      id: 'tycoon',
      name: 'Tycoon',
      description: 'Juegos de gestión y construcción',
      basePrice: 25,
      icon: 'fa-industry'
    },
    {
      id: 'horror',
      name: 'Horror',
      description: 'Juegos de terror con atmósfera inmersiva',
      basePrice: 30,
      icon: 'fa-ghost'
    },
    {
      id: 'racing',
      name: 'Carreras',
      description: 'Juegos de carreras con vehículos',
      basePrice: 28,
      icon: 'fa-flag-checkered'
    }
  ],

  // Proceso de trabajo
  workflow: [
    {
      step: 1,
      title: 'Consulta',
      description: 'Discutimos tus necesidades y objetivos',
      icon: 'fa-comments'
    },
    {
      step: 2,
      title: 'Presupuesto',
      description: 'Recibes un presupuesto detallado',
      icon: 'fa-file-invoice-dollar'
    },
    {
      step: 3,
      title: 'Desarrollo',
      description: 'Comienzo a trabajar en tu proyecto',
      icon: 'fa-code'
    },
    {
      step: 4,
      title: 'Revisiones',
      description: 'Iteramos según tus comentarios',
      icon: 'fa-sync'
    },
    {
      step: 5,
      title: 'Entrega',
      description: 'Recibes el proyecto completo',
      icon: 'fa-check-circle'
    }
  ],

  // FAQ
  faq: [
    {
      question: '¿Cómo funciona el proceso de comisión?',
      answer: 'Primero me contactas con los detalles de tu proyecto. Evalúo el alcance y te envío un presupuesto. Una vez aceptado, comienzo el desarrollo con actualizaciones regulares.'
    },
    {
      question: '¿Qué métodos de pago aceptas?',
      answer: 'Acepto PayPal, transferencia bancaria y Robux. Para proyectos grandes, podemos dividir el pago en milestones.'
    },
    {
      question: '¿Cuánto tiempo toma completar un proyecto?',
      answer: 'Depende de la complejidad. Un script simple puede tomar 2-3 días, mientras que un proyecto completo puede tomar 2-3 semanas.'
    },
    {
      question: '¿Ofreces soporte después de la entrega?',
      answer: 'Sí, ofrezco soporte gratuito por 30 días después de la entrega para corregir cualquier bug o problema.'
    },
    {
      question: '¿Puedo ver ejemplos de tu trabajo?',
      answer: '¡Por supuesto! Visita la sección de Portfolio para ver mis proyectos publicados o contáctame para ver demos privadas.'
    }
  ],

  // Métodos de utilidad
  getTierById(id) {
    return this.tiers.find(tier => tier.id === id);
  },

  getFeaturedTier() {
    return this.tiers.find(tier => tier.featured);
  },

  getServiceById(id) {
    return this.additionalServices.find(service => service.id === id);
  },

  getProjectTypeById(id) {
    return this.projectTypes.find(type => type.id === id);
  },

  calculateEstimate(projectTypeId, tierId, complexity = 'medium') {
    const projectType = this.getProjectTypeById(projectTypeId);
    const tier = this.getTierById(tierId);
    
    if (!projectType || !tier) return null;

    const complexityMultiplier = {
      low: 0.8,
      medium: 1,
      high: 1.5
    };

    const basePrice = projectType.basePrice;
    const tierMultiplier = tier.id === 'basic' ? 1 : tier.id === 'standard' ? 1.5 : 2.5;
    const multiplier = complexityMultiplier[complexity] || 1;

    return {
      estimatedPrice: Math.round(basePrice * tierMultiplier * multiplier),
      estimatedDays: tier.deliveryDays,
      currency: tier.currency
    };
  }
};

// Exportar para uso en otros archivos
if (typeof module !== 'undefined' && module.exports) {
  module.exports = SERVICES_DATA;
}
