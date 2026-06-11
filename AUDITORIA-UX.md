# Auditoría de UX y Propuesta de Rediseño
## Campus Virtual Universidad Maimónides

---

## 1. ANÁLISIS DEL ESTADO ACTUAL

### 1.1 Observaciones del Campus Virtual (maimonidesvirtual.com.ar)

**Página de Login:**
- Interfaz mínima y anticuada
- Sin elementos visuales distintivos de la marca
- Sin feedback visual en interacciones
- Campos de formulario sin iconografía accesible
- Sin opción de "recordarme" visible
- Mensaje de bienvenida genérico

**Problemas Identificados:**
1. **Obsolescencia tecnológica**: Interfaz que no refleja estándares actuales (2024+)
2. **Falta de identidad visual**: No hay continuidad con el sitio principal (maimonides.edu.ar)
3. **Experiencia móvil deficiente**: No hay evidencia de diseño responsive
4. **Accesibilidad limitada**: Contraste bajo, elementos no táctiles

### 1.2 Puntos de Fricción en Navegación Móvil

| Problema | Impacto | Severidad |
|----------|---------|-----------|
| Botones pequeños (< 44x44px) | Dificultan la interacción táctil | CRÍTICA |
| Tablas no responsivas | Contenido ilegible en móvil | CRÍTICA |
| Falta de jerarquía visual | Sobrecarga cognitiva | ALTA |
| Navegación horizontal | Requiere scroll lateral | ALTA |
| Sin Bottom Navigation | Navegación oculta | ALTA |
| Tipografías ilegibles | Fatiga visual | MEDIA |
| Ausencia de microinteracciones | Experiencia estática | MEDIA |

---

## 2. PROPUESTA DE UI - ENFOQUE VISUAL

### 2.1 Paleta de Colores

**Basada en la identidad de marca UMAI (azul institucional) pero con matices modernos:**

```
Primary:      #0A2540  (Navy Profundo - Identidad institucional)
Secondary:    #1E3A5F  (Azul Medianoche - Fondos)
Accent:       #00D4AA  (Cyan Menta - CTAs, highlights)
Accent Alt:   #635BFF  (Violeta Moderno - notificaciones)
Success:      #00C853  (Verde Confirmación)
Warning:      #FFB300  (Ámbar Alerta)
Error:        #FF5252  (Rojo Error)
Background:   #F8FAFC  (Gris Perla - Fondo principal)
Surface:      #FFFFFF  (Blanco Puro - Cards)
Text Primary: #0A2540  (Navy)
Text Secondary: #64748B (Gris Azulado)
Text Muted:   #94A3B8  (Gris Suave)
```

### 2.2 Tipografía

```
Headings: Inter (700, 600) - Moderna, legible, geométrica
Body: Inter (400, 500) - Excelente legibilidad en pantalla
Mono: JetBrains Mono - Para código/estadísticas
Fallbacks: system-ui, -apple-system, sans-serif
```

### 2.3 Sistema de Espaciado

```
Base: 4px
xs: 4px  | sm: 8px  | md: 16px
lg: 24px | xl: 32px | 2xl: 48px
```

### 2.4 Sistema de Cards para Materias

**Estructura:**
- Sombra sutil (box-shadow: 0 2px 8px rgba(0,0,0,0.08))
- Border-radius: 16px
- Padding: 20px
- Gap entre cards: 16px

**Estados:**
- Default: Fondo blanco, borde sutil
- Hover: Elevación sutil, borde accent
- Active: Scale(0.98), sombra reducida

---

## 3. DISEÑO MOBILE-FIRST

### 3.1 Principios

1. **Content-First**: El contenido ocupa toda la pantalla
2. **Touch-Optimized**: Todos los elementos >= 44x44px
3. **Bottom Navigation**: Acceso rápido a funciones principales
4. **Progressive Disclosure**: Mostrar info esencial, expandir si interesa
5. **Visual Hierarchy**: Tipografía y color guían la atención

### 3.2 Bottom Navigation Bar (Móvil)

```
┌─────────────────────────────────────┐
│            HEADER                  │
│  Logo | Título | Notificaciones    │
├─────────────────────────────────────┤
│                                     │
│         CONTENT AREA               │
│      (Scroll vertical)             │
│                                     │
│   ┌─────────────────────────┐      │
│   │     CARD MATERIA        │      │
│   └─────────────────────────┘      │
│   ┌─────────────────────────┐      │
│   │     CARD MATERIA        │      │
│   └─────────────────────────┘      │
│                                     │
├─────────────────────────────────────┤
│  🏠  📚  📅  📊  👤               │
│ Home  Cursos Calendario Stats Perfil│
└─────────────────────────────────────┘
```

---

## 4. WIREFRAME - DASHBOARD MIS CURSOS

```
┌────────────────────────────────────┐
│ ≡  Mis Cursos            🔔  👤   │
├────────────────────────────────────┤
│ ┌──────────────────────────────┐  │
│ │ 🔍 Buscar materia...         │  │
│ └──────────────────────────────┘  │
│                                    │
│ Cursando (3)                       │
│ ┌────────────────────────────┐    │
│ │ [img] Farmacología          │    │
│ │ Dr. García • 85% completo  │    │
│ │ ████████████░░░░  12/15   │    │
│ └────────────────────────────┘    │
│ ┌────────────────────────────┐    │
│ │ [img] Anatomía II          │    │
│ │ Dra. López • 60% completo  │    │
│ │ ██████░░░░░░░░░░  9/15     │    │
│ └────────────────────────────┘    │
│                                    │
│ Próximos Exámenes                  │
│ ┌────────────────────────────┐    │
│ │ 📝 Bioquímica - 15 Abr    │    │
│ │ 📝 Fisiología - 22 Abr     │    │
│ └────────────────────────────┘    │
│                                    │
│ ┌────────────────────────────┐    │
│ │ 📢 Anuncio importante      │    │
│ └────────────────────────────┘    │
│                                    │
├────────────────────────────────────┤
│  🏠    📚    📅    📊    👤       │
│ Home  Cursos Calendario Perfil     │
└────────────────────────────────────┘
```

---

## 5. COMPONENTES CLAVE

### 5.1 CourseCard Component

```css
.course-card {
  background: #FFFFFF;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
  transition: all 0.2s ease;
}

.course-card:hover {
  box-shadow: 0 4px 16px rgba(0,0,0,0.1);
  transform: translateY(-2px);
}

.course-card:active {
  transform: scale(0.98);
}
```

