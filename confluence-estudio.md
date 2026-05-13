# Estudio QA - Confluence Onboarding

---

# Instalación de Cucumber

**¿Qué es Cucumber?**

Cucumber es una herramienta de software de código abierto diseñada para facilitar el desarrollo de pruebas automatizadas que verifican cómo funciona una aplicación desde el punto de vista del usuario. Utiliza un enfoque de desarrollo conocido como Behavior-Driven Development (BDD).

**Ventajas de usar Cucumber**
- **Comunicación clara:** Las pruebas son legibles incluso para personas no técnicas.
- **Mayor colaboración:** Promueve una mayor interacción entre desarrolladores y partes interesadas.
- **Automatización:** Simplifica la creación y ejecución de pruebas automatizadas.
- **Documentación viva:** Los escenarios de prueba sirven como documentación actualizada del comportamiento esperado del sistema.

**Requisitos previos**
- Tener un repositorio en GitHub
- Clonar el repositorio
- Instalar Cypress en el repositorio local
- Instalar Visual Studio Code

**Proceso de montaje de Cypress con Cucumber**

1. Abrir el Cypress del repositorio
2. Cuando se configure en la sección de e2e, se creará automáticamente una carpeta de Cypress
3. Abrir el repositorio desde Visual Studio Code
4. Configuración del archivo `cypress.config.js` para indicar que debe usar las dependencias de Cucumber
5. Configurar el archivo `package.json` para especificar la dependencia de Cucumber
6. Ejecutar `npm install` para instalar las dependencias

**Estructura de archivos**
- Los archivos de prueba deben estar en `cypress/e2e`
- Crear archivos `.feature` con la descripción de escenarios en lenguaje Gherkin
- Crear archivos `.js` con las implementaciones de los pasos

**Escritura de pruebas con Gherkin**
- **Given:** Define el estado inicial (ej: "se abre la aplicación")
- **When:** Define la acción a realizar (ej: "se agrega la tarea 'Tarea 1'")
- **And:** Permite encadenar múltiples pasos del mismo tipo
- **Then:** Define la verificación esperada (ej: "se verifica que la tarea está marcada")

**Consejo importante:** Usar frases claras que hagan referencia exacta a los elementos, por ejemplo:
- **Given** una tarea llamada "Tarea 1" marcada como completada
- **When** se pulsa el checkbox de "Tarea 1"
- **Then** la "Tarea 1" se desmarca y vuelve a aparecer como activa

**Implementación en archivos .js**
- **Given:** Usa `cy.visit()` para abrir la página
- **When:** Selecciona elementos con `.new-todo`, escribe contenido y presiona Enter
- **When (marcar completado):** Encuentra la tarea y marca el checkbox
- **Then:** Verifica que la tarea tenga la clase `completed`

**Importante:** Usar los mismos enunciados exactos en el archivo Cucumber y en el archivo .js para que todo funcione correctamente.

**Comprobación de ejecución de pruebas**
- Abrir Cypress nuevamente desde la terminal con `npx cypress open`
- Verificar que las pruebas se ejecuten correctamente

**Subir repositorio a GitHub**
- Una vez creadas y comprobadas todas las pruebas, subir al repositorio de GitHub

---

# Cypress

### ¿Qué es Cypress?

Cypress es una herramienta de pruebas automáticas enfocada en aplicaciones web. Permite a los desarrolladores y testers escribir, ejecutar y depurar pruebas de forma rápida y sencilla directamente en el navegador. Se utiliza principalmente para pruebas **end-to-end**, pero también sirve para pruebas de integración y unitarias. Funciona con **JavaScript** y es muy popular por su velocidad, facilidad de uso e interfaz visual intuitiva.

**Pasos previos a la instalación de Cypress**

Requisito: Tener Node.js y NPM instalados. Se recomienda descargar desde https://nodejs.org/en/ la versión LTS.

Verificar instalación:
```shell
node -v
npm -v
```

