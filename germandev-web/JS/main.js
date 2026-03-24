/* ============================================
   GERMAN DEV - MAIN JS
   Núcleo Lógico: Router, Carrito, Auth, Animaciones
   ============================================ */

// ============================================
// CONFIGURACIÓN GLOBAL
// ============================================

// Helper para obtener rutas correctas según la ubicación actual
function getPath(path) {
  // Detectar si estamos en una subpágina (dentro de Sub-Web/)
  const isSubPage = window.location.pathname.includes('/Sub-Web/');
  
  if (isSubPage) {
    // En subpáginas, las rutas son relativas a Sub-Web/
    return path.replace('Sub-Web/', '');
  }
  // En la raíz, las rutas incluyen Sub-Web/
  return path;
}

const CONFIG = {
  colors: {
    primary: '#8B5CF6',
    primaryLight: '#A78BFA',
    primaryDark: '#7C3AED',
    bgDark: '#050505',
    bgCard: '#0A0A0A',
    success: '#22C55E',
    warning: '#F59E0B',
    error: '#EF4444'
  },
  particles: {
    count: 80,
    connectionDistance: 150,
    mouseRepelRadius: 120,
    speed: 0.5
  },
  api: {
    robloxProxy: 'https://games.roproxy.com/v1/games',
    thumbnailsProxy: 'https://thumbnails.roproxy.com/v1/games'
  }
};

// ============================================
// SISTEMA DE PARTÍCULAS CANVAS (NEURAL WEB)
// ============================================
class ParticleSystem {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.mouse = { x: null, y: null };
    this.animationId = null;
    
