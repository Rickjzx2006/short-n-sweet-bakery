/**
 * SHORT N' SWEET BAKERY - Módulo del Carrito de Compras
 * Universidad APEC - Diseño Web (Grupo No. 01)
 * Requerimientos: RF-1.5, RF-2.4, RF-3.1, RF-3.2, RF-3.3, RF-3.4, RF-3.5
 */

class ShoppingCart {
  constructor() {
    this.storageKey = 'sns_bakery_cart';
    this.deliveryType = 'pickup'; // 'pickup' o 'shipping'
    this.shippingCost = 175; // RD$ 175 costo fijo en caso de Shipping (RF-5.3)
    this.taxRate = 0.18; // 18% ITBIS estándar
    this.items = this.loadCart();
    
    this.initElements();
    this.bindEvents();
    this.render();
  }

  // Carga del carrito desde localStorage (persistencia de sesión)
  loadCart() {
    try {
      const saved = localStorage.getItem(this.storageKey);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error("Error al cargar carrito desde localStorage:", e);
      return [];
    }
  }

  // Guardar estado en localStorage
  saveCart() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.items));
    } catch (e) {
      console.error("Error al guardar carrito:", e);
    }
  }

  initElements() {
    this.drawer = document.getElementById('cartDrawer');
    this.backdrop = document.getElementById('cartBackdrop');
    this.cartItemsContainer = document.getElementById('cartItemsList');
    this.cartEmptyState = document.getElementById('cartEmptyState');
    this.cartFooter = document.getElementById('cartFooter');
    
    // Contadores e importes
    this.badgeCounters = document.querySelectorAll('.cart-count-badge');
    this.subtotalElement = document.getElementById('cartSubtotal');
    this.taxElement = document.getElementById('cartTax');
    this.shippingRow = document.getElementById('cartShippingRow');
    this.shippingElement = document.getElementById('cartShippingCost');
    this.totalElement = document.getElementById('cartTotal');
    
    // Botones
    this.openButtons = document.querySelectorAll('[data-action="open-cart"]');
    this.closeButtons = document.querySelectorAll('[data-action="close-cart"]');
    this.checkoutButton = document.getElementById('btnProceedCheckout');
  }

  bindEvents() {
    // Abrir carrito
    this.openButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        this.openDrawer();
      });
    });

    // Cerrar carrito
    this.closeButtons.forEach(btn => {
      btn.addEventListener('click', () => this.closeDrawer());
    });

    if (this.backdrop) {
      this.backdrop.addEventListener('click', () => this.closeDrawer());
    }

    // Tecla Escape para cerrar
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isDrawerOpen()) {
        this.closeDrawer();
      }
    });

    // Proceder al checkout
    if (this.checkoutButton) {
      this.checkoutButton.addEventListener('click', () => {
        if (this.items.length === 0) return;
        this.closeDrawer();
        if (window.openCheckoutModal) {
          window.openCheckoutModal();
        }
      });
    }
  }

  openDrawer() {
    if (!this.drawer) return;
    this.drawer.classList.add('active');
    if (this.backdrop) this.backdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  closeDrawer() {
    if (!this.drawer) return;
    this.drawer.classList.remove('active');
    if (this.backdrop) this.backdrop.classList.remove('active');
    document.body.style.overflow = '';
  }

  isDrawerOpen() {
    return this.drawer && this.drawer.classList.contains('active');
  }

  // Agregar un producto (RF-2.3, RF-2.4)
  addItem(productId, quantity = 1) {
    const product = PRODUCTS_DATA.find(p => p.id === productId);
    if (!product) return;

    if (product.availability === 'Agotado') {
      window.showToast?.('Lo sentimos, este postre está agotado por el momento.', 'warning');
      return;
    }

    const existingIndex = this.items.findIndex(item => item.id === productId);
    if (existingIndex > -1) {
      this.items[existingIndex].quantity += quantity;
    } else {
      this.items.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category,
        quantity: quantity
      });
    }

    this.saveCart();
    this.render();
    window.showToast?.(`¡Añadido! ${product.name} al carrito.`, 'success');
  }

  // Modificar cantidad (RF-3.3)
  updateQuantity(productId, delta) {
    const item = this.items.find(i => i.id === productId);
    if (!item) return;

    item.quantity += delta;
    if (item.quantity <= 0) {
      this.removeItem(productId, false);
      return;
    }

    this.saveCart();
    this.render();
  }

  // Eliminar producto completo del carrito (RF-3.3)
  removeItem(productId, notify = true) {
    const item = this.items.find(i => i.id === productId);
    this.items = this.items.filter(i => i.id !== productId);
    this.saveCart();
    this.render();
    if (notify && item) {
      window.showToast?.(`${item.name} ha sido retirado del carrito.`, 'info');
    }
  }

  // Vaciar carrito tras completar compra
  clearCart() {
    this.items = [];
    this.saveCart();
    this.render();
  }

  // Cambio de modalidad de entrega: Pick up vs Shipping (RF-5.1, RF-5.2, RF-5.3)
  setDeliveryType(type) {
    this.deliveryType = type;
    this.render();
  }

  // Cálculos de montos y totales (RF-3.4)
  getCalculations() {
    const subtotal = this.items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const tax = Math.round(subtotal * this.taxRate);
    const shipping = (this.deliveryType === 'shipping' && this.items.length > 0) ? this.shippingCost : 0;
    const total = subtotal + tax + shipping;
    const totalCount = this.items.reduce((acc, item) => acc + item.quantity, 0);

    return {
      subtotal,
      tax,
      shipping,
      total,
      totalCount
    };
  }

  // Formato de moneda dominicana
  formatCurrency(amount) {
    return `RD$ ${amount.toLocaleString('es-DO', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }

  // Renderizado dinámico del DOM
  render() {
    const { subtotal, tax, shipping, total, totalCount } = this.getCalculations();

    // Actualizar contadores del Header (RF-1.5)
    this.badgeCounters.forEach(badge => {
      badge.textContent = totalCount;
      badge.classList.toggle('has-items', totalCount > 0);
      if (totalCount > 0) {
        badge.classList.remove('pulse-animation');
        void badge.offsetWidth; // trigger reflow
        badge.classList.add('pulse-animation');
      }
    });

    // Manejar estado vacío
    if (this.items.length === 0) {
      if (this.cartItemsContainer) this.cartItemsContainer.innerHTML = '';
      if (this.cartEmptyState) this.cartEmptyState.style.display = 'flex';
      if (this.cartFooter) this.cartFooter.style.display = 'none';
      return;
    }

    if (this.cartEmptyState) this.cartEmptyState.style.display = 'none';
    if (this.cartFooter) this.cartFooter.style.display = 'block';

    // Desglose de productos (RF-3.2)
    if (this.cartItemsContainer) {
      this.cartItemsContainer.innerHTML = this.items.map(item => {
        const itemTotal = item.price * item.quantity;
        return `
          <div class="cart-item" data-id="${item.id}">
            <img src="${item.image}" alt="${item.name}" class="cart-item-img" loading="lazy">
            <div class="cart-item-info">
              <div class="cart-item-header">
                <h4 class="cart-item-title">${item.name}</h4>
                <button type="button" class="btn-remove-item" onclick="window.cartInstance.removeItem('${item.id}')" aria-label="Eliminar ${item.name}">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                  </svg>
                </button>
              </div>
              <div class="cart-item-price-unit">${this.formatCurrency(item.price)} c/u</div>
              <div class="cart-item-actions">
                <div class="quantity-stepper">
                  <button type="button" class="stepper-btn" onclick="window.cartInstance.updateQuantity('${item.id}', -1)" aria-label="Disminuir">-</button>
                  <span class="stepper-value">${item.quantity}</span>
                  <button type="button" class="stepper-btn" onclick="window.cartInstance.updateQuantity('${item.id}', 1)" aria-label="Aumentar">+</button>
                </div>
                <div class="cart-item-subtotal">${this.formatCurrency(itemTotal)}</div>
              </div>
            </div>
          </div>
        `;
      }).join('');
    }

    // Actualizar resumen de importes (RF-3.4)
    if (this.subtotalElement) this.subtotalElement.textContent = this.formatCurrency(subtotal);
    if (this.taxElement) this.taxElement.textContent = this.formatCurrency(tax);
    
    if (this.shippingRow && this.shippingElement) {
      if (this.deliveryType === 'shipping') {
        this.shippingRow.style.display = 'flex';
        this.shippingElement.textContent = this.formatCurrency(shipping);
      } else {
        this.shippingRow.style.display = 'none';
      }
    }

    if (this.totalElement) this.totalElement.textContent = this.formatCurrency(total);
  }
}
