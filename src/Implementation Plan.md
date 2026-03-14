# Plan de Implementación - Kakebo PWA

Este plan detalla la evolución de la aplicación desde un rastreador de gastos simple hasta un sistema completo de gestión Kakebo.

## Fase 1.5: Alineación de Modelo de Datos y Categorías (EN CURSO)

Antes de pasar a la planificación mensual, debemos asegurar que el modelo de datos soporte el nivel de detalle requerido por el método Kakebo.

### [Modelo de Datos]

#### [MODIFICAR] [index.ts](file:///home/jose/Documents/dev/kakebo/kakebo-pwa-ai/src/types/index.ts)
- Definir el tipo `Pillar` (Supervivencia, Ocio, Cultura, Extras).
- Actualizar relaciones de `Category` y `SubCategory` (cada categoría pertenece a un Pilar).
- Campos actualizados en la interfaz `Expense`:
    - `categoryId` (obligatorio)
    - `knownPlace` (Sitio)
    - `location` (Ubicación física/coordenadas)
    - `description` (Descripción)
    - `type` (Variable o Fijo)
    - `whoPaid` (Quién ha hecho el gasto)
    - `date` (Fecha y hora ISO)

### [Componentes UI]

#### [MODIFICAR] [AddExpenseForm.tsx](file:///home/jose/Documents/dev/kakebo/kakebo-pwa-ai/src/components/AddExpenseForm.tsx)
- Implementar lógica de selección jerárquica: Pilar -> Categoría.
- Añadir campos para Sitio, Ubicación, Quién pagó y Fecha/Hora.

#### [MODIFICAR] [mock-data.ts](file:///home/jose/Documents/dev/kakebo/kakebo-pwa-ai/src/lib/mock-data.ts)
- Reconstruir la jerarquía de categorías con los 4 pilares originales.

---

## Fase 2: Estrategia Kakebo y Presupuesto

Esta fase implementa el núcleo del método: la planificación del mes. Al definir ingresos, gastos fijos y objetivo de ahorro, la app calculará el "disponible" real.

### [Modelo de Datos y Store]

#### [MODIFICAR] [index.ts](file:///home/jose/Documents/dev/kakebo/kakebo-pwa-ai/src/types/index.ts)
- Añadir interfaz `MonthlyPlan`.
- Añadir tipos para `Income` (Ingresos) y `FixedExpense` (Gastos Fijos).

#### [NUEVO] [usePlanStore.ts](file:///home/jose/Documents/dev/kakebo/kakebo-pwa-ai/src/store/usePlanStore.ts)
- Crear una tienda persistente para el `MonthlyPlan`.
- Acciones para definir Ingresos, Objetivo de Ahorro y lista de Gastos Fijos.

---

### [Componentes UI]

#### [NUEVO] [PlanningDashboard.tsx](file:///home/jose/Documents/dev/kakebo/kakebo-pwa-ai/src/components/PlanningDashboard.tsx)
- Vista/Modal para introducir:
    - Ingresos mensuales previstos.
    - Objetivo de ahorro.
    - Gastos fijos (Alquiler, Internet, Suscripciones).
- Resumen visual del "Saldo Disponible" mensual.

#### [MODIFICAR] [App.tsx](file:///home/jose/Documents/dev/kakebo/kakebo-pwa-ai/src/App.tsx)
- Integrar el resumen de planificación en la cabecera.
- Mostrar "Disponible Hoy" o "Disponible esta Semana" basado en la fórmula Kakebo.

---

## Plan de Verificación

### Pruebas Automatizadas
- Ejecutar `npm run lint` para asegurar tipos correctos.
- Ejecutar `npm run build` para verificar el empaquetado de producción.

### Verificación Manual
1.  **Configuración de Plan (Fase 2)**: Introducir 2000€ (Ingresos), 500€ (Ahorro) y 1000€ (Gastos Fijos).
2.  **Cálculo**: Verificar que el "Total Disponible" muestra 500€ para el mes.
3.  **Impacto de Gastos**: Añadir un gasto de 50€ y ver cómo el "Disponible" disminuye dinámicamente.