## Instalación de Cypress

### Paso 1: Crear el archivo `package.json`

```shell
cd <ruta-de-tu-proyecto>
npm init -y
```

### Paso 2: Instalar Cypress

```shell
npm install cypress --save-dev
```

### Paso 3: Abrir Cypress por primera vez

Opción 1 (usando ruta completa):
```shell
npx cypress open
```

Opción 2 (definiendo script en `package.json`):
```json
"scripts": {
  "cypress:open": "cypress open"
}
```

Luego ejecutar:
```shell
npm run cypress:open
```

## Estructura del Proyecto Cypress

Cuando abres Cypress por primera vez y seleccionas "E2E Testing", se genera automáticamente:

```plaintext
mi-proyecto/
├── cypress/
│   ├── e2e/           # Archivos de pruebas end-to-end
│   ├── fixtures/      # Archivos JSON con datos de prueba
│   └── support/       # Comandos personalizados y configuración
├── node_modules/
├── cypress.config.js  # Archivo de configuración principal
└── package.json
```

## Configuración Inicial (`cypress.config.js`)

Archivo básico generado:
```javascript
const { defineConfig } = require("cypress");
module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // Configuración personalizada
    },
  },
});
```

Configuración más avanzada:
```javascript
const { defineConfig } = require('cypress');
module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    supportFile: 'cypress/support/e2e.js',
    fixturesFolder: 'cypress/fixtures',
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    screenshotsFolder: 'cypress/screenshots',
    videosFolder: 'cypress/videos',
    video: true,
    setupNodeEvents(on, config) {
      // Eventos personalizados
    },
  },
});
```

**Opciones clave:**
- `baseUrl`: URL base para todas las pruebas
- `specPattern`: Patrón para localizar archivos de prueba
- `supportFile`: Archivo para comandos personalizados
- `fixturesFolder`: Carpeta para datos estáticos
- `screenshotsFolder` y `videosFolder`: Carpetas de salida para debugging
- `video`: Habilita grabación de video al ejecutar tests

## Crear una prueba básica

Crear archivo `cypress/e2e/ejemplo.cy.js`:

```javascript
describe('Mi primera prueba', () => {
   it('Visita la página principal', () => {
     cy.visit('/');
     cy.contains('Bienvenido');
  });
   it('Interacción con un elemento', () => {
     cy.get('#boton-login').click();
     cy.url().should('include', '/login');
  });
});
```

## Ejecución de Pruebas

**Interfaz gráfica:**
```shell
npx cypress open
```

**Modo consola (headless):**
```shell
npx cypress run
```

**Ejecutar una prueba específica:**
```shell
npx cypress run --spec cypress/e2e/ejemplo.cy.js
```

**Scripts en `package.json`:**
```json
"scripts": {
  "cy:run": "cypress run",
  "cy:open": "cypress open",
  "cy:test1": "cypress run --spec cypress/e2e/ejemplo.cy.js"
}
```

Ejecutar scripts:
```shell
npm run cy:test1
```

Ver todos los scripts disponibles:
```shell
npm run
```

## Buenas Prácticas

✅ **Organización:**
- Agrupa pruebas similares en subcarpetas
- Utiliza `describe()` para agrupar casos relacionados

✅ **Mantenimiento:**
- Usa selectores estables (`data-testid`)
- Evita `cy.wait()` salvo que sea estrictamente necesario
- Prefiere `cy.intercept()` para esperar a llamadas de red

✅ **Reutilización:**
- Usa `beforeEach()` y `afterEach()` para preparar y limpiar estado

✅ **Colaboración:**
- Comenta tu código y usa `cy.log()` para mensajes útiles
- Aprovecha screenshots y videos automáticos para debugging

---

# Playwright

**¿Qué es Playwright?**

