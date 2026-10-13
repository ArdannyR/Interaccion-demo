# Guía de Estilos – INTERACCIÓN

Este documento describe la fuente única de verdad para los estilos del proyecto "INTERACCIÓN", el sistema de tokens y las reglas de diseño para garantizar la consistencia y accesibilidad.

## 1. Paleta de Marca

La paleta base de la marca se compone de tres colores principales:

| Rol | Nombre | Hex Base | Uso Principal |
| :--- | :--- | :--- | :--- |
| **Primario** | Azul | `#31506F` | Botones principales, títulos, enlaces, barras laterales, texto sobre fondos claros. |
| **Acento** | Rosa | `#E58B8E` | Elementos decorativos, badges, indicadores activos, fondos suaves. |
| **Secundario** | Salmón | `#ECA890` | Acentos complementarios, gradientes, fondos de tarjetas, bordes destacados. |

> **Nota de Accesibilidad:** El rosa y el salmón son colores claros. **NUNCA** usar texto blanco sobre ellos, ya que el contraste es insuficiente. Se debe utilizar texto azul oscuro (p. ej. `--primary-800` o `--primary-900`) cuando el fondo sea rosa o salmón.

---

## 2. Escalas de Color (Tokens)

Todos los colores están definidos en `src/styles/theme.css` y mapeados en `src/index.css` para ser usados mediante clases de Tailwind v4 con la sintaxis `var(--color-xxx)` o clases de utilidad.

### Primario (Azul)
- `--primary-50` a `--primary-900`.
- Base (`--primary-600`): `#31506F`.

### Acento (Rosa)
- `--accent-50` a `--accent-900`.
- Base (`--accent-400`): `#E58B8E`.

### Secundario (Salmón)
- `--secondary-50` a `--secondary-900`.
- Base (`--secondary-400`): `#ECA890`.

### Superficies y Textos
- Fondo general (`--background`): `#FBF9F8`
- Superficies (Tarjetas, modales) (`--surface`): `#FFFFFF`
- Interacciones de superficie (`--surface-hover`): `#F1F5F9`
- Texto principal (`--text-main`): `#1B2A38`
- Texto atenuado (`--text-muted`): `#4F6072`
- Bordes (`--border`): `#DDE5EC`

### Colores Semánticos
Utilizados **exclusivamente** para estados de alerta y feedback del sistema. No se utiliza la paleta de marca para estos fines.
- **Success (Éxito):** Verde (`--success-50` a `--success-700`).
- **Danger (Error/Peligro):** Rojo (`--danger-50` a `--danger-700`).
- **Warning (Advertencia):** Naranja (`--warning-50` a `--warning-700`).

---

## 3. Reglas de Uso de Color

1. **Colores Hexadecimales:** Está **PROHIBIDO** el uso de colores en formato hexadecimal (`#RRGGBB`) en cualquier archivo de componentes `.jsx` o archivos CSS secundarios. El único lugar donde existen códigos hexadecimales es `src/styles/theme.css`.
2. **Textos y Contraste:** Asegurar que todos los textos tengan un nivel de contraste AA. Textos oscuros (`text-(--color-text-main)` o `text-(--color-primary-800)`) sobre superficies claras.
3. **Botones de Error o Cancelación:** Utilizar siempre las clases relacionadas con los tokens `danger`.
4. **Fondo Global:** El color de fondo del sitio debe utilizar un gradiente sutil definido de manera global en el `body` (`--primary-50` → `--background` → `--secondary-50`).

---

## 4. Tipografía y Tamaños

El proyecto utiliza la familia tipográfica por defecto `font-sans` configurada en Tailwind.

**Escalado de Texto y Tamaño de Interfaz (Accesibilidad):**
El proyecto soporta el escalado dinámico del tamaño de la interfaz a través del atributo global `data-text-size` en el `<html>` (5 niveles). Las unidades de medida en el código deben ser preferentemente `rem` o las propias clases predeterminadas de Tailwind (`text-sm`, `text-lg`, etc.), nunca tamaños estáticos en `px`.
- `data-text-size="pequeno"`: 87.5%
- `data-text-size="mediano"`: 93.75%
- `data-text-size="normal"`: 100%
- `data-text-size="grande"`: 112.5%
- `data-text-size="muy-grande"`: 125%

---

## 5. Componentes Base y Estilos

