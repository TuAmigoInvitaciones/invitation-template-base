# 📖 Guía Paso a Paso y Arquitectura del Proyecto

Bienvenido al sistema de plantillas de invitaciones de eventos. Esta arquitectura está diseñada para ser **100% modular, basada en configuración declarativa y lista para la generación automatizada de proyectos**.

---

## 🎯 El Corazón del Sistema: `invitation.config.json`

El archivo [invitation.config.json](file:///c:/Users/roman/OneDrive/Escritorio/proyectos-desarrollo/invitaciones/invitation-template/invitation.config.json) funciona como el **Manifiesto Declarativo** de la invitación.

### ¿Por qué existe este archivo?
1. **Motor de Renderizado Dinámico**: Separa por completo la lógica/código de los datos y preferencias del cliente. Los componentes y hooks leen este manifiesto para adaptar fuentes, paletas de color, variante de menú, reproductor de música y visibilidad de secciones.
2. **Generación con CLI Wizard**: Es el archivo objetivo que escribirá tu script/CLI interactivamente al responder preguntas como tipo de evento, paleta, fuentes, variantes y módulos activados.

---

## 🧭 Índice de Guías y Componentes

- [⚙️ 1. Propósito y Visión de `invitation.config.json` (Manifiesto & CLI Wizard)](file:///c:/Users/roman/OneDrive/Escritorio/proyectos-desarrollo/invitaciones/invitation-template/doc/theme-configuration.md)
- [🧙‍♂️ 2. CLI Wizard: Generación Interactiva de Invitaciones (`npm run create:invitation`)](file:///c:/Users/roman/OneDrive/Escritorio/proyectos-desarrollo/invitaciones/invitation-template/doc/cli-wizard.md)
- [🎨 3. Guía de Personalización y Sobrescritura de Componentes](file:///c:/Users/roman/OneDrive/Escritorio/proyectos-desarrollo/invitaciones/invitation-template/doc/customization-guide.md)
- [💻 4. Guía de Comandos CLI](file:///c:/Users/roman/OneDrive/Escritorio/proyectos-desarrollo/invitaciones/invitation-template/doc/commands.md)
- [⏱️ 5. Reloj de Cuenta Regresiva (`Countdown`)](file:///c:/Users/roman/OneDrive/Escritorio/proyectos-desarrollo/invitaciones/invitation-template/doc/countdown.md)
- [🧩 6. Componente de Botones (`Button`)](file:///c:/Users/roman/OneDrive/Escritorio/proyectos-desarrollo/invitaciones/invitation-template/doc/button.md)
- [🍔 7. Menú de Navegación (`Menu` & `MenuSidebar`)](file:///c:/Users/roman/OneDrive/Escritorio/proyectos-desarrollo/invitaciones/invitation-template/doc/menu.md)
- [🎵 8. Reproductor de Música (`MusicPlayer`)](file:///c:/Users/roman/OneDrive/Escritorio/proyectos-desarrollo/invitaciones/invitation-template/doc/music-player.md)
- [🪗 9. Componente de Acordeón (`Accordion`)](file:///c:/Users/roman/OneDrive/Escritorio/proyectos-desarrollo/invitaciones/invitation-template/doc/accordion.md)
- [🏷️ 10. Encabezados de Sección (`SectionHeader`)](file:///c:/Users/roman/OneDrive/Escritorio/proyectos-desarrollo/invitaciones/invitation-template/doc/section-header.md)
- [🎠 11. Carrusel y Tarjetas (`Carousel` & `CarouselCard`)](file:///c:/Users/roman/OneDrive/Escritorio/proyectos-desarrollo/invitaciones/invitation-template/doc/carousel.md)
- [🖼️ 12. Sistema de Modales (`Modal` & `useModal`)](file:///c:/Users/roman/OneDrive/Escritorio/proyectos-desarrollo/invitaciones/invitation-template/doc/modal.md)
- [🔔 13. Notificaciones Toast (`Sonner` & `useToast`)](file:///c:/Users/roman/OneDrive/Escritorio/proyectos-desarrollo/invitaciones/invitation-template/doc/toast.md)