    this.init();
  }
  
  init() {
    this.resize();
    this.createParticles();
    this.bindEvents();
    this.animate();
  }
  
  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }
  
  createParticles() {
    this.particles = [];
    const count = window.matchMedia('(pointer: coarse)').matches ? 30 : CONFIG.particles.count;
    
    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        vx: (Math.random() - 0.5) * CONFIG.particles.speed,
        vy: (Math.random() - 0.5) * CONFIG.particles.speed,
        radius: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.2
      });
    }
  }
  
  bindEvents() {
    window.addEventListener('resize', () => {
      this.resize();
      this.createParticles();
    });
    
    window.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
    });
    
    window.addEventListener('mouseleave', () => {
      this.mouse.x = null;
      this.mouse.y = null;
    });
  }
  
  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Actualizar y dibujar partículas
    this.particles.forEach((particle, i) => {
      // Física de repulsión del mouse
      if (this.mouse.x !== null && this.mouse.y !== null) {
        const dx = particle.x - this.mouse.x;
        const dy = particle.y - this.mouse.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < CONFIG.particles.mouseRepelRadius) {
          const force = (CONFIG.particles.mouseRepelRadius - distance) / CONFIG.particles.mouseRepelRadius;
          const angle = Math.atan2(dy, dx);
          particle.vx += Math.cos(angle) * force * 0.5;
          particle.vy += Math.sin(angle) * force * 0.5;
        }
      }
      
      // Aplicar velocidad con fricción
      particle.x += particle.vx;
      particle.y += particle.vy;
      particle.vx *= 0.99;
      particle.vy *= 0.99;
      
      // Rebote en bordes
      if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -1;
      if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -1;
      
      // Mantener dentro del canvas
      particle.x = Math.max(0, Math.min(this.canvas.width, particle.x));
      particle.y = Math.max(0, Math.min(this.canvas.height, particle.y));
      
      // Dibujar partícula
      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(139, 92, 246, ${particle.opacity})`;
      this.ctx.fill();
      
      // Conexiones entre partículas
      for (let j = i + 1; j < this.particles.length; j++) {
        const other = this.particles[j];
        const dx = particle.x - other.x;
        const dy = particle.y - other.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < CONFIG.particles.connectionDistance) {
          const opacity = (1 - distance / CONFIG.particles.connectionDistance) * 0.2;
          this.ctx.beginPath();
          this.ctx.moveTo(particle.x, particle.y);
          this.ctx.lineTo(other.x, other.y);
          this.ctx.strokeStyle = `rgba(139, 92, 246, ${opacity})`;
          this.ctx.lineWidth = 1;
          this.ctx.stroke();
        }
      }
    });
    
    this.animationId = requestAnimationFrame(() => this.animate());
  }
  
  destroy() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  }
}

// ============================================
// SISTEMA DE AUTENTICACIÓN
// ============================================
class AuthSystem {
  constructor() {
    this.currentUser = null;
    this.isAuthenticated = false;
    this.loadUser();
  }
  
  loadUser() {
    const saved = localStorage.getItem('germandev_user');
    if (saved) {
      try {
        this.currentUser = JSON.parse(saved);
        this.isAuthenticated = true;
      } catch (e) {
        console.error('Error loading user:', e);
      }
    }
  }
  
  register(userData) {
    const user = {
      id: 'user_' + Date.now(),
      username: userData.username || userData.email.split('@')[0],
      email: userData.email,
      robloxUser: userData.robloxUser || null,
      avatar: null,
      createdAt: new Date().toISOString(),
      purchases: [],
      assets: [],
      settings: {
        emailNotifications: true,
        newAssetNotifications: false
      }
    };
    
    localStorage.setItem('germandev_user', JSON.stringify(user));
    this.currentUser = user;
    this.isAuthenticated = true;
    
    return { success: true, user };
  }
  
  login(email, password) {
    // Simulación de login - en producción sería una llamada a API
    const saved = localStorage.getItem('germandev_user');
    if (saved) {
      const user = JSON.parse(saved);
      if (user.email === email) {
        this.currentUser = user;
        this.isAuthenticated = true;
        return { success: true, user };
      }
    }
    return { success: false, error: 'Credenciales inválidas' };
  }
  
  logout() {
    this.currentUser = null;
    this.isAuthenticated = false;
    localStorage.removeItem('germandev_user');
    window.location.href = 'index.html';
  }
  
  updateUser(data) {
    if (!this.currentUser) return { success: false };
    
    this.currentUser = { ...this.currentUser, ...data };
    localStorage.setItem('germandev_user', JSON.stringify(this.currentUser));
    return { success: true, user: this.currentUser };
  }
  
  addPurchase(purchase) {
    if (!this.currentUser) return;
    
    this.currentUser.purchases.unshift({
      ...purchase,
      id: 'pur_' + Date.now(),
      date: new Date().toISOString(),
      status: 'completed'
    });
    
    localStorage.setItem('germandev_user', JSON.stringify(this.currentUser));
  }
  
  addAsset(assetId) {
    if (!this.currentUser) return;
    
    if (!this.currentUser.assets.includes(assetId)) {
      this.currentUser.assets.push(assetId);
      localStorage.setItem('germandev_user', JSON.stringify(this.currentUser));
    }
  }
  
  requireAuth() {
    if (!this.isAuthenticated) {
      window.location.href = getPath('Sub-Web/Login.html') + '?redirect=' + encodeURIComponent(window.location.href);
      return false;
    }
    return true;
  }
  
  updateUI() {
    const authBtn = document.querySelector('.auth-btn');
    const userAvatar = document.querySelector('.user-avatar');
    
    if (this.isAuthenticated && this.currentUser) {
      if (authBtn) {
        authBtn.innerHTML = `<i class="fas fa-user"></i> <span>${this.currentUser.username}</span>`;
        authBtn.onclick = () => window.location.href = getPath('Sub-Web/Dashboard.html');
      }
      if (userAvatar) {
        userAvatar.textContent = this.currentUser.username.charAt(0).toUpperCase();
        userAvatar.style.display = 'flex';
      }
    } else {
      if (authBtn) {
        authBtn.innerHTML = `<i class="fas fa-user"></i> <span>Iniciar sesión</span>`;
        authBtn.onclick = () => window.location.href = getPath('Sub-Web/Login.html');
      }
      if (userAvatar) {
        userAvatar.style.display = 'none';
      }
    }
  }
}

// ============================================
// SISTEMA DE CARRITO
// ============================================
class CartSystem {
  constructor() {
    this.items = [];
    this.loadCart();
  }
  
  loadCart() {
    const saved = localStorage.getItem('germandev_cart');
    if (saved) {
      try {
        this.items = JSON.parse(saved);
      } catch (e) {
        console.error('Error loading cart:', e);
      }
    }
  }
  
  saveCart() {
    localStorage.setItem('germandev_cart', JSON.stringify(this.items));
    this.updateUI();
  }
  
  addItem(item) {
    const existing = this.items.find(i => i.id === item.id);
    if (existing) {
      return { success: false, error: 'Este asset ya está en el carrito' };
    }
    
    this.items.push({
      ...item,
      addedAt: new Date().toISOString()
    });
    
    this.saveCart();
    return { success: true };
  }
  
  removeItem(itemId) {
    this.items = this.items.filter(i => i.id !== itemId);
    this.saveCart();
  }
  
  clear() {
    this.items = [];
    this.saveCart();
  }
  
  getTotal() {
    return this.items.reduce((sum, item) => sum + item.price, 0);
  }
  
  getCount() {
    return this.items.length;
  }
  
  updateUI() {
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
      cartCount.textContent = this.getCount();
      cartCount.style.display = this.getCount() > 0 ? 'flex' : 'none';
    }
  }
  
  // Animación fly-to-cart
  animateFlyToCart(element, cartBtn) {
    const rect = element.getBoundingClientRect();
    const cartRect = cartBtn.getBoundingClientRect();
    
    const clone = element.cloneNode(true);
    clone.style.position = 'fixed';
    clone.style.left = rect.left + 'px';
    clone.style.top = rect.top + 'px';
    clone.style.width = rect.width + 'px';
    clone.style.height = rect.height + 'px';
    clone.style.zIndex = '9999';
    clone.style.pointerEvents = 'none';
    clone.classList.add('fly-to-cart');
    
    // Calcular trayectoria Bezier
    const deltaX = cartRect.left - rect.left;
    const deltaY = cartRect.top - rect.top;
    
    clone.style.setProperty('--fly-x', deltaX + 'px');
    clone.style.setProperty('--fly-y', deltaY + 'px');
    
    document.body.appendChild(clone);
    
    // Animar carrito
    cartBtn.classList.add('cart-bounce');
    setTimeout(() => cartBtn.classList.remove('cart-bounce'), 300);
    
    // Limpiar
    setTimeout(() => clone.remove(), 800);
  }
}

// ============================================
// SISTEMA DE NOTIFICACIONES (TOASTS)
// ============================================
class ToastSystem {
  constructor() {
    this.container = null;
    this.createContainer();
  }
  
  createContainer() {
    this.container = document.createElement('div');
    this.container.className = 'toast-container';
    document.body.appendChild(this.container);
  }
  
  show(message, type = 'info', duration = 3000) {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    const icons = {
      success: 'fa-check-circle',
      error: 'fa-times-circle',
      info: 'fa-info-circle',
      warning: 'fa-exclamation-circle'
    };
    
    toast.innerHTML = `
      <i class="fas ${icons[type]} toast-icon"></i>
      <span class="toast-message">${message}</span>
    `;
    
    this.container.appendChild(toast);
    
    // Auto-remove
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(100%)';
      setTimeout(() => toast.remove(), 300);
    }, duration);
  }
  
  success(message) {
    this.show(message, 'success');
  }
  
  error(message) {
    this.show(message, 'error');
  }
  
  info(message) {
    this.show(message, 'info');
  }
  
  warning(message) {
    this.show(message, 'warning');
  }
}

// ============================================
// SISTEMA DE MODALES
// ============================================
class ModalSystem {
  constructor() {
    this.activeModal = null;
  }
  
  open(content, options = {}) {
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    
    const modal = document.createElement('div');
    modal.className = 'modal';
    
    modal.innerHTML = `
      <div class="modal-header">
        <h3 class="modal-title">${options.title || ''}</h3>
        <button class="modal-close"><i class="fas fa-times"></i></button>
      </div>
      <div class="modal-body">${content}</div>
    `;
    
    overlay.appendChild(modal);
    document.body.appendChild(overlay);
    
    // Eventos
    overlay.querySelector('.modal-close').onclick = () => this.close();
    overlay.onclick = (e) => {
      if (e.target === overlay) this.close();
    };
    
    // Mostrar con animación
    requestAnimationFrame(() => {
      overlay.classList.add('active');
    });
    
    this.activeModal = overlay;
    document.body.style.overflow = 'hidden';
    
    return overlay;
  }
  
  close() {
    if (this.activeModal) {
      this.activeModal.classList.remove('active');
      setTimeout(() => {
        this.activeModal.remove();
        this.activeModal = null;
        document.body.style.overflow = '';
      }, 300);
    }
  }
  
  // Modales predefinidos
  openTerms() {
    const content = `
      <h4>Términos de Servicio</h4>
      <p>Al utilizar GermanDev, aceptas los siguientes términos:</p>
      <ul style="margin: 1rem 0; padding-left: 1.5rem; color: var(--text-secondary);">
        <li>Todos los assets vendidos son para uso personal o comercial en proyectos de Roblox.</li>
        <li>No se permite revender o redistribuir los assets.</li>
        <li>El soporte técnico está incluido por 30 días después de la compra.</li>
        <li>Las comisiones requieren un acuerdo previo y pago inicial.</li>
        <li>Los reembolsos se evalúan caso por caso.</li>
      </ul>
      <p style="color: var(--text-muted); font-size: 0.875rem;">Última actualización: Marzo 2024</p>
    `;
    this.open(content, { title: 'Términos de Servicio' });
  }
  
  openPrivacy() {
    const content = `
      <h4>Política de Privacidad</h4>
      <p>En GermanDev valoramos tu privacidad:</p>
      <ul style="margin: 1rem 0; padding-left: 1.5rem; color: var(--text-secondary);">
        <li>Recopilamos solo la información necesaria para el funcionamiento del sitio.</li>
        <li>Tus datos de pago son procesados de forma segura por terceros.</li>
        <li>No compartimos tu información con terceros sin tu consentimiento.</li>
        <li>Puedes solicitar la eliminación de tus datos en cualquier momento.</li>
        <li>Usamos cookies para mejorar la experiencia de usuario.</li>
      </ul>
      <p style="color: var(--text-muted); font-size: 0.875rem;">Para más información, contáctanos.</p>
    `;
    this.open(content, { title: 'Política de Privacidad' });
  }
  
  openRefunds() {
    const content = `
      <h4>Política de Reembolsos</h4>
      <p>Nuestra política de reembolsos:</p>
      <ul style="margin: 1rem 0; padding-left: 1.5rem; color: var(--text-secondary);">
        <li>Reembolso completo dentro de las primeras 24 horas si el asset no funciona.</li>
        <li>No se realizan reembolsos por cambio de opinión después de 24 horas.</li>
        <li>Para comisiones, el reembolso depende del progreso del trabajo.</li>
        <li>Los reembolsos pueden tardar 5-10 días hábiles en procesarse.</li>
        <li>Contáctanos para iniciar un proceso de reembolso.</li>
      </ul>
      <p style="color: var(--text-muted); font-size: 0.875rem;">Caso por caso evaluado individualmente.</p>
    `;
    this.open(content, { title: 'Política de Reembolsos' });
  }
}

// ============================================
// INTEGRACIÓN CON ROBLOX API
// ============================================
class RobloxAPI {
  constructor() {
    this.cache = new Map();
    this.cacheTimeout = 5 * 60 * 1000; // 5 minutos
  }
  
  async fetchGames(universeIds) {
    const cacheKey = universeIds.join(',');
    const cached = this.cache.get(cacheKey);
    
    if (cached && Date.now() - cached.timestamp < this.cacheTimeout) {
      return cached.data;
    }
    
    try {
      const response = await fetch(`${CONFIG.api.robloxProxy}?universeIds=${universeIds.join(',')}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (!response.ok) throw new Error('API Error');
      
      const data = await response.json();
      
      // Guardar en caché
      this.cache.set(cacheKey, {
        data: data.data,
        timestamp: Date.now()
      });
      
      return data.data;
    } catch (error) {
      console.error('Error fetching Roblox games:', error);
      return null;
    }
  }
  
  async fetchThumbnails(universeIds) {
    try {
      const response = await fetch(
        `${CONFIG.api.thumbnailsProxy}/multiget/thumbnails?universeIds=${universeIds.join(',')}&size=768x432&format=Png&isCircular=false`,
        {
          method: 'GET',
          headers: {
            'Accept': 'application/json'
          }
        }
      );
      
      if (!response.ok) throw new Error('API Error');
      
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error('Error fetching thumbnails:', error);
      return null;
    }
  }
  
  calculateRating(upvotes, downvotes) {
    if (upvotes + downvotes === 0) return 0;
    return Math.round((upvotes / (upvotes + downvotes)) * 100);
  }
  
  formatNumber(num) {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  }
}