### 5.2 Progress Bar

```css
.progress-bar {
  height: 6px;
  background: #E2E8F0;
  border-radius: 3px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #00D4AA, #00B894);
  border-radius: 3px;
  transition: width 0.5s ease;
}
```

### 5.3 Bottom Nav Item

```css
.bottom-nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 8px 16px;
  color: #64748B;
  transition: color 0.2s;
}

.bottom-nav-item.active {
  color: #00D4AA;
}

.bottom-nav-item svg {
  width: 24px;
  height: 24px;
}
```

---

## 6. CHECKLIST DE ACCESIBILIDAD

- [x] Contraste WCAG AA (4.5:1 mínimo)
- [x] Elementos táctiles >= 44x44px
- [x] Focus visible en todos los interactivos
- [x] Textos legibles (16px mínimo body)
- [x] Espaciado suficiente entre elementos
- [x] Navegación por teclado funcional
- [x] Screen reader friendly (ARIA labels)
- [x] No depender solo del color para información
- [x] Animaciones reducibles (prefers-reduced-motion)

---

## 7. ANÁLISIS COMPLETO POR PESTAÑA

### 7.1 LOGIN / INGRESO

| CATEGORÍA | PROBLEMA | IMPACTO EN EL USUARIO | IDEA DE MEJORA |
|------------|----------|------------------------|-----------------|
| **Diseño Visual** | Interfaz minimalista sin identidad de marca | No transmite profesionalismo ni pertenencia a UMAI | Incluir logo, colores institucionales y una imagen de portada institucional |
| **Navegación** | No hay opción visible de "¿Olvidé mi contraseña?" | Usuarios frustrados que no pueden recuperar acceso | Botón prominente "Recuperar contraseña" cerca del formulario |
| **Diseño Visual** | Campos de formulario sin iconografía | Dificultad para identificar campos (usuario vs contraseña) | Agregar iconos descriptivos en cada campo |
| **Usabilidad** | Sin opción "Recordarme" | Inconveniente para usuarios frecuentes | Checkbox para mantener sesión abierta |
| **Accesibilidad** | Sin información sobre navegadores compatibles | Frustración si el sitio no funciona en su navegador | Mensaje de requisitos técnicos mínimos |
| **Contenido** | Mensaje de bienvenida genérico | Desconexión emocional inicial | Mensaje personalizado o nulo |
| **Soporte** | Enlace de soporte es un Google Forms externo | Experiencia fragmentada, desconfianza | Chat en vivo o widget de soporte integrado |

### 7.2 MIS CURSOS (Dashboard Principal)

| CATEGORÍA | PROBLEMA | IMPACTO EN EL USUARIO | IDEA DE MEJORA |
|------------|----------|------------------------|-----------------|
| **Arquitectura de Información** | Contenidos dispersos: profesores usan "Materias" y otros "Aulas Virtuales" | Confusión, pérdida de tiempo buscando materiales | Unificar en un solo acceso o sincronización automática |
| **Diseño Visual** | Cronograma Académico prominente pero sin funcionalidad real | Ruido visual, espacio desperdiciado | Reducir tamaño o hacerlo interactivo (enlaces directos) |
| **Navegación** | Sin botón "Volver" en páginas internas | Dependencia del navegador, pérdida de contexto | Implementar breadcrumb + botón de retorno contextual |
| **Flujo de Usuario** | Aula virtual abre en la misma pestaña | Interrupción del flujo de trabajo | Abrir en pestaña nueva (target="_blank") |
| **Mobile** | No es responsive, textos ilegibles en celular | Casi inutilizable en móvil, scroll horizontal forzado | Diseño mobile-first con cards apiladas |
| **Diseño Visual** | Listas de texto plano en lugar de cards | Escaneo difícil, jerarquía confusa | Sistema de cards con progreso, docente, y acción principal |
| **Navegación** | Sin filtro/búsqueda por materia | Dificultad para encontrar cursos entre muchos | Barra de búsqueda y filtros por estado (cursando/finalizado) |
| **Visibilidad** | No muestra próximo examen o fecha límite | ANSIEDAD por desconocer fechas importantes | Widget de "Próximos compromisos" prominente |
| **Accesibilidad** | Estados de curso solo diferenciados por color | Usuarios daltónicos no distinguen estados | Iconos + texto + color para estados |

### 7.3 PERFIL DEL ESTUDIANTE

| CATEGORÍA | PROBLEMA | IMPACTO EN EL USUARIO | IDEA DE MEJORA |
|------------|----------|------------------------|-----------------|
| **Arquitectura de Información** | Sin sección de "Mi Carrera" con plan de estudios | Desorientación en la ruta académica | Pestaña "Mi Carrera" con plan interactivo, correlatividades y duración |
| **Contenido** | No muestra correlatividades entre materias | Dificultad para planificar inscripciones a finales | Diagrama de flujo o árbol de materias con estado aprobado/pendiente |
| **Contenido** | Historial académico disperso o incompleto | No se puede verificar avance real | Panel con能看到: aprobaciones, aplazos, equivalencias |
| **Usabilidad** | Cambio de foto/perfil poco intuitivo | Usuarios que no logran personalizar su cuenta | Acciones claras con preview de avatar |
| **Privacidad** | Sin configuración de privacidad de datos | Desconocimiento sobre qué datos son visibles | Sección de configuración de privacidad |
| **Diseño Visual** | Información desorganizada en una sola columna | Escaneo difícil de datos personales vs académicos | Separar en secciones: Datos Personales / Datos Académicos |

### 7.4 CALENDARIO ACADÉMICO

| CATEGORÍA | PROBLEMA | IMPACTO EN EL USUARIO | IDEA DE MEJORA |
|------------|----------|------------------------|-----------------|
| **Funcionalidad** | Cronograma visible pero sin enlaces a aulas/reuniones | No se puede acceder directamente a lo programado | Cada evento debe ser clickeable con link directo |
| **Diseño Visual** | Tablas no responsivas (scroll horizontal en móvil) | Experiencia rota en celulares | Vista tipo agenda con scroll vertical |
| **Navegación** | No hay vista por mes/semana/día | Visibilidad limitada según necesidad | Selector de vista (calendario/ lista) |
| **Contenido** | No distingue visualmente examenes vs cursadas vs eventos | ANSIEDAD por no saber qué es cada fecha | Codificación por color + icono diferenciador |
| **Recordatorios** | Sin opción de sincronizar con calendario externo | Dependencia de copiar fechas manualmente | Botón "Agregar a Google Calendar" / "Sincronizar" |
| **Notificaciones** | No hay alertas por proximidad de fechas | Olvido de examenes o entregas | Notificaciones push y email configurable |

