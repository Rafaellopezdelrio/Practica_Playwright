# Practica_Playwright

Proyecto de automatización **end-to-end con Playwright** sobre
[Sauce Demo](https://www.saucedemo.com), aplicando **Page Object Model** y con
ejecución en **GitHub Actions**.

## Qué se testea

Sauce Demo: tienda de demostración con login, catálogo de productos, carrito y
proceso de compra. Es el escenario estándar para practicar automatización de e-commerce.

## Alcance

Definido en [`test-plan.md`](test-plan.md):

**Dentro del alcance**
- Login correcto e incorrecto
- Carga del inventario de productos
- Añadir productos al carrito
- Eliminar productos del carrito
- Flujo completo de compra (checkout)

**Fuera del alcance**
- Rendimiento
- Compatibilidad con navegadores distintos de Chromium
- Responsive / móvil
- Recuperación de contraseña

## Organización de los tests

​```
tests/
├── smoke/    → funcionalidades críticas, ejecución rápida
├── e2e/      → flujos completos de usuario
└── visual/   → comprobaciones visuales
pages/        → Page Objects (selectores y acciones por página)
​```

Separar *smoke* de *e2e* permite validar lo crítico en segundos antes de lanzar
la suite completa.

## Stack

- Playwright
- JavaScript
- Page Object Model
- GitHub Actions (CI)
- Chromium

## Cómo ejecutarlo

​```bash
npm install
npx playwright install          # descargar navegadores

npx playwright test             # toda la suite
npx playwright test tests/smoke # solo smoke
npx playwright test --headed    # ver el navegador
npx playwright show-report      # informe HTML
​```

## Qué he practicado

- Diseño de un plan de pruebas con alcance explícito
- Page Object Model para separar selectores de la lógica del test
- Clasificación de tests por tipo (smoke / e2e / visual)
- Integración continua: ejecución automática de la suite en cada cambio
