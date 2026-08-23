# 📖 Guía Paso a Paso y Documentación del Proyecto

Bienvenido al sistema de plantillas de invitaciones. Esta guía detalla **paso a paso** todo lo necesario para personalizar, estructurar y publicar una invitación de eventos con máxima calidad visual.

---

## 🧭 Índice de Componentes y Guías

- [🎨 1. Configuración de Temas (Fuentes y Colores)](file:///c:/Users/roman/OneDrive/Escritorio/proyectos-desarrollo/invitaciones/invitation-template/doc/theme-configuration.md)
- [🧩 2. Componente de Botones (`Button`)](file:///c:/Users/roman/OneDrive/Escritorio/proyectos-desarrollo/invitaciones/invitation-template/doc/button.md)
- [🍔 3. Menú de Navegación (`Menu` & `MenuSidebar`)](file:///c:/Users/roman/OneDrive/Escritorio/proyectos-desarrollo/invitaciones/invitation-template/doc/menu.md)
- [🎵 4. Reproductor de Música (`MusicPlayer`)](file:///c:/Users/roman/OneDrive/Escritorio/proyectos-desarrollo/invitaciones/invitation-template/doc/music-player.md)
- [🏷️ 5. Encabezados de Sección (`SectionHeader`)](file:///c:/Users/roman/OneDrive/Escritorio/proyectos-desarrollo/invitaciones/invitation-template/doc/section-header.md)
- [🎠 6. Carrusel y Tarjetas (`Carousel` & `CarouselCard`)](file:///c:/Users/roman/OneDrive/Escritorio/proyectos-desarrollo/invitaciones/invitation-template/doc/carousel.md)
- [🖼️ 7. Sistema de Modales (`Modal` & `useModal`)](file:///c:/Users/roman/OneDrive/Escritorio/proyectos-desarrollo/invitaciones/invitation-template/doc/modal.md)
- [🔔 8. Notificaciones Toast (`Sonner` & `useToast`)](file:///c:/Users/roman/OneDrive/Escritorio/proyectos-desarrollo/invitaciones/invitation-template/doc/toast.md)

---

## 🛠️ Guía Paso a Paso para Construir una Invitación

### 📌 Paso 1: Configurar Fuentes y Colores del Evento
1. Abre el archivo [theme.config.json](file:///c:/Users/roman/OneDrive/Escritorio/proyectos-desarrollo/invitaciones/invitation-template/theme.config.json) en la raíz del proyecto.
2. Elige el paquete de fuentes deseado (`"fontPack": 1` al `5`) y la paleta de colores (`"palette": 1` al `8`).
3. Guarda el archivo o ejecuta en la terminal:
   ```bash
   node scripts/set-theme.js 1 2
   ```
4. Las fuentes y la gama cromática se sincronizan automáticamente en toda la aplicación.

---

### 📌 Paso 2: Configurar la Navegación (`Menu`)
1. Abre [InvitationApp.tsx](file:///c:/Users/roman/OneDrive/Escritorio/proyectos-desarrollo/invitaciones/invitation-template/src/InvitationApp.tsx).
2. Elige entre las dos variantes disponibles:
   - **`variant="floating"`**: Botón redondo flotante en la esquina superior izquierda.
   - **`variant="bar"`**: Barra fija superior a todo el ancho.
3. Asigna la variante de color del botón si deseas personalizarla (`buttonVariant="secondary"`, `buttonVariant="tertiary"`, etc.):
   ```tsx
   <Menu variant="floating" buttonVariant="primary" />
   ```
4. Define los enlaces e ítems del menú pasando la prop `items`.

---

### 📌 Paso 3: Configurar la Música de Fondo (`MusicPlayer`)
1. Agrega tu archivo de audio MP3 en `src/assets/music/`.
2. En [InvitationApp.tsx](file:///c:/Users/roman/OneDrive/Escritorio/proyectos-desarrollo/invitaciones/invitation-template/src/InvitationApp.tsx) o en tu vista de invitación, monta el reproductor:
   - **Variante Flotante**:
     ```tsx
     <MusicPlayer variant="floating" buttonVariant="primary" />
     ```
   - **Variante Caja (Card)**:
     ```tsx
     <MusicPlayer variant="card" songTitle="Canción Principal" artistName="María & Carlos" />
     ```

---

### 📌 Paso 4: Estructurar las Secciones (`SectionHeader`)
1. En tu archivo [Invitation.tsx](file:///c:/Users/roman/OneDrive/Escritorio/proyectos-desarrollo/invitaciones/invitation-template/src/modules/invitation/Invitation.tsx), utiliza `<SectionHeader />` para encabezar cada sección (Ubicación, Regalos, Itinerario, RSVP):
   ```tsx
   <SectionHeader
       icon={<MapPinIcon size={24} weight="duotone" />}
       pretitle="Dónde & Cuándo"
       title="Ubicación del Evento"
       subtitle="Jardín de las Rosas, Av. de la Paz #120"
       align="center"
   />
   ```

---

### 📌 Paso 5: Mostrar Galerías o Historia de la Pareja (`Carousel`)
1. Utiliza el componente `<Carousel />` para presentar galerías de fotos o cronología de momentos:
   ```tsx
   <Carousel items={memoryCards} effect="slide" buttonVariant="primary" />
   ```
2. O para galerías de fotos puras:
   ```tsx
   <Carousel images={galleryImages} effect="coverflow" buttonVariant="primary" />
   ```

---

### 📌 Paso 6: Agregar Botones e Interacciones con Modales y Toasts
1. Usa el componente `<Button>` configurando variantes (`primary`, `secondary`, `outline`, `glass`) y radios (`radius="none"`, `radius="full"`).
2. Para abrir un modal (ejemplo: RSVP o Regalos):
   ```tsx
   import { useModal } from '@/common/hooks';
   import { MODAL_NAMES } from '@/store/ui/modal.slice';

   const { onOpenModal } = useModal();
   
   <Button onClick={() => onOpenModal(MODAL_NAMES.RSVP, 'Confirmar Asistencia')}>
       Confirmar Asistencia
   </Button>
   ```
3. Para mostrar notificaciones Toast:
   ```tsx
   import { useToast } from '@/common/hooks';

   const { showSuccess } = useToast();
   showSuccess('¡Asistencia confirmada exitosamente!');
   ```

---

### 📌 Paso 7: Optimizar Imágenes del Proyecto
1. Coloca tus imágenes en `src/assets/images/`.
2. Ejecuta el script de optimización recursivo en la terminal:
   ```bash
   node scripts/optimize-images.js
   ```
3. El script comprimirá recursivamente todas las imágenes y subcarpetas manteniendo la estructura intacta.