### 7.5 AULA VIRTUAL (Contenido por Materia)

| CATEGORÍA | PROBLEMA | IMPACTO EN EL USUARIO | IDEA DE MEJORA |
|------------|----------|------------------------|-----------------|
| **Arquitectura de Información** | Estructura de contenidos inconsistente entre profesores | Cada materia requiere reaprender la navegación | Templates estandarizados para todas las materias |
| **Contenido** | Materiales en formatos variados sin previsualización | No se sabe qué contiene antes de descargar | Previsualización inline (PDF viewer, video player) |
| **Navegación** | Sin indicador de progreso dentro del contenido | Desconocimiento de qué se vio y qué falta | Barra de progreso por unidad/módulo |
| **Diseño Visual** | Guiones de estudio en formato texto denso | Fatiga visual, abandono del material | Diseño editorial con tipografía clara, imágenes, espacios |
| **Interactividad** | Videos sin controles de velocidad/playback | Dificultad para estudiantes que necesitan repasar lento | Reproductor con velocidad ajustable, subtítulos |
| **Foros** | Foros de discusión difíciles de seguir | Participación limitada en debates académicos | Diseño tipo hilo de conversación, mejor jerarquía |
| **Usabilidad** | Navegación entre unidades poco clara | Pérdida de contexto de ubicación | Breadcrumb + menú lateral de unidades expandible |
| **Mobile** | Contenido descargable pero no accesible offline | Estudiantes sin conexión no pueden estudiar | Opción de descarga para offline o PWA |

### 7.6 SISTEMA DE ENTREGAS / TAREAS

| CATEGORÍA | PROBLEMA | IMPACTO EN EL USUARIO | IDEA DE MEJORA |
|------------|----------|------------------------|-----------------|
| **Notificaciones** | Sin confirmación de entrega exitosa | ANSIEDAD por desconocer si se entregó | Modal de confirmación + email de recibo |
| **Visibilidad** | Estados de corrección poco claros (entregado/pendiente/corregido) | Desconocimiento del estado de cada trabajo | Estados claros con timeline visual |
| **Contenido** | Devolución del profesor en formato poco accesible | Retroalimentación ignorada | Sección de devoluciones destacada, no embedida en texto |
| **Flujo de Usuario** | Reentrega de trabajos poco intuitiva | Estudiantes que no saben cómo reentregar | Botón claro "Reentregar" con historial de versiones |
| **Diseño Visual** | Lista de entregas como tabla densa | Escaneo difícil, confusión entre pendientes y entregados | Cards con estado, fecha, y acción pendiente |
| **Límites** | Sin recordatorio de cercanía de fecha límite | Olvido de entregas, trabajos perdidos | Countdown timer + notificaciones progresivas (7d, 3d, 1d) |

### 7.7 SISTEMA DE CALIFICACIONES

| CATEGORÍA | PROBLEMA | IMPACTO EN EL USUARIO | IDEA DE MEJORA |
|------------|----------|------------------------|-----------------|
| **Diseño Visual** | Calificaciones en tabla sin contexto | No se entiende qué evaluación corresponde a qué nota | Cada nota vinculada a nombre de evaluación + fecha |
| **Contenido** | Sin promedio general visible | Dificultad para autoevaluarse | Promedio ponderado y promedio simple destacados |
| **Contenido** | No hay comparativa histórica (notas vs promedio de la cursada) | Desconocimiento del propio desempeño relativo | Gráfico de progreso académico por materia |
| **Arquitectura de Información** | Detalle de notas disperso entre aulas y perfil | Navegación confusa para ver calificaciones | Sección centralizada "Mis Calificaciones" con filtros |
| **Accesibilidad** | Notas solo en formato numérico | Dificultad para usuarios con discalculia | Opción de vista numérica + concepto (Aprobado/Desaprobado) |
| **Contenido** | Sin explicación de criterios de evaluación | Desconocimiento de cómo se evaluó | Vincular a rúbrica o criterios del profesor |

### 7.8 EXÁMENES EN LÍNEA

| CATEGORÍA | PROBLEMA | IMPACTO EN EL USUARIO | IDEA DE MEJORA |
|------------|----------|------------------------|-----------------|
| **Flujo de Usuario** | Tiempo del examen no visible claramente | ANSIEDAD por no saber cuánto queda | Timer prominente + alerta a los 10min y 5min |
| **Diseño Visual** | Preguntas largas sin espaciado | Fatiga visual durante el examen | Diseño de pregunta con mucho white space |
| **Usabilidad** | Sin guardado automático de respuestas | Miedo a perder progreso por cierre accidental | Guardado automático cada 30s + indicador |
| **Navegación** | No permite volver a preguntas anteriores | Imposibilidad de revisar/rectificar respuestas | Navegador de preguntas tipo test con estado |
| **Contenido** | Sin instrucciones claras de cada examen | Respuestas incorrectas por malentendido | Instrucciones expandibles al inicio de cada examen |
| **Respaldos** | Sin confirmación antes de enviar examen | Envíos accidentales sin recuperación | Modal de confirmación + resumen de respuestas |

### 7.9 NOTIFICACIONES

| CATEGORÍA | PROBLEMA | IMPACTO EN EL USUARIO | IDEA DE MEJORA |
|------------|----------|------------------------|-----------------|
| **Navegación** | Notificaciones solo por email | Información perdida si no se revisa email | Centro de notificaciones in-app con badges |
| **Priorización** | Todas las notificaciones con igual peso | Ruido, ignores las importantes | Sistema de prioridades (Urgente/Normal/Info) con filtros |
| **Contenido** | Cuerpo de notificación truncado | Dificultad para decidir si es importante sin abrir | Preview del mensaje completo + acción rápida |
| **Usabilidad** | Sin opción de marcar como leído/no leído | Notificaciones importantes perdidas entre muchas | Acciones de marcar, архивировать, eliminar |
| **Notificaciones** | Sin preferencias por tipo de notificación | Recibir emails irrelevantes | Configuración granular de canales (email/push/in-app) |

