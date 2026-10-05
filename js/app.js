/**
 * SHORT N' SWEET BAKERY - Aplicación Principal (UI, Interacciones, Filtros, Checkout)
 * Universidad APEC - Diseño Web (Grupo No. 01)
 * Integrantes: Anna Kunhardt, Darwin Rodriguez, Merdrys Dickson, Ricardo Jiménez, Samuel Perez
 */

document.addEventListener('DOMContentLoaded', () => {
  // Inicialización de la instancia global del carrito
  window.cartInstance = new ShoppingCart();

  // Inicialización de módulos
  initCatalog();
  initSearchAndFilters();
  initProductModal();
  initCheckoutFlow();
  initDeliveryToggle();
  initFAQAccordion();
  initReviewsSection();
  initAccountModal();
  initMobileNav();
});

/* ==========================================================================
   TOAST NOTIFICATIONS (Alertas emergentes elegantes)
   ========================================================================== */
window.showToast = function(message, type = 'info') {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast-item toast-${type}`;
  
  let iconSvg = '';
  if (type === 'success') {
    iconSvg = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
  } else if (type === 'warning') {
    iconSvg = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`;
  } else {
    iconSvg = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>`;
  }

  toast.innerHTML = `
    <span class="toast-icon">${iconSvg}</span>
    <span class="toast-message">${message}</span>
    <button class="toast-close" onclick="this.parentElement.remove()" aria-label="Cerrar notificación">&times;</button>
  `;

  container.appendChild(toast);

  // Auto eliminación a los 3.8s
  setTimeout(() => {
    toast.classList.add('toast-fadeout');
    setTimeout(() => toast.remove(), 400);
  }, 3800);
};

/* ==========================================================================
   CATÁLOGO DE PRODUCTOS (Módulo 2: RF-2.1 a RF-2.4)
   ========================================================================== */
let activeCategory = 'all';
let searchQuery = '';

function initCatalog() {
  renderCatalog();
}

function renderCatalog() {
  const grid = document.getElementById('productsGrid');
  const countLabel = document.getElementById('productsCount');
  if (!grid) return;

  // Filtrado por categoría y búsqueda en tiempo real
  const filtered = PRODUCTS_DATA.filter(prod => {
    const matchesCat = (activeCategory === 'all') || (prod.category === activeCategory);
    const matchesQuery = prod.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         prod.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  if (countLabel) {
    countLabel.textContent = `${filtered.length} producto${filtered.length === 1 ? '' : 's'} encontrado${filtered.length === 1 ? '' : 's'}`;
  }

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="empty-catalog-message">
        <div class="empty-icon">🧁🔍</div>
        <h3>No encontramos postres que coincidan</h3>
        <p>Prueba con otra palabra clave o explora todas nuestras deliciosas categorías.</p>
        <button class="btn btn-secondary" onclick="resetFilters()">Ver todo el menú</button>
      </div>
    `;
    return;
  }

  grid.innerHTML = filtered.map(prod => {
    const isOutOfStock = prod.availability === 'Agotado';
    const statusClass = prod.availability === 'Disponible' 
      ? 'status-available' 
      : (prod.availability === 'Agotado' ? 'status-out' : 'status-preorder');

    const formattedPrice = window.cartInstance ? window.cartInstance.formatCurrency(prod.price) : `RD$ ${prod.price}.00`;

    return `
      <article class="product-card" data-category="${prod.category}">
        <div class="product-media" onclick="openProductQuickView('${prod.id}')" title="Ver detalles de ${prod.name}">
          <img src="${prod.image}" alt="${prod.name}" class="product-img" loading="lazy">
          <div class="product-badges">
            ${prod.badge ? `<span class="badge badge-brand">${prod.badge}</span>` : ''}
            <span class="badge ${statusClass}">${prod.availability}</span>
          </div>
          <button type="button" class="btn-quick-preview" aria-label="Vista rápida">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
              <circle cx="12" cy="12" r="3"></circle>
            </svg>
            Vista Rápida
          </button>
        </div>

        <div class="product-body">
          <div class="product-meta">
            <span class="product-category-tag">${getCategoryName(prod.category)}</span>
            <div class="product-rating">
              <span class="star-icon">★</span>
              <span class="rating-num">${prod.rating.toFixed(1)}</span>
              <span class="rating-count">(${prod.reviewCount})</span>
            </div>
          </div>

          <h3 class="product-title" onclick="openProductQuickView('${prod.id}')">${prod.name}</h3>
          <p class="product-description">${prod.description}</p>
          
          <div class="product-footer">
            <div class="product-price-box">
              <span class="price-currency">Precio</span>
              <span class="price-amount">${formattedPrice}</span>
            </div>

            <button 
              type="button" 
              class="btn btn-add-cart ${isOutOfStock ? 'disabled' : ''}" 
              onclick="window.cartInstance.addItem('${prod.id}', 1)"
              ${isOutOfStock ? 'disabled title="Producto agotado actualmente"' : ''}
              aria-label="Añadir ${prod.name} al carrito"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <path d="M16 10a4 4 0 0 1-8 0"></path>
              </svg>
              <span>${isOutOfStock ? 'Agotado' : 'Añadir al carrito'}</span>
            </button>
          </div>
        </div>
      </article>
    `;
  }).join('');
}