Playwright es una herramienta de automatización de pruebas de código abierto para aplicaciones web. Desarrollada por Microsoft, permite la creación de pruebas automatizadas utilizando JavaScript/TypeScript, Python, y C#. Permite interactuar con navegadores web de manera rápida y eficiente, facilitando pruebas funcionales e integración para aplicaciones web modernas.

Playwright es compatible con los navegadores **Chromium**, **Firefox**, y **WebKit**, lo que permite probar en múltiples entornos.

**Ventajas**

- **Compatibilidad Multinavegador:** Soporta Chromium, Firefox y WebKit (Safari), garantizando compatibilidad cross-browser
- **Automatización de pruebas en dispositivos móviles:** Permite emular dispositivos móviles sin necesidad de tener dispositivos físicos. Ideal para probar aplicaciones web responsivas
- **Pruebas más rápidas y eficientes:** Conocido por su rapidez. La arquitectura está diseñada para reducir el tiempo de ejecución, permitiendo ejecutar más pruebas en menos tiempo

**Requisitos previos**

- **Tener instalado Node.js y NPM**

Verificar instalación:
```shell
node -v
npm -v
```

- **Crear un nuevo proyecto** (crear carpeta mediante el entorno gráfico o comandos)
- **Tener instalado Visual Studio Code**

**Explicación de la instalación**

Primer comando a ejecutar dentro del nuevo proyecto:
```shell
npm init -y
```

Último comando para iniciar la configuración de Playwright:
```shell
npm init playwright@latest
```

Este comando crea las carpetas necesarias en el proyecto para ejecutar pruebas con los diversos navegadores.

**Crear código de prueba**

Dentro del proyecto, crear un archivo de prueba. Para comprobar la instalación:
```shell
npx playwright test
```

Crear el primer código de prueba (ejemplo con la página "demoqa"):

```javascript
import { test, expect } from '@playwright/test';

test('Ejemplo de prueba', async ({ page }) => {
  await page.goto('https://demoqa.com');
  // Aquí van tus interacciones y assertions
});
```

**Importante:**
- Los archivos de prueba deben tener siempre la extensión `.spec.js`
- La primera línea con las importaciones debe aparecer en todos los códigos de Playwright
- Las pruebas deben estar dentro de la sección `test()`

Ejecutar prueba específica:
```shell
npx playwright test archivo.spec.js --headed
```

La etiqueta `--headed` muestra el proceso de ejecución para debugging en caso de errores.

**Problemas al subir el proyecto a GitHub**

Si se quiere subir el proyecto al repositorio de GitHub, modificar el archivo `.gitignore`. Este archivo especifica que la carpeta `node_modules` no se suba.

Si la carpeta `node_modules` no se encuentra en el proyecto, reinstalar Playwright:
```shell
npm init playwright@latest
```

---

---

# Postman

## ¿Qué es Postman?

**Postman** es una herramienta de desarrollo de API moderna que simplifica cada etapa del ciclo de vida de las API. Permite a los desarrolladores diseñar, construir, probar, documentar y monitorizar APIs. Incluye funcionalidades de validación de respuestas, automatización de pruebas y documentación automática.

## Funcionalidades Principales

### Solicitudes HTTP
Postman facilita crear y enviar solicitudes HTTP a endpoints de tu API:
- GET, POST, PUT, DELETE, PATCH, OPTIONS
- Headers personalizados
- Cuerpos de solicitud (JSON, XML, form-data)
- Parámetros de query

### Colecciones
Las colecciones permiten organizar solicitudes relacionadas:
- Agrupar requests por funcionalidad
- Reutilizar variables entre solicitudes
- Documentar APIs automáticamente

### Tests y Validaciones
- Escribir tests en JavaScript para validar respuestas
- Verificar códigos de estado HTTP
- Validar estructura JSON
- Comprobar tiempos de respuesta

### Automatización
- Ejecutar colecciones automáticamente
- Crear flujos de trabajo (workflows)
- Integración con CI/CD

### Mock Servers
- Crear servidores mock para simular endpoints
- Útil para testing sin una API real

