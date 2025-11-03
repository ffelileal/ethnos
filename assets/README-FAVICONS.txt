Favicons para ETHNOS

Coloca en la carpeta `assets/` los siguientes archivos (puedes generar desde un PNG grande o usar un servicio como realfavicongenerator.net):

- apple-touch-icon.png (180x180)
- favicon-32x32.png (32x32)
- favicon-16x16.png (16x16)
- favicon.ico (varias resoluciones en un .ico) opcional
- site.webmanifest (JSON para PWA) opcional

Ejemplo mínimo para `site.webmanifest`:
{
  "name": "ETHNOS - Centro de Estudiantes",
  "short_name": "ETHNOS",
  "icons": [
    { "src": "/assets/android-chrome-192x192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/assets/android-chrome-512x512.png", "sizes": "512x512", "type": "image/png" }
  ],
  "theme_color": "#1e40af",
  "background_color": "#ffffff",
  "display": "standalone"
}

Si querés, puedo generar el `site.webmanifest` aquí (archivo de texto). No puedo crear imágenes por vos, pero puedo incrustar la imagen existente (`assets/logo.png`) como favicon en formato data-uri si querés (puede inflar el HTML).