# Test Plan - Practica Playwright

## Scope

### Qué se testea
- Login correcto e incorrecto
- Carga del inventario de productos
- Añadir productos al carrito
- Eliminar productos del carrito
- Flujo completo de compra (checkout)

### Qué NO se testea
- Rendimiento y carga
- Compatibilidad con Firefox y Safari
- Responsive/móvil
- Recuperación de contraseña

---

## Estrategia

- **Smoke tests** — verifican que las funcionalidades críticas básicas funcionan (login, inventario)
- **E2E tests** — flujos completos representativos de un usuario real (compra, carrito)
- **POM** — los locators y acciones están encapsulados en Page Objects para facilitar el mantenimiento
- **Aplicación bajo test** — Sauce Demo (https://www.saucedemo.com)
- **Navegador** — Chromium

---

## Riesgos

- Sauce Demo es una app de práctica, puede tener caídas puntuales
- Los datos de login son fijos y públicos, no representan un entorno real
- No hay gestión de estado entre tests, cada test parte desde cero