### 7.10 BIBLIOTECA / RECURSOS ACADÉMICOS

| CATEGORÍA | PROBLEMA | IMPACTO EN EL USUARIO | IDEA DE MEJORA |
|------------|----------|------------------------|-----------------|
| **Búsqueda** | Catálogo difícil de navegar | No se encuentran materiales necesarios | Buscador con filtros (autor, materia, tipo) |
| **Contenido** | Préstamos y vencimientos poco visibles | Multas por atraso, libros retenidos | Dashboard de préstamos activos con fechas de devolución |
| **Diseño Visual** | Interfaz anticuada de catálogo | Abandono de la búsqueda | Diseño moderno con tarjetas de libros, portadas |
| **Integración** | Biblioteca no vinculada a materias del estudiante | Desconexión con contexto académico | "Libros recomendados para [Materia X]" |
| **Acceso** | Recursos digitales requieren login separado | Fricción para acceder a papers/artículos | SSO unificado con el campus |

### 7.11 MENSAJERÍA / COMUNICACIÓN

| CATEGORÍA | PROBLEMA | IMPACTO EN EL USUARIO | IDEA DE MEJORA |
|------------|----------|------------------------|-----------------|
| **Diseño Visual** | Interfaz de mensajería básica/antigua | Experiencia inferior a apps de chat modernas | Diseño tipo chat moderno (WhatsApp/Telegram) |
| **Navegación** | Dificultad para encontrar conversación con profesor | Pérdida de hilos importantes | Buscador de conversaciones + filtros (profesor/materia) |
| **Notificaciones** | Mensajes nuevos mezclados con otros tipos | No se distingue mensaje privado de anuncio | Iconos diferenciados: mensaje directo vs broadcast |
| **Contenido** | Sin indicador de lectura (visto/no visto) | Desconocimiento si el profesor leyó el mensaje | Checkmarks azules de "leído" |
| **Usabilidad** | No permite adjuntar archivos fácilmente | Inconveniencia para enviar trabajos | Botón de adjuntar visible + drag & drop |

### 7.12 CONFIGURACIÓN / CUENTA

| CATEGORÍA | PROBLEMA | IMPACTO EN EL USUARIO | IDEA DE MEJORA |
|------------|----------|------------------------|-----------------|
| **Usabilidad** | Cambio de contraseña enterrado en configuración | Usuarios que no saben dónde cambiar clave | Acceso directo desde perfil avatar |
| **Privacidad** | Sin control de visibilidad de perfil | Desconocimiento de qué ven otros | Configuración granular de privacidad |
| **Contenido** | Sin sección de ayuda/tutorial del campus | Usuarios nuevos perdidos | Tours guiados + FAQ contextual |
| **Diseño Visual** | Configuraciones en lista plana sin categorías | Dificultad para encontrar opciones | Agrupación lógica: Cuenta / Notificaciones / Privacidad / Soporte |

---

## 8. MATRIZ DE PRIORIZACIÓN

### Priority Matrix (Impacto vs Esfuerzo)

| PESTAÑA | PROBLEMA PRINCIPAL | IMPACTO | ESFUERZO | PRIORIDAD |
|---------|-------------------|---------|----------|-----------|
| **Login** | Sin recuperación de contraseña visible | ALTO | BAJO | 🔴 INMEDIATA |
| **Mis Cursos** | Sin botón Volver + Aula en misma pestaña | ALTO | BAJO | 🔴 INMEDIATA |
| **Perfil** | Sin Plan de Estudios / Mi Carrera | ALTO | MEDIO | 🔴 INMEDIATA |
| **Mis Cursos** | Mobile no responsivo | CRÍTICO | ALTO | 🟠 ALTA |
| **Calificaciones** | Tabla sin contexto de evaluaciones | MEDIO | BAJO | 🟠 ALTA |
| **Aula Virtual** | Inconsistencia entre materias | ALTO | ALTO | 🟠 ALTA |
| **Entregas** | Sin confirmación de entrega | ALTO | BAJO | 🟠 ALTA |
| **Exámenes** | Sin timer visible | CRÍTICO | BAJO | 🔴 INMEDIATA |
| **Notificaciones** | Solo email, sin centro in-app | MEDIO | MEDIO | 🟡 MEDIA |
| **Biblioteca** | Catálogo anticuado | MEDIO | ALTO | 🟡 MEDIA |
| **Mensajería** | Sin indicador de lectura | MEDIO | BAJO | 🟡 MEDIA |
| **Configuración** | Sin tours/tutoriales | BAJO | MEDIO | 🟢 POSTERGABLE |

---

## 9. WIREFRAMES PROPUESTOS POR PESTAÑA

### 9.1 Wireframe: Login Moderno

```
┌────────────────────────────────────┐
│                                    │
│        [LOGO UMAI]                 │
│     Campus Virtual                 │
│                                    │
│  ┌──────────────────────────────┐  │
│  │ 👤 Usuario o email           │  │
│  └──────────────────────────────┘  │
│                                    │
│  ┌──────────────────────────────┐  │
│  │ 🔒 Contraseña               │  │
│  └──────────────────────────────┘  │
│                                    │
│  ☐ Recordarme                     │
│                                    │
│  ┌──────────────────────────────┐  │
│  │       INGRESAR              │  │
│  └──────────────────────────────┘  │
│                                    │
│     ¿Olvidaste tu contraseña? →    │
│                                    │
│  ┌──────────────────────────────┐  │
│  │ 💬 ¿Necesitás ayuda?         │  │
│  └──────────────────────────────┘  │
│                                    │
└────────────────────────────────────┘
```

### 9.2 Wireframe: Plan de Estudios (Mi Carrera)

```
┌────────────────────────────────────┐
│ ← Mi Carrera              ✏️ Editar │
├────────────────────────────────────┤
│                                    │
│  LIC. EN KINESIOLOGÍA              │
│  Cohorte: 2023 | Estado: En curso  │
│  ████████████░░░ 65% completado    │
│                                    │
│  ─── 1er Año ───                   │
│  ┌────────────────────────────┐   │
│  │ ✅ Anatomía I      8/10    │   │
│  │ ✅ Biología        7/10    │   │
│  │ 🔄 Fisiología      60%     │   │
│  │ ⏳ Bioquímica      -        │   │
│  └────────────────────────────┘   │
│                                    │
│  ─── 2do Año ───                   │
│  ┌────────────────────────────┐   │
│  │ 🔒 Anatomía II (requiere A.I.)│  │
│  │ 🔒 Fisiología II (requiere F.I.)│ │
│  │ ⏳ Farmacología   -          │   │
│  └────────────────────────────┘   │
│                                    │
│  📊 Ver correlatividades           │
│                                    │
├────────────────────────────────────┤
│  🏠   📚   📅   📊   👤           │
└────────────────────────────────────┘

LEYENDA:
✅ Aprobado   🔄 Cursando   ⏳ Pendiente   🔒 Bloqueado
```