## Instalación y Configuración

1. Descargar desde https://www.postman.com/
2. Instalar en tu sistema operativo
3. Crear una cuenta (opcional pero recomendado)
4. Crear un workspace

## Ejemplo Básico

**Solicitud GET simple:**
```
GET https://api.ejemplo.com/usuarios/1
```

**Solicitud POST con body:**
```
POST https://api.ejemplo.com/usuarios
Content-Type: application/json

{
  "nombre": "Juan",
  "email": "juan@ejemplo.com"
}
```

## Validación de Respuestas

En la pestaña "Tests", escribir código JavaScript:

```javascript
pm.test("Status code es 200", function () {
    pm.response.to.have.status(200);
});

pm.test("Response tiene el campo 'id'", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData).to.have.property('id');
});
```

---

# TestRail

## ¿Qué es TestRail?

**TestRail** es una plataforma de gestión de pruebas basada en la web que permite organizar, rastrear y controlar todos los aspectos del proceso de prueba. Facilita la gestión de casos de prueba, la ejecución de pruebas y la generación de reportes detallados.

## Características Principales

- **Gestión de casos de prueba:** Crear, actualizar y organizar casos de prueba
- **Planes de prueba:** Crear planes para ejecutar pruebas específicas
- **Ejecución de pruebas:** Trackear resultados de ejecución
- **Reportes:** Generar reportes sobre cobertura y resultados
- **Integración:** Conectar con herramientas como Jira, GitHub, etc.

## Estructura Básica

**Proyectos:** Contenedores principales
**Suites:** Grupos de casos de prueba
**Casos de Prueba:** Especificaciones de lo que se debe probar
**Planes:** Selecciones de casos para ejecutar
**Runs:** Instancias de ejecución de pruebas

## Flujo de Trabajo Típico

1. Crear un proyecto
2. Definir suites y casos de prueba
3. Crear un plan de pruebas
4. Crear un run para ejecutar las pruebas
5. Registrar resultados
6. Generar reportes

---

# Docker

## ¿Qué es Docker?

**Docker** es una plataforma de containerización que permite empaquetar aplicaciones con todas sus dependencias en un contenedor aislado. Esto garantiza que la aplicación funcione en cualquier entorno (desarrollo, testing, producción) sin cambios.

## Conceptos Clave

### Imagen
Una imagen Docker es una plantilla inmutable que contiene:
- Sistema operativo base
- Dependencias y librerías
- Código de la aplicación
- Variables de entorno

### Contenedor
Un contenedor es una instancia en ejecución de una imagen Docker. Es aislado, ligero y portable.

### Dockerfile
Archivo de texto que define cómo construir una imagen Docker.

**Ejemplo Dockerfile:**
```dockerfile
FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["node", "app.js"]
```

### Flujo Básico

1. Crear un Dockerfile
2. Construir la imagen: `docker build -t mi-app:1.0 .`
3. Ejecutar contenedor: `docker run -p 3000:3000 mi-app:1.0`

## Comandos Útiles

```bash
# Construir imagen
docker build -t nombre:tag .

# Ver imágenes
docker images

# Ejecutar contenedor
docker run -d -p 8080:80 nombre:tag

# Ver contenedores en ejecución
docker ps

# Detener contenedor
docker stop container_id

# Ver logs
docker logs container_id

# Entrar en contenedor
docker exec -it container_id bash
```

## Docker Compose

Permite definir y ejecutar múltiples contenedores como un servicio único.

**Archivo docker-compose.yml:**
```yaml
version: '3'
services:
  web:
    build: .
    ports:
      - "3000:3000"
  db:
    image: postgres:13
    environment:
      POSTGRES_PASSWORD: secret
```

Ejecutar: `docker-compose up`

---

# Git

## ¿Qué es Git?

**Git** es un sistema de control de versiones distribuido que permite:
- Rastrear cambios en archivos
- Colaborar en proyectos
- Mantener historial completo de modificaciones
- Trabajar con ramas independientes