function getCategoryName(categoryKey) {
  const map = {
    cheesecakes: 'Cheesecake',
    rolls: 'Rolls & Cinnamon',
    cookies: 'Cookie Artesanal',
    flan: 'Flan Casero'
  };
  return map[categoryKey] || categoryKey;
}

window.resetFilters = function() {
  activeCategory = 'all';
  searchQuery = '';
  const searchInput = document.getElementById('headerSearchInput');
  const catalogSearchInput = document.getElementById('catalogSearchInput');
  if (searchInput) searchInput.value = '';
  if (catalogSearchInput) catalogSearchInput.value = '';

  document.querySelectorAll('.cat-pill, .nav-cat-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-category') === 'all');
  });

  renderCatalog();
};

/* ==========================================================================
   BÚSQUEDA Y FILTRADO (RF-1.3, RF-1.4)
   ========================================================================== */
function initSearchAndFilters() {
  const headerSearchInput = document.getElementById('headerSearchInput');
  const catalogSearchInput = document.getElementById('catalogSearchInput');
  const clearSearchBtn = document.getElementById('clearSearchBtn');

  const handleSearch = (val) => {
    searchQuery = val.trim();
    if (headerSearchInput && headerSearchInput.value !== val) headerSearchInput.value = val;
    if (catalogSearchInput && catalogSearchInput.value !== val) catalogSearchInput.value = val;
    
    if (clearSearchBtn) {
      clearSearchBtn.style.display = searchQuery.length > 0 ? 'block' : 'none';
    }

    renderCatalog();
    
    // Si el usuario escribe desde el header y no está en la sección catálogo, scrollear suave
    const catalogSection = document.getElementById('catalogo');
    if (searchQuery.length > 0 && catalogSection) {
      const rect = catalogSection.getBoundingClientRect();
      if (rect.top > 300) {
        catalogSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  if (headerSearchInput) {
    headerSearchInput.addEventListener('input', (e) => handleSearch(e.target.value));
  }

  if (catalogSearchInput) {
    catalogSearchInput.addEventListener('input', (e) => handleSearch(e.target.value));
  }

  if (clearSearchBtn) {
    clearSearchBtn.addEventListener('click', () => {
      handleSearch('');
    });
  }

  // Botones de filtro de categorías (Header y Catálogo)
  const categoryButtons = document.querySelectorAll('.cat-pill, .nav-cat-btn');
  categoryButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetCat = btn.getAttribute('data-category');
      if (!targetCat) return;

      activeCategory = targetCat;

      // Sincronizar clases activas en todos los grupos de botones
      categoryButtons.forEach(b => {
        b.classList.toggle('active', b.getAttribute('data-category') === targetCat);
      });

      renderCatalog();

      // Navegar a la sección del catálogo
      const catalogEl = document.getElementById('catalogo');
      if (catalogEl) {
        catalogEl.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

/* ==========================================================================
   MODAL DE VISTA RÁPIDA DE PRODUCTO (Detalles, Ingredientes, Porciones)
   ========================================================================== */
let currentModalProductId = null;
let currentModalQty = 1;

function initProductModal() {
  const modal = document.getElementById('productModal');
  const closeBtn = document.getElementById('closeProductModal');
  const backdrop = document.getElementById('productModalBackdrop');
  const qtyMinus = document.getElementById('modalQtyMinus');
  const qtyPlus = document.getElementById('modalQtyPlus');
  const addCartBtn = document.getElementById('modalAddCartBtn');

  if (closeBtn) closeBtn.addEventListener('click', closeProductQuickView);
  if (backdrop) backdrop.addEventListener('click', closeProductQuickView);

  if (qtyMinus) {
    qtyMinus.addEventListener('click', () => {
      if (currentModalQty > 1) {
        currentModalQty--;
        updateModalQtyDisplay();
      }
    });
  }

  if (qtyPlus) {
    qtyPlus.addEventListener('click', () => {
      currentModalQty++;
      updateModalQtyDisplay();
    });
  }

  if (addCartBtn) {
    addCartBtn.addEventListener('click', () => {
      if (currentModalProductId) {
        window.cartInstance.addItem(currentModalProductId, currentModalQty);
        closeProductQuickView();
      }
    });
  }
}

function updateModalQtyDisplay() {
  const val = document.getElementById('modalQtyValue');
  if (val) val.textContent = currentModalQty;
}

window.openProductQuickView = function(productId) {
  const product = PRODUCTS_DATA.find(p => p.id === productId);
  if (!product) return;

  currentModalProductId = productId;
  currentModalQty = 1;
  updateModalQtyDisplay();

  const modal = document.getElementById('productModal');
  const backdrop = document.getElementById('productModalBackdrop');
  if (!modal) return;

  // Llenar datos
  document.getElementById('modalProductImg').src = product.image;
  document.getElementById('modalProductImg').alt = product.name;
  document.getElementById('modalProductTitle').textContent = product.name;
  document.getElementById('modalProductPrice').textContent = window.cartInstance.formatCurrency(product.price);
  document.getElementById('modalProductDesc').textContent = product.description;
  document.getElementById('modalProductPortions').textContent = product.portions;
  document.getElementById('modalProductIngredients').textContent = product.ingredients;
  document.getElementById('modalProductRating').textContent = `${product.rating.toFixed(1)} ★ (${product.reviewCount} opiniones)`;

  const statusBadge = document.getElementById('modalProductStatus');
  statusBadge.textContent = product.availability;
  statusBadge.className = `badge ${product.availability === 'Disponible' ? 'status-available' : (product.availability === 'Agotado' ? 'status-out' : 'status-preorder')}`;

  const addBtn = document.getElementById('modalAddCartBtn');
  if (product.availability === 'Agotado') {
    addBtn.disabled = true;
    addBtn.textContent = 'Agotado Temporalmente';
  } else {
    addBtn.disabled = false;
    addBtn.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
      Añadir al Pedido
    `;
  }

  modal.classList.add('active');
  if (backdrop) backdrop.classList.add('active');
  document.body.style.overflow = 'hidden';
};

function closeProductQuickView() {
  const modal = document.getElementById('productModal');
  const backdrop = document.getElementById('productModalBackdrop');
  if (modal) modal.classList.remove('active');
  if (backdrop) backdrop.classList.remove('active');
  document.body.style.overflow = '';
}

/* ==========================================================================
   LOGÍSTICA Y MODALIDAD DE ENTREGA (Módulo 5: RF-5.1 a RF-5.3)
   ========================================================================== */
function initDeliveryToggle() {
  const radioPickup = document.getElementById('deliveryPickup');
  const radioShipping = document.getElementById('deliveryShipping');
  const pickupInfoBox = document.getElementById('pickupLocationBox');
  const shippingFieldsBox = document.getElementById('shippingFieldsContainer');
  const shippingAddressInputs = document.querySelectorAll('.shipping-input');

  const updateDeliveryState = (type) => {
    if (window.cartInstance) {
      window.cartInstance.setDeliveryType(type);
    }

    if (type === 'pickup') {
      if (pickupInfoBox) pickupInfoBox.style.display = 'block';
      if (shippingFieldsBox) shippingFieldsBox.style.display = 'none';
      shippingAddressInputs.forEach(input => {
        input.removeAttribute('required');
        input.disabled = true;
      });
    } else {
      if (pickupInfoBox) pickupInfoBox.style.display = 'none';
      if (shippingFieldsBox) shippingFieldsBox.style.display = 'block';
      shippingAddressInputs.forEach(input => {
        input.setAttribute('required', 'true');
        input.disabled = false;
      });
    }

    updateCheckoutSummary();
  };

  if (radioPickup) {
    radioPickup.addEventListener('change', () => {
      if (radioPickup.checked) updateDeliveryState('pickup');
    });
  }

  if (radioShipping) {
    radioShipping.addEventListener('change', () => {
      if (radioShipping.checked) updateDeliveryState('shipping');
    });
  }
}

/* ==========================================================================
   FORMULARIO DE CHECKOUT Y VALIDACIÓN CON REGEX (Módulo 4: RF-4.1 a RF-4.4)
   ========================================================================== */
function initCheckoutFlow() {
  const checkoutModal = document.getElementById('checkoutModal');
  const checkoutBackdrop = document.getElementById('checkoutBackdrop');
  const closeCheckoutBtn = document.getElementById('closeCheckoutModal');
  const checkoutForm = document.getElementById('checkoutOrderForm');

  window.openCheckoutModal = function() {
    if (!window.cartInstance || window.cartInstance.items.length === 0) {
      window.showToast?.('Tu carrito está vacío. Agrega tus postres favoritos primero.', 'warning');
      return;
    }

    updateCheckoutSummary();
    if (checkoutModal) checkoutModal.classList.add('active');
    if (checkoutBackdrop) checkoutBackdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  window.closeCheckoutModal = function() {
    if (checkoutModal) checkoutModal.classList.remove('active');
    if (checkoutBackdrop) checkoutBackdrop.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (closeCheckoutBtn) closeCheckoutBtn.addEventListener('click', window.closeCheckoutModal);
  if (checkoutBackdrop) checkoutBackdrop.addEventListener('click', window.closeCheckoutModal);

  // Formateadores automáticos en vivo para Tarjeta y Teléfono
  setupInputMasks();

  // Validación y Procesamiento de la Orden
  if (checkoutForm) {
    checkoutForm.addEventListener('submit', handleCheckoutSubmit);
  }
}

function updateCheckoutSummary() {
  if (!window.cartInstance) return;
  const calc = window.cartInstance.getCalculations();

  const subtotalEl = document.getElementById('checkoutSummarySubtotal');
  const taxEl = document.getElementById('checkoutSummaryTax');
  const shippingRow = document.getElementById('checkoutSummaryShippingRow');
  const shippingEl = document.getElementById('checkoutSummaryShipping');
  const totalEl = document.getElementById('checkoutSummaryTotal');
  const itemsContainer = document.getElementById('checkoutMiniItems');

  if (subtotalEl) subtotalEl.textContent = window.cartInstance.formatCurrency(calc.subtotal);
  if (taxEl) taxEl.textContent = window.cartInstance.formatCurrency(calc.tax);

  if (shippingRow && shippingEl) {
    if (window.cartInstance.deliveryType === 'shipping') {
      shippingRow.style.display = 'flex';
      shippingEl.textContent = window.cartInstance.formatCurrency(calc.shipping);
    } else {
      shippingRow.style.display = 'none';
    }
  }

  if (totalEl) totalEl.textContent = window.cartInstance.formatCurrency(calc.total);

  if (itemsContainer) {
    itemsContainer.innerHTML = window.cartInstance.items.map(item => `
      <div class="mini-item-row">
        <span class="mini-item-name">${item.quantity}x ${item.name}</span>
        <span class="mini-item-price">${window.cartInstance.formatCurrency(item.price * item.quantity)}</span>
      </div>
    `).join('');
  }
}

// Máscaras de entrada dinámicas y formateo de tarjeta
function setupInputMasks() {
  const cardInput = document.getElementById('card_number');
  const expInput = document.getElementById('card_exp');
  const cvvInput = document.getElementById('card_cvv');
  const phoneInput = document.getElementById('client_phone');
  const cardBrandIcon = document.getElementById('cardBrandIcon');

  // Formateador de tarjeta de crédito (grupos de 4 dígitos)
  if (cardInput) {
    cardInput.addEventListener('input', (e) => {
      let val = e.target.value.replace(/\D/g, '').substring(0, 16);
      let formatted = val.match(/.{1,4}/g)?.join(' ') || val;
      e.target.value = formatted;

      // Detección visual de marca (Visa, Mastercard, Amex)
      if (cardBrandIcon) {
        if (/^4/.test(val)) {
          cardBrandIcon.innerHTML = '<span class="brand-tag visa">VISA</span>';
        } else if (/^(5[1-5]|22)/.test(val)) {
          cardBrandIcon.innerHTML = '<span class="brand-tag mastercard">MC</span>';
        } else if (/^3[47]/.test(val)) {
          cardBrandIcon.innerHTML = '<span class="brand-tag amex">AMEX</span>';
        } else {
          cardBrandIcon.innerHTML = '💳';
        }
      }
    });
  }

  // Formato Fecha Vencimiento MM/AA
  if (expInput) {
    expInput.addEventListener('input', (e) => {
      let val = e.target.value.replace(/\D/g, '').substring(0, 4);
      if (val.length >= 2) {
        val = val.substring(0, 2) + '/' + val.substring(2);
      }
      e.target.value = val;
    });
  }

  // Formato CVV (máx 4 dígitos numéricos)
  if (cvvInput) {
    cvvInput.addEventListener('input', (e) => {
      e.target.value = e.target.value.replace(/\D/g, '').substring(0, 4);
    });
  }

  // Formato Teléfono Dominicano (809/829/849) XXX-XXXX
  if (phoneInput) {
    phoneInput.addEventListener('input', (e) => {
      let val = e.target.value.replace(/\D/g, '').substring(0, 10);
      if (val.length > 6) {
        val = `(${val.substring(0, 3)}) ${val.substring(3, 6)}-${val.substring(6)}`;
      } else if (val.length > 3) {
        val = `(${val.substring(0, 3)}) ${val.substring(3)}`;
      }
      e.target.value = val;
    });
  }
}

// Validaciones con RegEx y Envío de la Orden (RF-4.4)
function handleCheckoutSubmit(e) {
  e.preventDefault();

  const nameInput = document.getElementById('client_name');
  const phoneInput = document.getElementById('client_phone');
  const emailInput = document.getElementById('client_email');
  const cardNameInput = document.getElementById('card_name');
  const cardNumberInput = document.getElementById('card_number');
  const cardExpInput = document.getElementById('card_exp');
  const cardCvvInput = document.getElementById('card_cvv');
  const deliveryType = document.querySelector('input[name="deliveryMethod"]:checked')?.value || 'pickup';

  // RegEx de Validación Estricta
  const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]{3,60}$/;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const phoneDigits = phoneInput.value.replace(/\D/g, '');
  const rawCardNumber = cardNumberInput.value.replace(/\s/g, '');
  const expRegex = /^(0[1-9]|1[0-2])\/([2-9][0-9])$/;
  const cvvRegex = /^[0-9]{3,4}$/;

  let isValid = true;

  // Validación Nombre
  if (!nameRegex.test(nameInput.value.trim())) {
    setFieldError(nameInput, 'Por favor ingresa un nombre y apellido válido (solo letras).');
    isValid = false;
  } else {
    clearFieldError(nameInput);
  }

  // Validación Teléfono
  if (phoneDigits.length < 10) {
    setFieldError(phoneInput, 'Ingresa un número telefónico completo de 10 dígitos.');
    isValid = false;
  } else {
    clearFieldError(phoneInput);
  }

  // Validación Correo Electrónico
  if (!emailRegex.test(emailInput.value.trim())) {
    setFieldError(emailInput, 'Ingresa un correo electrónico válido (ejemplo: usuario@correo.com).');
    isValid = false;
  } else {
    clearFieldError(emailInput);
  }

  // Validación Dirección si es Shipping (Fase 2)
  if (deliveryType === 'shipping') {
    const streetInput = document.getElementById('shipping_street');
    const sectorInput = document.getElementById('shipping_sector');

    if (!streetInput.value.trim()) {
      setFieldError(streetInput, 'La calle y número de entrega son obligatorios para el envío.');
      isValid = false;
    } else {
      clearFieldError(streetInput);
    }

    if (!sectorInput.value.trim()) {
      setFieldError(sectorInput, 'Por favor indica el sector o urbanización.');
      isValid = false;
    } else {
      clearFieldError(sectorInput);
    }
  }

  // Validación Titular Tarjeta
  if (!nameRegex.test(cardNameInput.value.trim())) {
    setFieldError(cardNameInput, 'Ingresa el nombre tal como figura en el plástico de la tarjeta.');
    isValid = false;
  } else {
    clearFieldError(cardNameInput);
  }

  // Validación Número de Tarjeta (16 dígitos)
  if (!/^[0-9]{15,16}$/.test(rawCardNumber)) {
    setFieldError(cardNumberInput, 'Ingresa los 16 dígitos de tu tarjeta de crédito o débito.');
    isValid = false;
  } else {
    clearFieldError(cardNumberInput);
  }

  // Validación Expiración
  if (!expRegex.test(cardExpInput.value)) {
    setFieldError(cardExpInput, 'Fecha de expiración inválida (formato MM/AA).');
    isValid = false;
  } else {
    // Verificar que no esté en el pasado
    const [month, year] = cardExpInput.value.split('/').map(n => parseInt(n, 10));
    const now = new Date();
    const currentYear = parseInt(now.getFullYear().toString().slice(-2), 10);
    const currentMonth = now.getMonth() + 1;

    if (year < currentYear || (year === currentYear && month < currentMonth)) {
      setFieldError(cardExpInput, 'La tarjeta se encuentra vencida.');
      isValid = false;
    } else {
      clearFieldError(cardExpInput);
    }
  }

  // Validación CVV
  if (!cvvRegex.test(cardCvvInput.value)) {
    setFieldError(cardCvvInput, 'CVV de 3 o 4 dígitos requerido.');
    isValid = false;
  } else {
    clearFieldError(cardCvvInput);
  }

  if (!isValid) {
    window.showToast?.('Por favor corrige los campos señalados en rojo en el formulario.', 'warning');
    return;
  }

  // Simulación de procesamiento seguro
  const submitBtn = document.getElementById('btnSubmitOrder');
  const originalText = submitBtn.innerHTML;
  submitBtn.disabled = true;
  submitBtn.innerHTML = `
    <span class="spinner-border"></span>
    Procesando Orden de forma segura...
  `;

  setTimeout(() => {
    // Generar datos de la orden
    const orderNumber = 'SNS-' + Math.floor(100000 + Math.random() * 900000);
    const orderData = {
      orderNumber,
      date: new Date().toLocaleString('es-DO', { dateStyle: 'full', timeStyle: 'short' }),
      customer: {
        name: nameInput.value.trim(),
        phone: phoneInput.value.trim(),
        email: emailInput.value.trim()
      },
      deliveryMethod: deliveryType,
      pickupLocation: 'Av. Abraham Lincoln #452, Piantini, Santo Domingo',
      pickupTime: document.getElementById('pickup_time_slot')?.value || 'Inmediato (en 30-45 mins)',
      shippingAddress: deliveryType === 'shipping' ? {
        street: document.getElementById('shipping_street').value.trim(),
        sector: document.getElementById('shipping_sector').value.trim(),
        city: document.getElementById('shipping_city').value.trim(),
        reference: document.getElementById('shipping_ref').value.trim()
      } : null,
      payment: {
        titular: cardNameInput.value.trim(),
        cardLast4: rawCardNumber.slice(-4)
      },
      items: [...window.cartInstance.items],
      calculations: window.cartInstance.getCalculations()
    };

    // Guardar orden en historial local (simulación de backend)
    saveOrderToHistory(orderData);

    // Resetear formulario y carrito
    e.target.reset();
    submitBtn.disabled = false;
    submitBtn.innerHTML = originalText;
    window.closeCheckoutModal();
    window.cartInstance.clearCart();

    // Mostrar Comprobante / Recibo Oficial
    showOrderConfirmationModal(orderData);
  }, 1200);
}

function setFieldError(input, message) {
  input.classList.add('is-invalid');
  const errorMsgEl = input.parentElement.querySelector('.field-error-msg');
  if (errorMsgEl) {
    errorMsgEl.textContent = message;
    errorMsgEl.style.display = 'block';
  }
}

function clearFieldError(input) {
  input.classList.remove('is-invalid');
  const errorMsgEl = input.parentElement.querySelector('.field-error-msg');
  if (errorMsgEl) {
    errorMsgEl.textContent = '';
    errorMsgEl.style.display = 'none';
  }
}

/* ==========================================================================
   RECIBO Y CONFIRMACIÓN DE ORDEN (Criterio Éxito Stakeholder 4: <2 min en local)
   ========================================================================== */
function showOrderConfirmationModal(order) {
  const modal = document.getElementById('orderSuccessModal');
  const backdrop = document.getElementById('orderSuccessBackdrop');
  if (!modal) return;

  document.getElementById('receiptOrderNumber').textContent = order.orderNumber;
  document.getElementById('receiptDate').textContent = order.date;
  document.getElementById('receiptClientName').textContent = order.customer.name;
  document.getElementById('receiptClientPhone').textContent = order.customer.phone;
  
  const deliveryBadge = document.getElementById('receiptDeliveryBadge');
  const deliveryInfo = document.getElementById('receiptDeliveryInfo');
  
  if (order.deliveryMethod === 'pickup') {
    deliveryBadge.textContent = 'Retiro en Local (Pick up)';
    deliveryBadge.className = 'badge badge-brand';
    deliveryInfo.innerHTML = `
      <strong>Punto de Retiro:</strong> ${order.pickupLocation}<br>
      <strong>Horario acordado:</strong> ${order.pickupTime}<br>
      <em>Presenta tu código de orden o tu nombre al llegar al mostrador.</em>
    `;
  } else {
    deliveryBadge.textContent = 'Envío a Domicilio (Shipping)';
    deliveryBadge.className = 'badge badge-shipping';
    deliveryInfo.innerHTML = `
      <strong>Destino:</strong> ${order.shippingAddress.street}, ${order.shippingAddress.sector}, ${order.shippingAddress.city}<br>
      ${order.shippingAddress.reference ? `<strong>Ref:</strong> ${order.shippingAddress.reference}<br>` : ''}
      <em>Te notificaremos vía WhatsApp cuando el motorizado vaya en camino.</em>
    `;
  }

  // Lista de items
  const itemsContainer = document.getElementById('receiptItemsList');
  itemsContainer.innerHTML = order.items.map(item => `
    <tr>
      <td>${item.quantity}x ${item.name}</td>
      <td class="text-right">${window.cartInstance.formatCurrency(item.price)}</td>
      <td class="text-right">${window.cartInstance.formatCurrency(item.price * item.quantity)}</td>
    </tr>
  `).join('');

  document.getElementById('receiptSubtotal').textContent = window.cartInstance.formatCurrency(order.calculations.subtotal);
  document.getElementById('receiptTax').textContent = window.cartInstance.formatCurrency(order.calculations.tax);
  
  const receiptShippingRow = document.getElementById('receiptShippingRow');
  if (order.deliveryMethod === 'shipping') {
    receiptShippingRow.style.display = 'table-row';
    document.getElementById('receiptShipping').textContent = window.cartInstance.formatCurrency(order.calculations.shipping);
  } else {
    receiptShippingRow.style.display = 'none';
  }

  document.getElementById('receiptTotal').textContent = window.cartInstance.formatCurrency(order.calculations.total);
  document.getElementById('receiptCardLast4').textContent = `•••• •••• •••• ${order.payment.cardLast4}`;

  modal.classList.add('active');
  if (backdrop) backdrop.classList.add('active');
  document.body.style.overflow = 'hidden';

  window.showToast?.('¡Orden confirmada con éxito! Te hemos enviado un comprobante.', 'success');
}

window.closeOrderSuccessModal = function() {
  const modal = document.getElementById('orderSuccessModal');
  const backdrop = document.getElementById('orderSuccessBackdrop');
  if (modal) modal.classList.remove('active');
  if (backdrop) backdrop.classList.remove('active');
  document.body.style.overflow = '';
};

function saveOrderToHistory(order) {
  try {
    const list = JSON.parse(localStorage.getItem('sns_orders_history') || '[]');
    list.unshift(order);
    localStorage.setItem('sns_orders_history', JSON.stringify(list));
  } catch (e) {
    console.error(e);
  }
}

/* ==========================================================================
   ACORDEÓN DE PREGUNTAS FRECUENTES (FAQ - RF-6.4)
   ========================================================================== */
function initFAQAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const header = item.querySelector('.faq-question');
    header.addEventListener('click', () => {
      const isOpen = item.classList.contains('active');
      // Cerrar otros para modo acordeón elegante
      faqItems.forEach(i => i.classList.remove('active'));
      if (!isOpen) {
        item.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   RESEÑAS Y VALORACIONES DE CLIENTES (RF-6.5)
   ========================================================================== */
function initReviewsSection() {
  let reviews = [...INITIAL_REVIEWS];
  const container = document.getElementById('reviewsCardsGrid');
  const reviewForm = document.getElementById('addNewReviewForm');
  const openModalBtn = document.getElementById('btnOpenReviewModal');
  const modal = document.getElementById('reviewModal');
  const backdrop = document.getElementById('reviewModalBackdrop');
  const closeBtn = document.getElementById('closeReviewModal');

  function renderReviews() {
    if (!container) return;
    container.innerHTML = reviews.map(r => `
      <div class="review-card">
        <div class="review-header">
          <img src="${r.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'}" alt="${r.name}" class="review-avatar">
          <div class="review-author-box">
            <h4 class="review-author-name">${r.name}</h4>
            <span class="review-date">${r.date}</span>
          </div>
          <div class="review-verified-badge" title="Cliente Verificado">✓ Verificado</div>
        </div>
        <div class="review-stars">
          ${'★'.repeat(r.rating)}${'☆'.repeat(5 - r.rating)}
        </div>
        <div class="review-product-tag">Postre: <strong>${r.product}</strong></div>
        <p class="review-text">"${r.comment}"</p>
      </div>
    `).join('');
  }

  renderReviews();

  if (openModalBtn) {
    openModalBtn.addEventListener('click', () => {
      if (modal) modal.classList.add('active');
      if (backdrop) backdrop.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  }

  const closeReviewModal = () => {
    if (modal) modal.classList.remove('active');
    if (backdrop) backdrop.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (closeBtn) closeBtn.addEventListener('click', closeReviewModal);
  if (backdrop) backdrop.addEventListener('click', closeReviewModal);

  if (reviewForm) {
    reviewForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('rev_name').value.trim();
      const product = document.getElementById('rev_product').value;
      const rating = parseInt(document.getElementById('rev_rating').value, 10);
      const comment = document.getElementById('rev_comment').value.trim();

      if (!name || !comment) return;

      const newReview = {
        id: Date.now(),
        name: name,
        product: product,
        rating: rating,
        date: "Justo ahora",
        comment: comment,
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80"
      };

      reviews.unshift(newReview);
      renderReviews();
      e.target.reset();
      closeReviewModal();
      window.showToast?.('¡Muchísimas gracias por tu reseña! Ya está visible.', 'success');
    });
  }
}

/* ==========================================================================
   MODAL DE CUENTA Y HISTORIAL DE PEDIDOS (RF-1.6)
   ========================================================================== */
function initAccountModal() {
  const accountBtn = document.getElementById('accountBtn');
  const modal = document.getElementById('accountModal');
  const backdrop = document.getElementById('accountModalBackdrop');
  const closeBtn = document.getElementById('closeAccountModal');
  const historyContainer = document.getElementById('accountOrdersHistory');

  const openAccount = () => {
    renderHistory();
    if (modal) modal.classList.add('active');
    if (backdrop) backdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeAccount = () => {
    if (modal) modal.classList.remove('active');
    if (backdrop) backdrop.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (accountBtn) accountBtn.addEventListener('click', openAccount);
  if (closeBtn) closeBtn.addEventListener('click', closeAccount);
  if (backdrop) backdrop.addEventListener('click', closeAccount);

  function renderHistory() {
    if (!historyContainer) return;
    try {
      const orders = JSON.parse(localStorage.getItem('sns_orders_history') || '[]');
      if (orders.length === 0) {
        historyContainer.innerHTML = `
          <div class="empty-history">
            <span class="icon">📦</span>
            <p>Aún no has realizado pedidos en esta sesión.</p>
            <p class="subtitle">¡Tus órdenes confirmadas aparecerán aquí para fácil consulta en mostrador!</p>
          </div>
        `;
        return;
      }

      historyContainer.innerHTML = orders.map(ord => `
        <div class="history-order-card">
          <div class="history-order-head">
            <strong>Orden ${ord.orderNumber}</strong>
            <span class="badge ${ord.deliveryMethod === 'pickup' ? 'badge-brand' : 'badge-shipping'}">
              ${ord.deliveryMethod === 'pickup' ? 'Retiro en Local' : 'Envío a Domicilio'}
            </span>
          </div>
          <div class="history-order-date">${ord.date}</div>
          <div class="history-order-summary">
            ${ord.items.map(it => `<div>• ${it.quantity}x ${it.name}</div>`).join('')}
          </div>
          <div class="history-order-foot">
            <span>Total: <strong>${window.cartInstance.formatCurrency(ord.calculations.total)}</strong></span>
            <span class="customer-tag">👤 ${ord.customer.name}</span>
          </div>
        </div>
      `).join('');
    } catch (e) {
      console.error(e);
    }
  }
}

/* ==========================================================================
   NAVEGACIÓN MÓVIL Y MENÚ HAMBURGUESA
   ========================================================================== */
function initMobileNav() {
  const toggleBtn = document.getElementById('mobileMenuToggle');
  const navMenu = document.getElementById('mainNavMenu');

  if (toggleBtn && navMenu) {
    toggleBtn.addEventListener('click', () => {
      navMenu.classList.toggle('mobile-active');
      toggleBtn.classList.toggle('is-open');
    });

    // Cerrar al hacer clic en un enlace
    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('mobile-active');
        toggleBtn.classList.remove('is-open');
      });
    });
  }
}