### 9.3 Wireframe: Calendario Interactivo

```
┌────────────────────────────────────┐
│  Calendario        Hoy    📅       │
├────────────────────────────────────┤
│  <   Marzo 2026   >                │
│                                    │
│  Lu  Ma  Mi  Ju  Vi  Sa  Do       │
│            1   2   3   4   5      │
│   6   7  [8]  9  10  11  12      │
│  13  14  15  16  17  18  19      │
│  20  21 [22] 23  24  25  26      │
│  27  28  29  30  31              │
│                                    │
│  ─── Hoy: 8 de Abril ───          │
│                                    │
│  ┌────────────────────────────┐  │
│  │ 🔴 15:00 Examen Bioquímica │  │
│  │    Aula 301 → Ir           │  │
│  └────────────────────────────┘  │
│                                    │
│  ┌────────────────────────────┐  │
│  │ 🟡 18:00 Entrega TP #3     │  │
│  │    Fisiología → Entregar   │  │
│  └────────────────────────────┘  │
│                                    │
│  ─── Esta semana ───              │
│  📝 15 Abr - Parcial Bioquímica  │
│  📝 22 Abr - Parcial Fisiología  │
│                                    │
├────────────────────────────────────┤
│  🏠   📚   📅   📊   👤           │
└────────────────────────────────────┘
```

### 9.4 Wireframe: Aula Virtual (Contenido de Materia)

```
┌────────────────────────────────────┐
│ ← Farmacología          ⋮ Menú    │
├────────────────────────────────────┤
│  Dr. García | 85% | Unidad 12/15  │
│  ████████████░░░░░                │
├────────────────────────────────────┤
│                                    │
│  ┌─ UNIDADES ──────────────────┐   │
│  │                            │   │
│  │ ▶ Unidad 12: Farmacodinamia│   │
│  │   ✓ Lección 1              │   │
│  │   ✓ Lección 2              │   │
│  │   ◉ Lección 3 ← ACTUAL     │   │
│  │   ○ Lección 4              │   │
│  │                            │   │
│  │ ▶ Unidad 13: Farmacocinética│  │
│  │ ▶ Unidad 14: Toxicología    │   │
│  │ ▶ Unidad 15: Casos clínicos │   │
│  │                            │   │
│  └────────────────────────────┘   │
│                                    │
│  ┌────────────────────────────┐  │
│  │ 📄 Guía de Estudio PDF     │  │
│  │ 🎬 Video: Mecanismo de... │  │
│  │ 📝 Foro: Casos clínicos   │  │
│  └────────────────────────────┘  │
│                                    │
│  ┌────────────────────────────┐  │
│  │ 📤 Entregar TP #4         │  │
│  │ Vence: 15 Abr, 23:59      │  │
│  └────────────────────────────┘  │
│                                    │
├────────────────────────────────────┤
│  🏠   📚   📅   📊   👤           │
└────────────────────────────────────┘
```

---

## 10. CHECKLIST DE IMPLEMENTACIÓN

### Fase 1: Crítico (Semanas 1-4)
- [ ] Rediseño de Login con recuperación de contraseña visible
- [ ] Implementar botón "Volver" y apertura en nuevas pestañas
- [ ] Timer visible en exámenes
- [ ] Confirmación de entregas
- [ ] Diseño mobile-responsive en Mis Cursos

### Fase 2: Alta Prioridad (Semanas 5-8)
- [ ] Sistema de Cards en lugar de listas
- [ ] Plan de Estudios / Mi Carrera
- [ ] Calendario interactivo con links directos
- [ ] Template unificado para Aulas Virtuales
- [ ] Centro de notificaciones in-app

### Fase 3: Mejora Continua (Semanas 9-12)
- [ ] Mensajería con indicadores de lectura
- [ ] Biblioteca con catálogo modernizado
- [ ] Tours guiados para nuevos usuarios
- [ ] Sincronización con calendarios externos
- [ ] Gráficos de progreso académico

---

*Documento creado para el rediseño del Campus Virtual UMAI*
*Versión: 1.0 | Fecha: Abril 2026*

---

## 11. WIREFRAMES ADICIONALES

### 11.1 Wireframe: Perfil / Mi Carrera (Yazmin - 3er Año Multimedia)

**MOBILE (< 768px)**
```
┌────────────────────────────────────┐
│ ← Mi Perfil              ✏️ Editar │
├────────────────────────────────────┤
│                                    │
│  ┌──────────────────────────────┐  │
│  │  👤                         │  │
│  │   Yazmin García              │  │
│  │   Legajo: 2023-0452          │  │
│  │   [Cambiar foto]            │  │
│  └──────────────────────────────┘  │
│                                    │
│  ── Datos Académicos ──            │
│                                    │
│  Carrera: Tecnología Multimedial   │
│  Año: 3ro (Cursando)              │
│  Modalidad: Presencial             │
│  Horario: Tarde (18:30 - 22:00)   │
│                                    │
│  ── Progreso de Carrera ──        │
│                                    │
│  ████████████░░░░░░  72%         │
│  26/36 materias aprobadas         │
│                                    │
│  ── Mi Plan de Estudios ──         │
│                                    │
│  ┌──────────────────────────────┐  │
│  │ 📋 VER PLAN COMPLETO         │  │
│  └──────────────────────────────┘  │
│                                    │
│  ── Contacto ──                   │
│                                    │
│  📧 yazmin.garcia@mail.com       │
│  📱 11-xxxx-xxxx                  │
│                                    │
├────────────────────────────────────┤
│  🏠   📚   📅   📊   👤           │
└────────────────────────────────────┘
```

