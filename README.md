# Flores amarillas — 21 de septiembre

Un proyecto de dos páginas, sin frameworks ni build, listo para publicar en GitHub Pages.

## Estructura

```
index.html    → la herramienta para armar la tarjeta (formulario + vista previa)
tarjeta.html  → la tarjeta sola, a pantalla completa (esto es lo que abre la otra persona)
styles.css    → estilos compartidos por ambas páginas
crear.js      → lógica de index.html (contador, vista previa, generar enlace)
tarjeta.js    → lógica de tarjeta.html (lee la URL y muestra la tarjeta)
```

La idea central del proyecto es `tarjeta.html`: una tarjeta digital, no una página con un formulario. `index.html` es solo el taller donde se arma esa tarjeta antes de enviarla.

## Cómo funciona

1. En `index.html`, la persona escribe el destinatario, el remitente, un mensaje y elige una flor (girasol, margarita, tulipán o rosa).
2. Al presionar "Copiar enlace", se arma una URL hacia `tarjeta.html` con esos datos como parámetros, por ejemplo:
   ```
   tarjeta.html?to=Ana&from=Luis&msg=Feliz+21+de+septiembre&flor=tulipan
   ```
3. Quien abre ese enlace ve **solo** la tarjeta, a pantalla completa, sin el formulario ni el resto del sitio.

No hay servidor ni base de datos: todo el contenido de la tarjeta viaja codificado en la propia URL.

## Usar en local

Abre `index.html` en el navegador (recomendado servirlo con un servidor local simple, por ejemplo `python3 -m http.server`, para que las rutas relativas a `tarjeta.html` funcionen igual que en producción).

## Publicarla gratis con GitHub Pages

1. Sube todos los archivos de esta carpeta a un repositorio de GitHub.
2. Ve a **Settings → Pages**.
3. En "Source", selecciona la rama principal (`main`) y la carpeta raíz (`/`).
4. Guarda. GitHub te da una URL como `https://tu-usuario.github.io/tu-repo/`.
5. Los enlaces generados apuntarán automáticamente a `.../tu-repo/tarjeta.html?...`.

## Personalizar

Los colores y tipografías están centralizados en las variables CSS al inicio de `styles.css`:

```css
--green-deep: #1f3620;  /* fondo principal */
--yellow: #e7a72e;      /* flor / acento principal */
--rose: #c9526b;        /* acento secundario disponible */
--cream: #f7efe1;       /* fondo de la tarjeta */
```

Para agregar una flor nueva: dibuja un símbolo SVG más dentro de `<defs>` (en `index.html` y en `tarjeta.html`) con un `id="flor-nombre"`, y agrega su opción correspondiente en el `fieldset` de `index.html`.

## Licencia

MIT. Úsala, cópiala, cámbiale el texto o el color, y regálala.
