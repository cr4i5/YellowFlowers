# Flores amarillas — 21 de septiembre

Una página de una sola pieza (`index.html`, sin dependencias externas más allá de dos tipografías de Google Fonts) para armar y compartir una tarjeta con flores amarillas para el 21 de septiembre.

## Qué hace

- Cuenta los días que faltan para el próximo 21 de septiembre.
- Deja escribir un destinatario, un remitente y un mensaje, con vista previa en vivo.
- Genera un enlace con esos datos codificados en la URL (no usa servidor ni base de datos: todo vive en el link).
- Ofrece copiar ese enlace o enviarlo directo por WhatsApp.
- Si alguien abre el enlace generado, ve su tarjeta personalizada arriba de todo, con una pequeña animación de pétalos cayendo.

## Usar en local

Abre `index.html` directamente en el navegador. No requiere instalación ni build.

## Publicarla gratis con GitHub Pages

1. Crea un repositorio nuevo en GitHub y sube este archivo (`index.html`, y este `README.md` si quieres).
2. Ve a **Settings → Pages**.
3. En "Source", selecciona la rama principal (`main`) y la carpeta raíz (`/`).
4. Guarda. GitHub te da una URL como `https://tu-usuario.github.io/tu-repo/`.
5. Esa es la URL que va a usar la gente para crear y compartir sus tarjetas.

## Personalizar

Todo el diseño está en las variables CSS al inicio del archivo (`:root { ... }`), así que puedes cambiar colores sin tocar el resto del código:

```css
--green-deep: #1f3620;  /* fondo principal */
--yellow: #e7a72e;      /* flor / acento principal */
--rose: #c9526b;        /* disponible como acento secundario */
--cream: #f7efe1;       /* fondo de la tarjeta */
```

El texto de la introducción y de "¿Por qué flores amarillas?" está directamente en el HTML, dentro de las secciones `<header class="hero">` y `<section class="about">`.

## Licencia

MIT. Úsala, cópiala, cámbiale el texto o el color, y regálala.