// ============================================
// ANIMACIONES GSAP
// ============================================
class AnimationSystem {
  constructor() {
    this.initScrollAnimations();
  }
  
  initScrollAnimations() {
    const revealElements = document.querySelectorAll('.reveal');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });
    
    revealElements.forEach(el => observer.observe(el));
  }
  
  // Animación de entrada para elementos
  fadeInUp(element, delay = 0) {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    
    setTimeout(() => {
      element.style.opacity = '1';
      element.style.transform = 'translateY(0)';
    }, delay);
  }
  
  // Animación de contador
  animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const update = () => {
      current += increment;
      if (current < target) {
        element.textContent = Math.floor(current);
        requestAnimationFrame(update);
      } else {
        element.textContent = target;
      }
    };
    
    update();
  }
  
  // Efecto de escritura (typewriter)
  typewriter(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';
    
    const type = () => {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
        setTimeout(type, speed);
      }
    };
    
    type();
  }
}

// ============================================
// UTILIDADES
// ============================================
const Utils = {
  // Copiar al portapapeles
  async copyToClipboard(text) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (err) {
      // Fallback
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      
      try {
        document.execCommand('copy');
        return true;
      } catch (e) {
        return false;
      } finally {
        textarea.remove();
      }
    }
  },
  
  // Formatear precio
  formatPrice(price, currency = 'USD') {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(price);
  },
  
  // Formatear fecha
  formatDate(dateString) {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  },
  
  // Debounce
  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },
  
  // Generar ID único
  generateId() {
    return 'id_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  },
  
  // Validar email
  isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  },
  
  // Validar contraseña fuerte
  isStrongPassword(password) {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
    return {
      isValid: password.length >= minLength && hasUpperCase && hasLowerCase && hasNumbers,
      checks: {
        length: password.length >= minLength,
        uppercase: hasUpperCase,
        lowercase: hasLowerCase,
        number: hasNumbers,
        special: hasSpecialChar
      }
    };
  }
};

