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

**Escalado de Texto (Accesibilidad):**
El proyecto soporta el escalado dinámico del tamaño del texto a través del atributo global `data-text-size` en el `<html>`. Las unidades de medida en el código deben ser preferentemente `rem` o las propias clases predeterminadas de Tailwind (`text-sm`, `text-lg`, etc.), nunca tamaños estáticos en `px`.
- `data-text-size="normal"`: 100%
- `data-text-size="grande"`: 112.5%
- `data-text-size="muy-grande"`: 125%

---

## 5. Componentes Base y Estilos

### Button
Componente centralizado con distintas variantes que mapean automáticamente a la paleta correcta:
- `variant="primary"`: Gradiente azul (`--primary-500` a `--primary-700`) con texto en blanco. Efecto de traslación (`hover:-translate-y-0.5`) y escala (`active:scale-95`).
- `variant="secondary"`: Fondo neutro para acciones secundarias (`--surface-hover`).
- `variant="accent"`: Fondo salmón/rosa (`--accent-500` o `--secondary-400`) con texto oscuro (`--primary-900`).
- `variant="outline"`: Botones con borde transparente y texto primario, ideal para cancelar o retroceder.
- `variant="danger"`: Usando tokens de `danger` para acciones destructivas.

### Input
Los campos de entrada utilizan un fondo de superficie (`--surface`), bordes predeterminados (`--border`), y cambian el borde y el anillo de foco (`focus:ring`) utilizando `--primary-500` y `--primary-100`. En caso de error, el componente cambia a los tonos `danger`.

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