## Conceptos Básicos

### Repositorio
Carpeta que contiene todos los archivos del proyecto y su historial.

### Commit
Snapshot de cambios con un mensaje descriptivo.

### Rama (Branch)
Línea independiente de desarrollo. La rama principal es "main" o "master".

### Push/Pull
- **Push:** Enviar cambios al repositorio remoto
- **Pull:** Descargar cambios del repositorio remoto

## Flujo de Trabajo Básico

1. **Clonar repositorio:** `git clone https://github.com/usuario/repo.git`
2. **Crear rama:** `git checkout -b mi-rama`
3. **Hacer cambios** a los archivos
4. **Agregar cambios:** `git add .`
5. **Confirmar cambios:** `git commit -m "Descripción clara del cambio"`
6. **Enviar cambios:** `git push origin mi-rama`
7. **Crear Pull Request** en GitHub/GitLab

## Comandos Esenciales

```bash
# Configuración inicial
git config --global user.name "Tu Nombre"
git config --global user.email "tu@email.com"

# Clonar repositorio
git clone URL

# Ver estado
git status

# Ver diferencias
git diff

# Ver historial
git log
git log --oneline

# Crear rama y cambiar
git checkout -b nombre-rama

# Cambiar a rama existente
git checkout nombre-rama

# Agregar cambios
git add .
git add archivo.js

# Confirmar
git commit -m "Mensaje descriptivo"

# Enviar cambios
git push origin nombre-rama

# Descargar cambios
git pull origin main

# Fusionar ramas
git merge nombre-rama
```

---

# GitLab CI/CD

## ¿Qué es GitLab CI/CD?

**GitLab CI/CD** es un servicio integrado en GitLab que automatiza pruebas, construcción y despliegue de aplicaciones. Permite crear pipelines que se ejecutan automáticamente en respuesta a cambios en el código.

## Configuración Básica

El archivo `.gitlab-ci.yml` define el pipeline:

```yaml
stages:
  - test
  - build
  - deploy

test:
  stage: test
  script:
    - npm install
    - npm test
  only:
    - merge_requests

build:
  stage: build
  script:
    - npm run build
  artifacts:
    paths:
      - dist/
  only:
    - main

deploy:
  stage: deploy
  script:
    - npm run deploy
  only:
    - main
```

## Conceptos Clave

### Pipeline
Conjunto de etapas que se ejecutan secuencialmente.

### Stages
Grupos de trabajos que se ejecutan simultáneamente.

### Jobs
Tareas específicas que se ejecutan en un stage.

### Runners
Máquinas que ejecutan los jobs del pipeline.

## Ejemplo Práctico

```yaml
image: node:18

stages:
  - install
  - test
  - build

install_dependencies:
  stage: install
  script:
    - npm install
  artifacts:
    paths:
      - node_modules/
    expire_in: 1 hour

run_tests:
  stage: test
  script:
    - npm test
  dependencies:
    - install_dependencies

build_project:
  stage: build
  script:
    - npm run build
  artifacts:
    paths:
      - dist/
  dependencies:
    - install_dependencies
```

---

# GitHub Actions

## ¿Qué es GitHub Actions?

**GitHub Actions** es una plataforma de automatización integrada en GitHub que permite crear workflows (flujos de trabajo) personalizados. Automatiza pruebas, despliegues y otras tareas en respuesta a eventos en el repositorio.

## Estructura de un Workflow

Los workflows se definen en archivos YAML en `.github/workflows/`:

```yaml
name: CI/CD Pipeline
on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: npm test
```

## Componentes Principales

### Triggers (on)
Define cuándo se ejecuta el workflow:
- `push`: Al hacer push
- `pull_request`: Al crear PR
- `schedule`: En horarios específicos
- `workflow_dispatch`: Ejecución manual

### Jobs
Unidades de trabajo que se ejecutan en paralelo o secuencialmente.