// ============================================
// INICIALIZACIÓN GLOBAL
// ============================================
const App = {
  particles: null,
  auth: null,
  cart: null,
  toast: null,
  modal: null,
  roblox: null,
  animation: null,
  
  init() {
    // Inicializar sistemas
    this.particles = new ParticleSystem('particles-canvas');
    this.auth = new AuthSystem();
    this.cart = new CartSystem();
    this.toast = new ToastSystem();
    this.modal = new ModalSystem();
    this.roblox = new RobloxAPI();
    this.animation = new AnimationSystem();
    
    // Actualizar UI inicial
    this.auth.updateUI();
    this.cart.updateUI();
    
    // Inicializar componentes
    this.initNavbar();
    this.initMobileMenu();
    this.initCartSidebar();
    this.initFooterLinks();
    this.initPreloader();
    
    console.log('GermanDev App initialized');
  },
  
  initNavbar() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    
    window.addEventListener('scroll', Utils.debounce(() => {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }, 50));
  },
  
  initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileOverlay = document.querySelector('.mobile-menu-overlay');
    const mobileClose = document.querySelector('.mobile-menu-close');
    
    if (menuToggle && mobileOverlay) {
      menuToggle.addEventListener('click', () => {
        mobileOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
      
      mobileOverlay.addEventListener('click', (e) => {
        if (e.target === mobileOverlay) {
          mobileOverlay.classList.remove('active');
          document.body.style.overflow = '';
        }
      });
      
      if (mobileClose) {
        mobileClose.addEventListener('click', () => {
          mobileOverlay.classList.remove('active');
          document.body.style.overflow = '';
        });
      }
    }
  },
  
  initCartSidebar() {
    const cartBtn = document.querySelector('.cart-btn');
    const cartSidebar = document.querySelector('.cart-sidebar');
    const cartClose = document.querySelector('.cart-close');
    const cartOverlay = document.querySelector('.cart-overlay');
    
    if (cartBtn && cartSidebar) {
      cartBtn.addEventListener('click', () => {
        cartSidebar.classList.add('open');
        if (cartOverlay) cartOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        this.renderCartItems();
      });
      
      if (cartClose) {
        cartClose.addEventListener('click', this.closeCart.bind(this));
      }
      
      if (cartOverlay) {
        cartOverlay.addEventListener('click', this.closeCart.bind(this));
      }
    }
  },
  
  closeCart() {
    const cartSidebar = document.querySelector('.cart-sidebar');
    const cartOverlay = document.querySelector('.cart-overlay');
    
    if (cartSidebar) cartSidebar.classList.remove('open');
    if (cartOverlay) cartOverlay.classList.remove('active');
    document.body.style.overflow = '';
  },
  
  renderCartItems() {
    const cartItems = document.querySelector('.cart-items');
    const cartTotalValue = document.querySelector('.cart-total-value');
    
    if (!cartItems) return;
    
    if (this.cart.items.length === 0) {
      cartItems.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-icon"><i class="fas fa-shopping-cart"></i></div>
          <h4 class="empty-state-title">Tu carrito está vacío</h4>
          <p class="empty-state-description">Explora la tienda y encuentra assets increíbles.</p>
          <a href="${getPath('Sub-Web/Assets.html')}" class="btn btn-primary empty-state-action">Ver tienda</a>
        </div>
      `;
    } else {
      cartItems.innerHTML = this.cart.items.map(item => `
        <div class="cart-item" data-id="${item.id}">
          <div class="cart-item-image">
            <i class="fas ${item.icon || 'fa-box'}"></i>
          </div>
          <div class="cart-item-details">
            <div class="cart-item-name">${item.name}</div>
            <div class="cart-item-price">${Utils.formatPrice(item.price)}</div>
          </div>
          <button class="cart-item-remove" onclick="App.removeFromCart('${item.id}')">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      `).join('');
    }
    
    if (cartTotalValue) {
      cartTotalValue.textContent = Utils.formatPrice(this.cart.getTotal());
    }
  },
  
  removeFromCart(itemId) {
    this.cart.removeItem(itemId);
    this.renderCartItems();
    this.toast.success('Item eliminado del carrito');
  },
  
  initFooterLinks() {
    // Términos
    const termsLink = document.querySelector('[data-modal="terms"]');
    if (termsLink) {
      termsLink.addEventListener('click', (e) => {
        e.preventDefault();
        this.modal.openTerms();
      });
    }
    
    // Privacidad
    const privacyLink = document.querySelector('[data-modal="privacy"]');
    if (privacyLink) {
      privacyLink.addEventListener('click', (e) => {
        e.preventDefault();
        this.modal.openPrivacy();
      });
    }
    
    // Reembolsos
    const refundLink = document.querySelector('[data-modal="refunds"]');
    if (refundLink) {
      refundLink.addEventListener('click', (e) => {
        e.preventDefault();
        this.modal.openRefunds();
      });
    }
    
    // Copy to clipboard
    const copyLinks = document.querySelectorAll('[data-copy]');
    copyLinks.forEach(link => {
      link.addEventListener('click', async (e) => {
        e.preventDefault();
        const text = link.dataset.copy;
        const success = await Utils.copyToClipboard(text);
        if (success) {
          this.toast.success('¡Copiado al portapapeles!');
        } else {
          this.toast.error('Error al copiar');
        }
      });
    });
  },
  
  initPreloader() {
    const preloader = document.querySelector('.preloader');
    if (!preloader) return;
    
    window.addEventListener('load', () => {
      setTimeout(() => {
        preloader.classList.add('hidden');
      }, 1500);
    });
  },
  
  // Método para añadir al carrito desde cualquier página
  addToCart(item, element) {
    if (!this.auth.isAuthenticated) {
      this.toast.warning('Inicia sesión para comprar');
      setTimeout(() => {
        window.location.href = getPath('Sub-Web/Login.html');
      }, 1500);
      return;
    }
    
    const result = this.cart.addItem(item);
    
    if (result.success) {
      const cartBtn = document.querySelector('.cart-btn');
      if (element && cartBtn) {
        this.cart.animateFlyToCart(element, cartBtn);
      }
      this.toast.success('¡Agregado al carrito!');
    } else {
      this.toast.error(result.error);
    }
  }
};

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  App.init();
});

// Exponer App globalmente para uso en HTML
window.App = App;
window.Utils = Utils;
