# Plan de Implementación - Kakebo PWA

Este plan detalla la evolución de la aplicación desde un rastreador de gastos simple hasta un sistema completo de gestión Kakebo.

## Fase 1.5: Alineación de Modelo de Datos y Categorías (EN CURSO)

Antes de pasar a la planificación mensual, debemos asegurar que el modelo de datos soporte el nivel de detalle requerido por el método Kakebo.

### [Modelo de Datos]

#### [MODIFICAR] [index.ts](file:///home/jose/Documents/dev/kakebo/kakebo-pwa-ai/src/types/index.ts)
- Eliminar tipo `Pillar`.
- `Category`: Categoría de nivel superior (ej: Supervivencia, Ocio).
- `SubCategory`: Pertenece a una `Category` (ej: Comida, Transporte).
- `Place`: Sitio guardado (ej: Mercadona, Bar Paco).
- `Expense`: Incluye `categoryId`, `subCategoryId` y opcionalmente `placeId`.

### [Gastos]

#### [MODIFICAR] [AddExpenseForm.tsx](file:///home/jose/Documents/dev/kakebo/kakebo-pwa-ai/src/components/AddExpenseForm.tsx)
- Añadir prop `initialData` para cargar datos al editar.
- Cambiar el título "Nuevo Gasto" a "Editar Gasto" según el modo.
- Implementar gestión de Sitios (Selección, Creación y Borrado).

#### [MODIFICAR] [App.tsx](file:///home/jose/Documents/dev/kakebo/kakebo-pwa-ai/src/App.tsx)
- Gestionar estado `editingExpense`.
- Pasar el gasto seleccionado al formulario.

#### [MODIFICAR] [ExpenseList.tsx](file:///home/jose/Documents/dev/kakebo/kakebo-pwa-ai/src/components/ExpenseList.tsx)
- Añadir prop `onExpenseClick` para disparar la edición.

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
1.  **Editar Gasto**: Hacer clic en un gasto existente, cambiar el importe y verificar que se actualiza.
2.  **Configuración de Plan (Fase 2)**: Introducir 2000€ (Ingresos), 500€ (Ahorro) y 1000€ (Gastos Fijos).
3.  **Cálculo**: Verificar que el "Total Disponible" muestra 500€ para el mes.