### Steps
Tareas individuales dentro de un job.

### Actions
Bloques reutilizables de código (propias o de terceros).

## Ejemplo: Pipeline Completo

```yaml
name: Full CI/CD

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: npm test
      - run: npm run lint

  build:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm install
      - run: npm run build
      - uses: actions/upload-artifact@v3
        with:
          name: build-artifact
          path: dist/

  deploy:
    needs: build
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/download-artifact@v3
      - run: |
          # Comandos de despliegue
          echo "Desplegando aplicación..."
```

---

# n8n

## ¿Qué es n8n?

**n8n** es una plataforma de automatización de flujos de trabajo (workflow automation) open-source y self-hosted. Permite conectar diferentes aplicaciones y servicios sin escribir código, automatizando procesos repetitivos.

## Características Principales

- **Conectores:** Integración con cientos de aplicaciones (Slack, GitHub, Jira, Google Sheets, etc.)
- **Flujos visuales:** Interfaz visual drag-and-drop para crear workflows
- **Ejecución condicional:** Lógica IF/ELSE en los flujos
- **Webhooks:** Recibir eventos de aplicaciones externas
- **Cron jobs:** Ejecutar tareas en horarios específicos
- **Open-source:** Posibilidad de self-hosted

## Conceptos Básicos

### Workflow
Secuencia de nodos conectados que representan un proceso automatizado.

### Nodos
Bloques que representan acciones (ej: enviar email, crear ticket, etc.)

### Credenciales
Información de autenticación para acceder a servicios externos.

## Instalación con Docker

```bash
docker run -d \
  --name n8n \
  -p 5678:5678 \
  -e N8N_BASIC_AUTH_ACTIVE=true \
  -e N8N_BASIC_AUTH_USER=admin \
  -e N8N_BASIC_AUTH_PASSWORD=tu_password \
  -v ~/.n8n:/home/node/.n8n \
  n8nio/n8n
```

Acceder a: `http://localhost:5678`

## Ejemplo de Workflow

**Automatizar notificación en Slack cuando hay un issue en GitHub:**

1. Trigger: Webhook de GitHub
2. Nodo de lectura: Extraer datos del evento
3. Nodo condicional: Si es un issue nuevo
4. Nodo Slack: Enviar mensaje
5. Nodo de respuesta: Confirmar procesamiento

## Nodos Comunes

- **Trigger nodes:** Inician el workflow
- **HTTP Request:** Hacer llamadas API
- **Conditional Logic:** Tomar decisiones
- **Transform:** Procesar y transformar datos
- **Merge:** Combinar datos
- **Slack, Gmail, Google Sheets:** Integraciones específicas

## Variables Globales

Dentro de un workflow puedes usar:
```
{{ $node.NombreNodo.data }}
{{ $nodePropertyName }}
{{ $env.VARIABLE_DE_ENTORNO }}
```

---

# Resumen

Se han descargado exitosamente 11 páginas del espacio Confluence del curso de QA Automation:

1. **Instalación de Cucumber** - Guía sobre Cucumber BDD, estructura de pruebas con Gherkin
2. **Cypress** - Instalación, configuración, estructura de proyectos y mejores prácticas
3. **Playwright** - Automatización web multinavegador, instalación y primeras pruebas
4. **Postman** - API testing, colecciones, validaciones y mock servers
5. **TestRail** - Gestión de casos de prueba, planes y reportes de pruebas
6. **Docker** - Containerización, imágenes, contenedores y Docker Compose
7. **Git** - Control de versiones, flujo de trabajo colaborativo
8. **GitLab CI/CD** - Pipelines, stages y automatización en GitLab
9. **GitHub Actions** - Workflows, triggers y automatización en GitHub
10. **n8n** - Automatización de procesos, workflows visuales e integraciones

Este material cubre los conceptos clave, configuración, comandos prácticos y ejemplos necesarios para estudiar y practicar el curso de QA Automation.
