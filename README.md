# 🧁 Short N’ Sweet Bakery — Plataforma Web de Repostería Artesanal

Proyecto desarrollado para la asignatura de **Diseño Web**, Escuela de Informática, **Universidad APEC (UNAPEC)**.

**Grupo No. 01:**
* Anna Kunhardt (A00121849)
* Darwin Rodriguez (A00123457)
* Merdrys Dickson (A00122032)
* Ricardo Jiménez (A00121883)
* Samuel Perez (A00121974)

---

## 📋 Descripción del Proyecto

**Short N’ Sweet Bakery** es una plataforma web de comercio electrónico moderna, dinámica y responsiva para una repostería artesanal. El sistema resuelve la necesidad comercial de presentar un catálogo interactivo con precios fijos en moneda local (**RD$**), disponibilidad en tiempo real, carrito de compras dinámico y captura estructurada de pedidos con logística enfocada en **Pick up (Retiro en tienda)** para la Fase 1, con soporte preparado para **Shipping (Envío a domicilio)** en la Fase 2.

El desarrollo está construido exclusivamente con estándares web nativos: **HTML5 semántico**, **CSS3 (Flexbox y CSS Grid)** y **JavaScript ES6+ vanilla**, sin dependencias pesadas de frameworks externos.

---

## 📁 Estructura del Proyecto

```text
short-n-sweet-bakery/
│
├── index.html              # Archivo principal con estructura semántica HTML5
├── README.md               # Guía técnica, manual de usuario y despliegue
│
├── css/
│   └── styles.css          # Hoja de estilos CSS3 (Variables, Grid, Flexbox, Mobile-First, Animaciones, Print)
│
├── js/
│   ├── products.js         # Base de datos centralizada de postres (Cheesecakes, Rolls, Cookies, Flan)
│   ├── cart.js             # Lógica del Carrito de Compras, cálculos de ITBIS/Totales y persistencia en localStorage
│   └── app.js              # Interacciones de UI, búsqueda en tiempo real, validaciones RegEx, modals y reseñas
│
└── images/                 # Directorio reservado para assets locales adicionales
```

---

## 🚀 Módulos Funcionales Implementados

| Módulo | Requerimiento | Descripción |
| :--- | :--- | :--- |
| **Módulo 1: Header & Navegación** | RF-1.1 al RF-1.6 | Cabecera persistente (*sticky*), logotipo oficial, buscador interactivo en vivo, atajos a las 4 categorías, acceso a perfil/pedidos y botón de carrito con contador dinámico animado. |
| **Módulo 2: Catálogo & Fichas** | RF-2.1 al RF-2.4 | Hero promocional, filtrado por categorías, fichas con foto HD, nombre, precio explícito (RD$), estado de disponibilidad (`Disponible`, `Bajo Pedido`, `Agotado`), descripción detallada y botón interactivo "Añadir al carrito" sin recargar la página. |
| **Módulo 3: Carrito de Compras** | RF-3.1 al RF-3.5 | Panel lateral *off-canvas* desplegable, desglose de artículos, controles de cantidad (+/-), botón de eliminación, cálculo en tiempo real de Subtotal, ITBIS (18%), flete y Total a pagar, con persistencia en `localStorage`. |
| **Módulo 4: Checkout y Validación** | RF-4.1 al RF-4.4 | Formulario estructurado con validación estricta de expresiones regulares (**RegEx**): nombres alfabéticos, teléfono móvil dominicano `(809/829/849)`, correo electrónico válido, y datos de tarjeta de crédito/débito con detección de marca (Visa, Mastercard, Amex). |
| **Módulo 5: Logística Pick up / Shipping** | RF-5.1 al RF-5.3 | Selector interactivo de entrega. Modo **Pick up** predeterminado mostrando dirección de la repostería (Piantini), horarios de recogida y selector de horario. Modo **Shipping** desplegando campos de dirección obligatorios y calculando el costo de envío (RD$ 175.00). |
| **Módulo 6: Secciones de Confianza** | RF-6.1 al RF-6.5 | Secciones dedicadas: *Sobre Nosotros*, *Ubicación* con mapa integrado, *Preguntas Frecuentes (FAQ)* con acordeón animado, *Reseñas de Clientes* con posibilidad de publicar nuevas opiniones, y canales de contacto rápido. |
| **Módulo 7: Comprobante de Retiro** | Stakeholders 1 & 4 | Generador de comprobante/recibo oficial con código único `#SNS-XXXXXX`, código QR simulado y botón de impresión para despacho en mostrador en **menos de 2 minutos**. |

---

## 🛠️ Cómo Modificar y Mantener el Catálogo

Toda la información del menú se encuentra desacoplada en el archivo `js/products.js`. Para agregar un nuevo postre o actualizar precios:

1. Abra `js/products.js` en su editor.
2. Añada o edite un objeto en el arreglo `PRODUCTS_DATA`:

```javascript
{
  id: "chk-05",
  name: "Oreo Dream Cheesecake",
  category: "cheesecakes", // 'cheesecakes', 'rolls', 'cookies' o 'flan'
  price: 1150,             // Precio fijo en RD$
  availability: "Disponible", // 'Disponible', 'Bajo Pedido' o 'Agotado'
  image: "https://url-de-la-imagen.jpg",
  description: "Cheesecake cremoso con trozos de galleta Oreo.",
  portions: "8-10 porciones",
  ingredients: "Queso crema, galletas Oreo, crema de leche.",
  badge: "Nuevo",
  rating: 5.0,
  reviewCount: 12
}
```

3. Guarde el archivo. El catálogo se actualizará instantáneamente en el navegador.

---

## 🌐 Instrucciones de Despliegue (Hosting)

El proyecto consta únicamente de archivos estáticos, por lo que es compatible con cualquier servidor web HTTP/HTTPS:

### Opción A: Despliegue en Vercel o Netlify
1. Suba los archivos a su repositorio de GitHub.
2. Conecte el repositorio en [Vercel](https://vercel.com) o [Netlify](https://netlify.com).
3. Seleccione el directorio raíz y presione **Deploy** (no requiere comando de build).

### Opción B: GitHub Pages
1. Vaya a la configuración (*Settings*) de su repositorio en GitHub.
2. En la sección **Pages**, elija la rama `main` y la carpeta `/ (root)`.
3. Guarde y en segundos obtendrá su URL pública segura con HTTPS.

### Opción C: Servidor Apache / Nginx / cPanel (vía FTP/SFTP)
1. Conéctese a su servidor mediante FileZilla o Cyberduck.
2. Copie el contenido del proyecto dentro del directorio `public_html/` o `www/`.
3. Asegúrese de que el certificado SSL/TLS se encuentre activo en su dominio.

---

## 💻 Manual de Uso Rápido para el Usuario

1. **Explorar:** Navegue por la página principal o use los botones de categoría en el menú superior para ver Cheesecakes, Rolls, Cookies o Flan.
2. **Buscar:** Escriba cualquier ingrediente o nombre en la barra de búsqueda en tiempo real.
3. **Ver Detalles:** Haga clic en cualquier postre para abrir la ficha técnica con ingredientes y porciones recomendadas.
4. **Agregar al Carrito:** Presione el botón *"Añadir al carrito"*. Puede ajustar las cantidades dentro del panel lateral.
5. **Completar Pedido:** Presione *"Proceder al Checkout"*, ingrese sus datos, elija retiro en local (Pick up) y confirme el pago con tarjeta.
6. **Retirar:** Guarde o imprima el comprobante con su código `#SNS-XXXXXX` para retirar su orden en nuestra sucursal de Piantini en menos de 2 minutos.