**DESKTOP (≥ 1024px)**
```
┌────────────────────────────────────────────────────────────────┐
│ 🏠 Inicio  │ 📚 Cursos  │ 📅 Calendario  │ 📊 Notas  │ 👤 ▼ │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│  ┌─────────────────────┐  ┌────────────────────────────────┐  │
│  │                     │  │  MI PERFIL                     │  │
│  │  👤 Yazmin García   │  │                                │  │
│  │  ───────────────    │  │  Datos Académicos              │  │
│  │  📚 Tec. Multimedia │  │  ┌────────────────────────────┐│  │
│  │  Legajo: 2023-0452 │  │  │ Carrera: Lic. Multimedia   ││  │
│  │                     │  │  │ Año: 3ro | Modalidad: Pres.││  │
│  │  ── Estadísticas ─  │  │  │ Estado: Cursando           ││  │
│  │  📊 72% avance      │  │  └────────────────────────────┘│  │
│  │  ✅ 26 aprobadas     │  │                                │  │
│  │  ⏳ 5 cursando      │  │  Progreso de Carrera           │  │
│  │  📝 2 finales       │  │  ████████████░░░░░░░░░  72%  │  │
│  │                     │  │  26/36 materias aprobadas      │  │
│  │  ── Accesos ─────── │  │                                │  │
│  │  📋 Plan de estudios│  │  Contacto                     │  │
│  │  📜 Certificado     │  │  yazmin.garcia@mail.com       │  │
│  │  ⚙️ Configuración   │  │  11-xxxx-xxxx                 │  │
│  │                     │  │                                │  │
│  └─────────────────────┘  └────────────────────────────────┘  │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

### 11.2 Wireframe: Plan de Estudios Interactivo

**MOBILE (< 768px)**
```
┌────────────────────────────────────┐
│ ← Plan de Estudios      🔍 Filtrar │
├────────────────────────────────────┤
│                                    │
│  LIC. EN TECNOLOGÍA MULTIMEDIAL    │
│  Cohorte: 2023 | 4 años           │
│  ████████████░░░░░  72%           │
│                                    │
│  ── 1er Año ─── [✅ Completado]   │
│  ┌──────────────────────────────┐  │
│  │ ✅ Fundamentos de Diseño   8│  │
│  │ ✅ Imagen Digital         7│  │
│  │ ✅ Técnicas de Producción  9│  │
│  │ ✅ Programación MM I      8│  │
│  │ ✅ Redes y Tecnologías     7│  │
│  └──────────────────────────────┘  │
│                                    │
│  ── 2do Año ─── [✅ Completado]   │
│  ┌──────────────────────────────┐  │
│  │ ✅ Diseño de Interfaces    8│  │
│  │ ✅ Producción Digital II   7│  │
│  │ ✅ Técnicas de Animación   9│  │
│  │ ✅ Programación MM II      8│  │
│  │ ... (5 más)                 │  │
│  └──────────────────────────────┘  │
│                                    │
│  ── 3er Año ─── [🔄 Cursando]    │
│  ┌──────────────────────────────┐  │
│  │ 🔄 Prog. Multimedial II  78%│  │
│  │ 🔄 Diseño Aplicado       65%│  │
│  │ 🔄 Producción Audiovisual 50%│  │
│  │ 🔄 Arte Digital I         88%│  │
│  │ 🔄 Comunicación Social    40%│  │
│  │ ⏳ Investigación de Mercado│  │
│  │ ⏳ Marketing Aplicado      │  │
│  │ ⏳ Inglés III              │  │
│  │ ⏳ Proyecto Senior I       │  │
│  │ ⏳ Seminario Act. Tec. I   │  │
│  └──────────────────────────────┘  │
│                                    │
│  ── 4to Año ─── [⏳ Pendiente]    │
│  ┌──────────────────────────────┐  │
│  │ 🔒 Prog. Multimedial III    │  │
│  │   Requiere: Prog. MM II      │  │
│  │ 🔒 Diseño Estratégico        │  │
│  │ 🔒 Sistemas Gamificados      │  │
│  │ 🔒 Proyecto Senior II       │  │
│  │ ... (6 más)                 │  │
│  └──────────────────────────────┘  │
│                                    │
│  📊 Ver correlatividades           │
│                                    │
├────────────────────────────────────┤
│  🏠   📚   📅   📊   👤           │
└────────────────────────────────────┘

