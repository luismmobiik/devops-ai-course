---
name: workflow-builder
description: Genera workflows de GitHub Actions siguiendo el estándar del proyecto. Usar cuando se pida crear un workflow, pipeline, CI/CD, o automatización con GitHub Actions.
---

# Workflow Builder

Genera workflows de GitHub Actions que siguen el estándar del proyecto. Antes de generar, lee el workflow de referencia en `.github/workflows/ci-pipeline.yml` para alinear el estilo.

## Estándar obligatorio

Todo workflow generado DEBE cumplir estas reglas:

### 1. Permisos mínimos

Siempre declarar `permissions` a nivel de workflow con el mínimo necesario. Nunca omitir este bloque:

```yaml
permissions:
  contents: read
```

Si el workflow necesita permisos adicionales, agregarlos explícitamente:

```yaml
permissions:
  contents: read
  pull-requests: write    # solo si comenta en PRs
  issues: write           # solo si crea issues
  actions: read           # solo si consulta runs
```

### 2. Actions pinneadas

Usar tag de versión mayor, nunca `@main` ni `@master`:

```yaml
# Correcto
- uses: actions/checkout@v4
- uses: actions/setup-node@v4

# Incorrecto
- uses: actions/checkout@main
- uses: some-action@latest
```

### 3. Estructura del archivo

Orden de secciones:
1. `name:` — nombre descriptivo
2. `on:` — triggers
3. `permissions:` — permisos mínimos
4. `env:` — variables globales (si aplica)
5. `jobs:` — uno o más jobs

### 4. Naming conventions

- Nombre del workflow: descriptivo en inglés (`CI Pipeline`, `SonarQube Analysis`)
- Nombre de jobs: lowercase con guiones (`ci`, `security-check`, `deploy-staging`)
- Nombre de steps: frase corta que describe la acción (`Install dependencies`, `Run tests`)

### 5. Cache de dependencias

Para proyectos Node.js, usar el cache integrado de `setup-node`:

```yaml
- uses: actions/setup-node@v4
  with:
    node-version: 20
    cache: npm
    cache-dependency-path: devops-frontend/package-lock.json
```

NO crear steps separados de `actions/cache` salvo que haya una razón específica.

### 6. Working directory

Si el código está en un subdirectorio, usar `defaults.run.working-directory`:

```yaml
jobs:
  ci:
    runs-on: ubuntu-latest
    defaults:
      run:
        working-directory: devops-frontend
```

### 7. Secrets

Nunca hardcodear valores sensibles. Usar `${{ secrets.NOMBRE }}` y documentar qué secrets se necesitan con un comentario al inicio:

```yaml
# Secrets requeridos:
#   SONAR_TOKEN     - Token de autenticación de SonarQube
#   SONAR_HOST_URL  - URL del servidor SonarQube
```

## Plantilla base

Usar como punto de partida para cualquier workflow nuevo:

```yaml
name: [Nombre descriptivo]

on:
  [triggers según el caso]

permissions:
  contents: read

jobs:
  [job-name]:
    name: [Descripción legible]
    runs-on: ubuntu-latest
    defaults:
      run:
        working-directory: devops-frontend

    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
          cache-dependency-path: devops-frontend/package-lock.json

      - name: Install dependencies
        run: npm ci

      # ... steps específicos del workflow
```

## Triggers comunes

| Caso de uso | Trigger |
|-------------|---------|
| CI en cada push | `on: push: branches: [main, develop]` |
| CI en PRs | `on: pull_request: branches: [main]` |
| Ambos | Combinar `push` + `pull_request` |
| Programado | `on: schedule: - cron: '0 6 * * 1'` |
| Manual | `on: workflow_dispatch:` |

## Ejemplos de steps comunes

### Tests con Angular

```yaml
- name: Run tests
  run: npx ng test --no-watch --browsers=ChromeHeadless
```

### Build de producción

```yaml
- name: Build
  run: npx ng build --configuration production
```

### Crear issue al fallar

Requiere `permissions: issues: write`:

```yaml
- name: Create issue on failure
  if: failure()
  uses: actions/github-script@v7
  with:
    script: |
      await github.rest.issues.create({
        owner: context.repo.owner,
        repo: context.repo.repo,
        title: `CI failed: ${context.sha.substring(0, 7)}`,
        body: `Workflow **${context.workflow}** failed on \`${context.ref}\`.\n\n[Ver run](${context.serverUrl}/${context.repo.owner}/${context.repo.repo}/actions/runs/${context.runId})`,
        labels: ['bug', 'ci']
      });
```

### Comentar en un PR

Requiere `permissions: pull-requests: write`:

```yaml
- name: Comment on PR
  if: github.event_name == 'pull_request'
  uses: actions/github-script@v7
  with:
    script: |
      await github.rest.issues.createComment({
        owner: context.repo.owner,
        repo: context.repo.repo,
        issue_number: context.issue.number,
        body: '✅ All checks passed'
      });
```

## Validación

Después de generar un workflow, verificar:

1. `permissions:` está declarado con el mínimo necesario
2. Todas las actions usan version tag (no SHA ni `@main`)
3. No hay secrets hardcodeados
4. Los nombres de steps son claros
5. Si usa `working-directory`, está en `defaults`
6. El YAML es válido (indentación correcta con 2 espacios)
