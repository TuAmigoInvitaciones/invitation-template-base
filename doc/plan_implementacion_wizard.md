# Plan de Arquitectura Modular para `create-invitation`

Este plan establece una arquitectura limpia, mantenible y modular para el script de generación de invitaciones, dividiendo la captura interactiva en módulos independientes por concepto/sección.

---

## Estructura de Archivos Propuesta

Nuestra estructura modular residirá en `scripts/wizard/`:

```
scripts/
├── wizard/
│   ├── prompts.js                  # Utilidades de CLI (ask, askConfirm, askSelect, etc.)
│   ├── step0_project_setup.js     # Nombre de proyecto, carpeta y ruta de guardado
│   ├── step1_package_selection.js # Selección de Evento, Paquete (Piedra Preciosa), Boletaje y Addons
│   ├── step2_theme_ui.js           # Configuración de theme (fontPack, palette) y ui (menu, music)
│   ├── step3_hero_sections.js      # Hero (nombres, fecha, ciudad, subtítulo) y Scratch Reveal
│   ├── step4_message_family.js     # Mensaje y Familia (padres, padrinos)
│   ├── step5_places_itinerary.js   # Ubicaciones (bucle -1) e Itinerario (bucle -1)
│   ├── step6_protocol_presents.js  # Código de Vestimenta y Mesa de Regalos / Datos Bancarios
│   ├── step7_confirmation_graduates.js # Confirmación (type: abrasa/whatsapp/call) y Graduados
│   ├── step8_gallery_ticket.js     # Galería de Fotos y Boletaje QR
│   ├── step9_addons.js             # Módulos Extra Add-ons (Hospedaje, Historia, FAQ/Menú, Playlist, Monograma)
│   └── step10_farewell.js          # Despedida, Hashtag y Agradecimiento
└── create-invitation.js            # Orquestador principal que ejecuta el wizard y compila el proyecto
```

---

## Fases de Desarrollo (Sección por Sección)

### Fase 1
- **`prompts.js`**: Reutilización limpia de la interfaz Readline.
- **`step0_project_setup.js`**: Nombre de carpeta y ruta destino personalizada.
- **`step1_package_selection.js`**: Selección de Tipo de Evento (Boda, XV, Graduación, Kids, General), Paquete Comercial (Bronce, Platino, Oro, Rubí, Esmeralda, Cuarzo), Módulo de Boletaje y Addons a incluir.
- Generación de las llaves iniciales del JSON: `eventType`, `packageTier`, `commercial`, y toggles iniciales.

### Fase 2
- **`step2_theme_ui.js`**: Generación de llaves `theme` y `ui`.
- **`step3_hero_sections.js`**: Generación de llaves `hero` y `scratchReveal`.

### Fase 3
- **`step4_message_family.js`**: Generación de llaves `message` y `family`.
- **`step5_places_itinerary.js`**: Generación de `places` (múltiples ubicaciones) e `itinerary`.

### Fase 4
- **`step6_protocol_presents.js`**: Generación de `dressCode` y `presents`.
- **`step7_confirmation_graduates.js`**: Generación de `confirmation` y `graduates`.

### Fase 5
- **`step8_gallery_ticket.js`**: Generación de `gallery` y `ticket`.
- **`step9_addons.js`**: Generación interactiva de la llave `addons`.
- **`step10_farewell.js`**: Generación de `farewell`.

### Fase 6
- Conectar todos los módulos en `scripts/create-invitation.js` para compilar el `invitation.config.json` completo, copiar archivos del template y ejecutar sincronización de temas.