LEYENDA:
✅ Aprobado   🔄 Cursando   ⏳ Pendiente   🔒 Bloqueado
```

### 11.3 Wireframe: Aula Virtual - Materia Específica

**MOBILE (< 768px)**
```
┌────────────────────────────────────┐
│ ← Prog. Multimedial II    ⋮ Menú  │
├────────────────────────────────────┤
│  Mg. Damián Pereyra                │
│  Unidad 7/9 · 78%                 │
│  ████████████░░░░░░              │
├────────────────────────────────────┤
│                                    │
│  ┌──────────────────────────────┐  │
│  │ 📚 UNIDADES                  │  │
│  ├──────────────────────────────┤  │
│  │ ✅ 1-5: Fundamentos         │  │
│  │ ✅ 6: React Native Intro    │  │
│  │ ──────────────────────────── │  │
│  │ ▶ 7: Componentes y Props  ▼│  │
│  │   ✓ Lección 1: Conceptos   │  │
│  │   ✓ Lección 2: Crear Comp. │  │
│  │   ◉ Lección 3: Props ▼    │  │
│  │   ○ Lección 4: Estados     │  │
│  │ ──────────────────────────── │  │
│  │ ▶ 8: Hooks básicos        │  │
│  │ ▶ 9: Integración Final    │  │
│  └──────────────────────────────┘  │
│                                    │
│  ── Material de la Clase ──        │
│                                    │
│  ┌──────────────────────────────┐  │
│  │ 📄 Guía: Props y Estados     │  │
│  │    PDF · 2.4 MB              │  │
│  └──────────────────────────────┘  │
│  ┌──────────────────────────────┐  │
│  │ 🎬 Video: useState y useEffect│  │
│  │    15:32 min                  │  │
│  └──────────────────────────────┘  │
│  ┌──────────────────────────────┐  │
│  │ 💻 Práctica: Components Lab   │  │
│  │    Deadline: 14 Abr 23:59    │  │
│  └──────────────────────────────┘  │
│                                    │
│  ── Foros ──                       │
│                                    │
│  ┌──────────────────────────────┐  │
│  │ 💬 Dudas sobre el TP Final   │  │
│  │    12 mensajes · Último: 2h  │  │
│  └──────────────────────────────┘  │
│                                    │
├────────────────────────────────────┤
│  🏠   📚   📅   📊   👤           │
└────────────────────────────────────┘
```

### 11.4 Wireframe: Sistema de Calificaciones

**MOBILE (< 768px)**
```
┌────────────────────────────────────┐
│ ← Mis Calificaciones      📊 Stats │
├────────────────────────────────────┤
│                                    │
│  ── Resumen ──                     │
│                                    │
│  ┌────────┐ ┌────────┐ ┌────────┐  │
│  │  8.2  │ │ 85%   │ │  8    │  │
│  │Promedio│ │Aprob. │ │Materias│  │
│  └────────┘ └────────┘ └────────┘  │
│                                    │
│  ── Cursando ──                    │
│                                    │
│  ┌──────────────────────────────┐  │
│  │ Prog. Multimedial II         │  │
│  │ TP1: 9  TP2: 8  Práctica: 7  │  │
│  │ ─────────────────────────── │  │
│  │ Promedio parcial: 8.0        │  │
│  │ Estado: ● En curso          │  │
│  └──────────────────────────────┘  │
│                                    │
│  ┌──────────────────────────────┐  │
│  │ Diseño Aplicado               │  │
│  │ TP1: 7  TP2: 6               │  │
│  │ ─────────────────────────── │  │
│  │ Promedio parcial: 6.5        │  │
│  │ Estado: ⚠️ En riesgo         │  │
│  └──────────────────────────────┘  │
│                                    │
│  ── Aprobadas ──                   │
│                                    │
│  ┌──────────────────────────────┐  │
│  │ Diseño de Interfaces    8/10 │  │
│  │ Producción Digital II    7/10 │  │
│  │ Técnicas de Animación   9/10 │  │
│  │ Programación MM I       8/10 │  │
│  └──────────────────────────────┘  │
│                                    │
│  ── Finales Pendientes ──          │
│  ┌──────────────────────────────┐  │
│  │ Redes y Tecnologías          │  │
│  │ 1er Llamado: 20 Abr         │  │
│  └──────────────────────────────┘  │
│                                    │
├────────────────────────────────────┤
│  🏠   📚   📅   📊   👤           │
└────────────────────────────────────┘
```

**DESKTOP (≥ 1024px)**
```
┌──────────────────────────────────────────────────────────────────┐
│ ← Mis Calificaciones                          📊 Stats  │ 📧 Enviar│
├──────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐  ┌────────────┐ │
│  │    8.2    │  │    85%     │  │     8      │  │     2      │ │
│  │ Promedio  │  │ Aprobación │  │ Cursando  │  │ Finales    │ │
│  │ General   │  │ Rate       │  │            │  │ Pendientes │ │
│  └────────────┘  └────────────┘  └────────────┘  └────────────┘ │
│                                                                   │
│  ── Materias Cursando ─────────────────────────────────────────  │
│                                                                   │
│  ┌─────────────────────────────────────────────────────────────┐ │
│  │ Materia                 │ TP1 │ TP2 │ Prác.│ Promedio │ Est.│ │
│  ├─────────────────────────────────────────────────────────────┤ │
│  │ Prog. Multimedial II    │  9  │  8  │  7   │   8.0    │  ●  │ │
│  │ Diseño Aplicado         │  7  │  6  │  -   │   6.5    │  ⚠️ │ │
│  │ Producción Audiovisual  │  -  │  -  │  8   │   8.0    │  ●  │ │
│  │ Arte Digital I          │  9  │  9  │  8   │   8.7    │  ●  │ │
│  │ Comunicación Social     │  5  │  -  │  -   │   5.0    │  ⚠️ │ │
│  └─────────────────────────────────────────────────────────────┘ │
│                                                                   │
│  ── Finales Pendientes ──────────────────────────────────────── │
│                                                                   │
│  ┌─────────────────────────────────────────────────────────────┐ │
│  │ Materia                 │ 1er Ll. │ 2do Ll. │ Estado        │ │
│  ├─────────────────────────────────────────────────────────────┤ │
│  │ Redes y Tecnologías     │ 20 Abr   │ 15 May   │ Inscripto    │ │
│  │ Taller de Integración II│ 25 Abr   │ 18 May   │ Disponible   │ │
│  └─────────────────────────────────────────────────────────────┘ │
│                                                                   │
└──────────────────────────────────────────────────────────────────┘
```

### 11.5 Wireframe: Calendario Académico

**MOBILE (< 768px)**
```
┌────────────────────────────────────┐
│ Calendario         Hoy    📅       │
├────────────────────────────────────┤
│                                    │
│  ┌──────────────────────────────┐  │
│  │  <   Abril 2026   >         │  │
│  │                             │  │
│  │  Lu  Ma  Mi  Ju  Vi  Sa  Do │  │
│  │              1   2   3   4  │  │
│  │   5   6   7  [8]  9  10  11 │  │
│  │  12  13  14  15  16  17  18 │  │
│  │  19  20  21  22  23  24  25 │  │
│  │  26  27  28  29  30         │  │
│  └──────────────────────────────┘  │
│                                    │
│  ── 8 de Abril (Hoy) ──            │
│                                    │
│  ┌──────────────────────────────┐  │
│  │ 🔵 10:00 Prog. MM II        │  │
│  │    Virtual · Link enviado    │  │
│  └──────────────────────────────┘  │
│  ┌──────────────────────────────┐  │
│  │ 🟢 18:30 Arte Digital I     │  │
│  │    Aula 301 · Presencial    │  │
│  └──────────────────────────────┘  │
│                                    │
│  ── Esta Semana ──                 │
│                                    │
│  📅 Jue 10: Clases suspendidas    │
│  📝 Vie 12: Parcial Prog. MM II   │
│  📝 Vie 18: Parcial Prod. Audiov. │
│                                    │
│  ── Sincronizar ──                 │
│  ┌──────────────────────────────┐  │
│  │ 📱 Apple Calendar             │  │
│  │ 📱 Google Calendar            │  │
│  │ 📱 Outlook                   │  │
│  └──────────────────────────────┘  │
│                                    │
├────────────────────────────────────┤
│  🏠   📚   📅   📊   👤           │
└────────────────────────────────────┘