### Button
Componente centralizado con distintas variantes que mapean automáticamente a la paleta correcta:
- `variant="primary"`: Gradiente azul (`--primary-500` a `--primary-700`) con texto en blanco. Efecto hover oscureciendo (`hover:from-(--color-primary-600) hover:to-(--color-primary-800)`), sombra con color en sintaxis Tailwind v4 `shadow-(color:--color-primary-500)/30`. Efecto de traslación (`hover:-translate-y-0.5`) y escala (`active:scale-95`).
- `variant="secondary"`: Fondo neutro para acciones secundarias (`--surface-hover`).
- `variant="accent"`: Fondo salmón (`--secondary-400`) con texto oscuro (`--primary-900`) y sombra `shadow-(color:--color-secondary-400)/30`.
- `variant="outline"`: Botones con borde primario y texto primario, fondo `--surface`, ideal para cancelar o retroceder.
- `variant="danger"`: Usando tokens de `danger` para acciones destructivas y sombra `shadow-(color:--color-danger-600)/30`.

### Input, Select, Textarea y DateInput
Los campos de entrada utilizan un fondo de superficie (`--surface`), bordes en reposo `--color-primary-400` (contraste 3.5:1), y cambian el borde y el anillo de foco (`focus:ring`) utilizando `--primary-500` y `--primary-100`. En caso de error, el componente cambia a los tonos `danger`. `--color-border` queda reservado para bordes decorativos de tarjetas y modales.

### Card
Estructuras con `rounded-xl` o `rounded-2xl` y `shadow-sm`. Contienen un efecto de flotación en `hover` con una pequeña línea indicadora en la parte superior.

### Spinner y Skeleton
- Para botones, un Spinner con anillo `--primary-600`.
- Para carga asíncrona de listas y páginas, usar componentes tipo Skeleton (`animate-shimmer` en bloque `div`).

---

## 6. Espaciado, Radios, Sombras y Animaciones

- **Radios:** Se prefiere el uso de componentes redondeados y amigables. Utilizar `rounded-xl` o `rounded-2xl`.
- **Animaciones Globales:** 
  - `animate-fade-up`
  - `animate-scale-in`
  - `animate-float`
  - `animate-shimmer`
- **Accesibilidad:** Las animaciones y transiciones se inmovilizan automáticamente (velocidad `0.01ms`) si el atributo de accesibilidad `data-motion="reducidas"` es seleccionado, o si el usuario configuró `prefers-reduced-motion` a nivel de SO.

---

## 7. Cómo cambiar la paleta en el futuro

El selector dinámico de temas ha sido eliminado. **La única fuente de verdad es `src/styles/theme.css`.**

Para alterar cualquier color del sitio, o realizar un rediseño general en el futuro:
1. Abrir `src/styles/theme.css`.
2. Reemplazar los valores Hexadecimales correspondientes en la raíz de `:root`.
3. Guardar el archivo; el sistema de Tailwind v4 con CSS Variables se encargará de propagar el nuevo color en todo el proyecto automáticamente. No modifiques el archivo `index.css` a menos que sea para agregar nuevos nombres lógicos.

---

## 8. Estética del Panel (Distribución de Color)

El panel de administración sigue una distribución intencional de color:

| Proporción | Rol | Uso |
| :--- | :--- | :--- |
| **~60%** | Neutro / Blanco | Fondo general (`--background`, `--surface`), texto, bordes. |
| **~25%** | Azul (Primary) | Títulos, textos activos, botón principal, sidebar logo, texto en botones de tarjeta. |
| **~15%** | Rosa / Salmón (Accent + Secondary) | Decoraciones, línea de PageHeader, indicadores activos del sidebar, fondos de cabeceras de tarjetas, hovers cálidos, badges de series. |

### PageHeader
Cada vista principal usa el componente `PageHeader` que incluye:
- Título `h1` en `text-(--color-text-main)`.
- Línea decorativa de **3 rem** (`w-12 h-1`) con gradiente `from-(--color-accent-400) to-(--color-secondary-400)`.
- Subtítulo opcional en `text-(--color-text-muted)`.
- Slot derecho (`actions` o `children`) para botones de acción.

### Barra Lateral (Sidebar)
- **Logo:** Letra "I" en `--primary-900` sobre círculo con gradiente `accent→secondary`.
- **Línea separadora:** 3 rem con gradiente `accent→secondary`.
- **Etiqueta "MENÚ":** en `--primary-300`, tracking ancho, uppercase.
- **Íconos del menú:** Cajas de 2.25 rem (`w-9 h-9`), colores alternados:
  - Pacientes, Horarios, Pagos → fondo `accent-100`, ícono `accent-700`.
  - Terapeutas, Perfil, Ajustes → fondo `secondary-100`, ícono `secondary-700`.