LEYENDA EVENTOS:
🔵 Clase virtual   🟢 Clase presencial
📝 Examen          📅 Evento/Cierre
```

### 11.6 Wireframe: Login Modernizado

**MOBILE (< 768px)**
```
┌────────────────────────────────────┐
│                                    │
│                                    │
│         [LOGO UMAI]                │
│      Campus Virtual                │
│                                    │
│  ┌──────────────────────────────┐  │
│  │                              │  │
│  │  👤                         │  │
│  │  Usuario o email             │  │
│  │  ──────────────────────────  │  │
│  │                              │  │
│  │  🔒                         │  │
│  │  Contraseña                  │  │
│  │  ──────────────────────────  │  │
│  │                              │  │
│  │  ☐ Recordarme               │  │
│  │                              │  │
│  │  ┌────────────────────────┐ │  │
│  │  │      INGRESAR          │ │  │
│  │  └────────────────────────┘ │  │
│  │                              │  │
│  │  ──────────────────────────  │  │
│  │                              │  │
│  │  ¿Olvidaste tu contraseña?   │  │
│  │                              │  │
│  └──────────────────────────────┘  │
│                                    │
│  ┌──────────────────────────────┐  │
│  │ 💬 ¿Necesitás ayuda?         │  │
│  │    Chateá con soporte        │  │
│  └──────────────────────────────┘  │
│                                    │
│  ── Requisitos Técnicos ──         │
│  Navegadores: Chrome, Firefox,    │
│  Edge o Safari (versión actual)   │
│                                    │
└────────────────────────────────────┘
```

**DESKTOP (≥ 1024px)**
```
┌──────────────────────────────────────────────────────────────────┐
│                                                                  │
│  ┌─────────────────────────────┐  ┌───────────────────────────┐ │
│  │                             │  │                          │ │
│  │     [IMAGEN INSTITUCIONAL]   │  │      [LOGO UMAI]          │ │
│  │                             │  │      Campus Virtual       │ │
│  │     Universidad             │  │                          │ │
│  │     Maimónides              │  │  ┌────────────────────┐  │ │
│  │                             │  │  │ 👤                  │  │ │
│  │                             │  │  └────────────────────┘  │ │
│  │                             │  │                          │ │
│  │                             │  │  ┌────────────────────┐  │ │
│  │                             │  │  │ 🔒                  │  │ │
│  │                             │  │  └────────────────────┘  │ │
│  │                             │  │                          │ │
│  │                             │  │  ☐ Recordarme           │ │
│  │                             │  │                          │ │
│  │                             │  │  ┌────────────────────┐  │ │
│  │                             │  │  │     INGRESAR       │  │ │
│  │                             │  │  └────────────────────┘  │ │
│  │                             │  │                          │ │
│  │                             │  │  ¿Olvidaste tu clave?   │ │
│  │                             │  │                          │ │
│  │                             │  │  ────────────────────    │ │
│  │                             │  │                          │ │
│  │                             │  │  💬 Soporte en línea     │ │
│  │                             │  │                          │ │
│  └─────────────────────────────┘  └───────────────────────────┘ │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

### 11.7 Wireframe: Notificaciones

**MOBILE (< 768px)**
```
┌────────────────────────────────────┐
│ ← Notificaciones      ✅ Marcar   │
├────────────────────────────────────┤
│                                    │
│  Filtros:                          │
│  [Todos] [Urgentes] [Cursos] [Sis] │
│                                    │
│  ── Hoy ──                         │
│                                    │
│  ┌──────────────────────────────┐  │
│  │ 🔴 URGENTE                   │  │
│  │ Aula invertida Prog MM II    │  │
│  │ Revisá el video antes del    │  │
│  │ parcial del viernes          │  │
│  │ Hace 30 minutos              │  │
│  │ ─────────────────────────── │  │
│  │ Prog. Multimedial II  →     │  │
│  └──────────────────────────────┘  │
│                                    │
│  ┌──────────────────────────────┐  │
│  │ 🔵 NUEVO MATERIAL            │  │
│  │ Guía de Arte Digital I        │  │
│  │ Subí el taller de Illustrator│  │
│  │ Hace 2 horas                 │  │
│  │ ─────────────────────────── │  │
│  │ Arte Digital I  →           │  │
│  └──────────────────────────────┘  │
│                                    │
│  ── Ayer ──                        │
│                                    │
│  ┌──────────────────────────────┐  │
│  │ 🟢 RECORDATORIO              │  │
│  │ TP Final: Arte Digital I     │  │
│  │ Vence en 2 días              │  │
│  │ ─────────────────────────── │  │
│  │ Entregar  →                 │  │
│  └──────────────────────────────┘  │
│                                    │
│  ┌──────────────────────────────┐  │
│  │ 🔵 ENTREGA RECIBIDA         │  │
│  │ TP3 Producción Audiovisual   │  │
│  │ Entrega exitosa              │  │
│  └──────────────────────────────┘  │
│                                    │
├────────────────────────────────────┤
│  🏠   📚   📅   📊   👤           │
└────────────────────────────────────┘

LEYENDA:
🔴 Urgente   🔵 Normal   🟢 Recordatorio
```

---

## 12. BREAKPOINTS Y RESPONSIVE

### 12.1 Definición de Breakpoints

| Breakpoint | Dispositivos | Ancho |
|------------|--------------|-------|
| Mobile | Smartphones pequeños | < 480px |
| Mobile L | Smartphones grandes / Tablets pequeñas | 480px - 767px |
| Tablet | Tablets | 768px - 1023px |
| Desktop | Laptops / PCs | 1024px - 1279px |
| Desktop L | Monitores grandes | ≥ 1280px |

### 12.2 Estrategia Responsive

```
Mobile First (default)
    ↓
min-width: 480px  → Small mobile adjustments
    ↓
min-width: 768px  → Tablet layout (2 columns)
    ↓
min-width: 1024px → Desktop layout (3 columns, sidebar)
    ↓
min-width: 1280px → Large desktop (max-width container)
```

### 12.3 Componentes Responsivos Clave

| Componente | Mobile | Tablet | Desktop |
|------------|--------|--------|---------|
| **Header** | Hamburger + Title | Logo + Nav | Logo + Full Nav + User |
| **Courses Grid** | 1 columna | 2 columnas | 3 columnas |
| **Course Card** | Stack vertical | Expandido | Con más metadata |
| **Bottom Nav** | Visible (fixed) | Visible | Hidden |
| **Sidebar** | No visible | No visible | Visible (fixed) |
| **Cards** | Full width | Split | Grid layout |

---

*Documento actualizado con wireframes mobile y desktop*
*Versión: 2.0 | Fecha: Abril 2026*