- **Estado activo del ítem:** Fondo sólido `accent-400` (o `secondary-400`), ícono `primary-900`, indicador lateral con gradiente `accent→secondary`.
- **Bloque de usuario:** Avatar con gradiente `accent→secondary`, nombre en blanco, botón logout rosa suave.

### Tarjetas
- **Card:** Línea top on-hover con gradiente `accent-400 → secondary-400`.
- **PacienteCard:** Cabecera con gradiente `accent-50 → secondary-100`, anillo de avatar `accent-300 → secondary-400`, ícono avatar `accent-500`. Botón "Datos" hover en `accent-50`; botón "Diagnóstico" hover en `secondary-50` con label `secondary-700`.
- **TerapeutaCard:** Cabeceras alternadas entre `accent-50` y `secondary-50` según índice par/impar.

### Roles de Botones de Acción
- **"+ Añadir paciente"** y **"+ Nueva cita"** usan `variant="accent"` (fondo `--secondary-400`, texto `--primary-900`).
- **Acciones principales** (guardar, confirmar) usan `variant="primary"`.
- **Cancelar / volver** usan `variant="outline"`.
- **Acciones destructivas** usan `variant="danger"`.

### Opciones de Selección (Ajustes)
- **Seleccionado:** Borde `accent-400`, fondo `accent-50`.
- **No seleccionado:** Borde `border`, hover en `accent-300`.

### Perfil
- Banda decorativa superior con gradiente `accent-100 → secondary-100 → accent-50`.
- Avatar con fondo `accent-100`, ícono `accent-500`, anillo blanco (`ring-4 ring-(--color-surface)`).

---

## 7. Diseño Responsive y Móvil (Mobile-First)

Toda la aplicación sigue un diseño **mobile-first** adaptado para visualización completa en pantallas de celulares y tablets sin scroll horizontal.

### Breakpoints Oficiales
- **Base (móvil)**: `< 640px` (estilos directos sin prefijo). Vistas validadas en **320, 360, 390, 412 px**.
- **`sm:`**: `≥ 640px` (móviles grandes y phablets).
- **`md:`**: `≥ 768px` (tablets en portrait y laptops pequeñas; activación de sidebar fija y grid semanal del calendario).
- **`lg:`**: `≥ 1024px` (escritorio y pantallas amplias).

### Tamaños Táctiles y Accesibilidad Móvil
- **Objetivo táctil mínimo:** Todo botón, enlace de acción, ítem de menú, opción de listbox y celda interactiva tiene un alto/ancho mínimo de **44 px (`min-h-11` o `w-11 h-11`)** en pantallas `< 768px`.
- **Separación entre interactivos:** Mínimo `0.5rem` (`gap-2` o superior) entre botones adyacentes para evitar toques accidentales.
- **Inputs móviles:** En pantallas menores a 768px, todos los elementos `input`, `select` y `textarea` tienen un tamaño de fuente mínimo de `max(1rem, 16px)` para evitar que iOS Mobile Safari fuerce zoom automático en el foco.
- **Áreas seguras (Notch & Gestos):** Uso sistemático de utilidades de safe area (`pt-safe`, `pb-safe`, `pl-safe`, `pr-safe`) en cabeceras móviles sticky, pie de modales, drawer lateral y footer.

### Regla de Independencia de Hover
- **Nunca depender de `:hover` para información o acciones críticas:** En pantallas táctiles, el estado `:hover` no existe de forma predecible.
- Los efectos interactivos de traslación (`hover:-translate-y-1`) y sombras deben condicionarse con `[@media(hover:hover)]:hover:...` para evitar saltos o parpadeos táctiles indeseados.
- Elementos como el botón "+" de casillas vacías en el calendario se muestran permanentes y discretos en dispositivos táctiles mediante `[@media(hover:none)]:opacity-60`.

### Patrón de Modal como Hoja Inferior (Bottom Sheet)
En pantallas de celular (`< 640px`), los modales se abren como una hoja inferior:
- **Contenedor:** `fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 sm:p-4`.
- **Caja del modal:** `w-full max-h-[92dvh] rounded-t-2xl sm:rounded-2xl rounded-b-none sm:rounded-b-2xl` con animación `animate-slide-up` en móvil y `animate-scale-in` en escritorio.
- **Cabecera fija:** Título con `truncate` + botón cerrar táctil `w-11 h-11`.
- **Cuerpo con scroll:** `overflow-y-auto overscroll-contain` con `scroll-padding-bottom` para no tapar campos con el teclado virtual.
- **Bloqueo de scroll:** El `body` bloquea su scroll (`overflow = 'hidden'`) mientras un modal o el drawer móvil esté abierto.

