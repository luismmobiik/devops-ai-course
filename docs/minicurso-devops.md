# 🤖 Minicurso: IA para DevOps en la Práctica

> **Stack:** GitHub · GitHub Actions · Terraform · Bicep · Azure · SonarCloud · GitHub Copilot (VS Code)

---

## 📋 Información General

| Campo | Detalle |
|---|---|
| **Audiencia** | Equipos DevOps con conocimientos básicos de IA |
| **Formato** | 5 sesiones en vivo de 90 minutos |
| **Duración total** | ~7.5 horas |
| **Prerequisitos** | VS Code + GitHub Copilot, Azure CLI, Terraform CLI, acceso a GitHub y SonarCloud |

---

## 🗺️ Mapa del Minicurso

```
MÓDULO 1          MÓDULO 2          MÓDULO 3          MÓDULO 4          MÓDULO 5
CI/CD             Code Review       Monitoreo         IaC               DevSecOps
──────────        ──────────        ──────────        ──────────        ──────────
Skill:            Skill:            Skill:            Skill:            Agentes:
actions-debugger  sonarcloud-fix    kql-generator     iac-reviewer      pr-reviewer
Agente:           Agente:           Agente:           Agente:           iac-security
pipeline-debugger pr-reviewer       incident-respond  iac-security      -reviewer
```

---

## 🧠 Conceptos Base: Arquitectura de 3 Capas + Workflows

Este curso organiza la personalización de IA en 3 capas complementarias, más la automatización CI/CD:

### Capa 1: `AGENTS.md` — Contexto universal

| Campo | Detalle |
|---|---|
| **Qué es** | Archivo Markdown en la raíz del repo con contexto operacional del proyecto |
| **Quién lo lee** | Todos los AI tools: GitHub Copilot, Cursor, Windsurf, Codex CLI, Claude Code, etc. |
| **Cuándo se carga** | Siempre, automáticamente |
| **Contenido** | Stack, convenciones, comandos de build/test, estructura del repo |
| **Dónde vive** | `AGENTS.md` (raíz del repositorio) |

> 📚 **Referencia:** [AGENTS.md Standard](https://agentsmd.online/) — estándar abierto de la Linux Foundation

### Capa 2: Agent Skills — Conocimiento especializado

| Campo | Detalle |
|---|---|
| **Qué es** | Carpeta con instrucciones, scripts y recursos que Copilot carga cuando son relevantes |
| **Quién lo activa** | Copilot decide automáticamente basándose en el `description` del skill |
| **Cuándo se carga** | Solo cuando el prompt del usuario es relevante al skill |
| **Dónde vive** | `.github/skills/<nombre-del-skill>/SKILL.md` |

> 📚 **Referencia oficial:** [About agent skills](https://docs.github.com/en/copilot/concepts/agents/about-agent-skills) | [Creating agent skills](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/cloud-agent/create-skills)

### Capa 3: Custom Agents — Personas especializadas

| Campo | Detalle |
|---|---|
| **Qué es** | Perfil de IA especializado con instrucciones, herramientas y expertise propios |
| **Quién lo activa** | El usuario lo selecciona en el dropdown de agentes (VS Code, GitHub.com, CLI) |
| **Cuándo se carga** | Cuando el usuario elige el agente para una tarea o lo asigna a un issue |
| **Dónde vive** | `.github/agents/<nombre>.agent.md` |

> 📚 **Referencia oficial:** [About custom agents](https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-custom-agents) | [Creating custom agents](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/cloud-agent/create-custom-agents)

### Automatización: GitHub Actions Workflows

| Campo | Detalle |
|---|---|
| **Qué es** | Workflow YAML de CI/CD disparado por eventos de GitHub |
| **Quién lo activa** | Un evento automático (push, PR, schedule, webhook) |
| **Dónde vive** | `.github/workflows/*.yml` |

### Resumen comparativo

| | **Agent Skill** | **Custom Agent** | **Workflow** |
|---|---|---|---|
| **Activación** | Copilot decide (automático) | Usuario elige (manual) | Evento GitHub (automático) |
| **Propósito** | Conocimiento on-demand | Persona especializada | Automatización CI/CD |
| **Formato** | `SKILL.md` con frontmatter | `.agent.md` con frontmatter | YAML |
| **Ejemplo** | "Genera una query KQL" | "Revisa este PR como security expert" | "Al hacer push, ejecuta tests" |

> 📚 **Referencia oficial:** [Copilot Customization Cheat Sheet](https://docs.github.com/en/copilot/reference/customization-cheat-sheet)

---

## ⚙️ Setup Inicial (Completar antes de la Sesión 1)

### VS Code + Copilot
- [ ] VS Code instalado — [descargar](https://code.visualstudio.com/)
- [ ] Extensión GitHub Copilot instalada y sesión activa con cuenta GitHub
- [ ] Verificar Copilot Chat: `Ctrl+Alt+I` (Windows/Linux) o `Ctrl+Cmd+I` (Mac)

> 📚 **Referencia oficial:** [Set up GitHub Copilot in VS Code](https://code.visualstudio.com/docs/copilot/setup)

### Azure + Terraform
- [ ] Azure CLI instalado y autenticado (`az login`)
- [ ] Terraform CLI instalado y funcional (`terraform -version`)
- [ ] Acceso al subscription de Azure verificado

> 📚 **Referencia oficial:** [Terraform Azure Get Started](https://developer.hashicorp.com/terraform/tutorials/azure-get-started)

### GitHub
- [ ] Acceso al repositorio de práctica del curso
- [ ] Acceso a SonarCloud del proyecto
- [ ] Permiso para crear workflows en GitHub Actions

---

## 📦 Módulo 1 — IA en Pipelines CI/CD con GitHub Actions

**Duración:** 90 min | **Foco:** Crear y depurar workflows con Copilot

### Agenda

| Tiempo | Actividad |
|---|---|
| 0–20 min | Teoría: Estructura de GitHub Actions (on, jobs, steps, runs-on) |
| 20–50 min | Demo: Generar un workflow completo de CI para Azure con Copilot |
| 50–70 min | Práctica: Cada participante genera su propio workflow |
| 70–80 min | Skill `actions-debugger` + Agente `pipeline-debugger` en acción |
| 80–90 min | Preguntas y discusión |

### Contenido Teórico

GitHub Actions automatiza procesos en tu repositorio. Los workflows viven en `.github/workflows/` y se definen en YAML.

```yaml
# Estructura básica de un workflow
name: CI Pipeline
on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Build y Test
        run: echo "Ejecutando build..."
```

> 📚 **Referencia oficial:** [GitHub Actions Documentation](https://docs.github.com/en/actions) | [Workflow Syntax](https://docs.github.com/actions/using-workflows/workflow-syntax-for-github-actions)

### Demo en Vivo

**Objetivo:** Generar desde cero un workflow de CI para una app que se despliega en Azure.

**Prompt en Copilot Chat:**
```
Crea un workflow de GitHub Actions para CI/CD con las siguientes características:
- Trigger: push a main y pull_request
- Jobs: lint, test, build, deploy a Azure Web App
- Incluye caché de dependencias npm
- Usa variables de entorno para los secrets de Azure
- Agrega un job de validación que falle si la cobertura de tests es menor al 80%
- Comenta cada sección explicando qué hace
```

### 🔹 Skill: `actions-debugger`

**¿Qué hace?** Analiza el log de un workflow fallido y entrega un diagnóstico accionable. Copilot lo carga automáticamente cuando detecta que estás trabajando con logs de pipelines.

**Implementación en `.github/skills/actions-debugger/SKILL.md`:**
```markdown
---
name: actions-debugger
description: Diagnostica workflows fallidos de GitHub Actions. Usar cuando se proporcione
  un log de pipeline fallido, se pida depurar un workflow, o se necesite entender
  por qué falló un job o step.
---

Cuando se te proporcione un log de GitHub Actions fallido, sigue este proceso:
1. Identifica el error exacto: busca la línea donde ocurrió. Cita el mensaje textual
2. Localiza el step: indica el nombre del step y el job donde falló
3. Clasifica el error: permisos, dependencia, configuración, red o lógica
4. Propón 2-3 pasos de solución ordenados por probabilidad de éxito

Formato de respuesta:
ERROR: [mensaje exacto del log]
STEP:  [nombre del step] en job [nombre del job]
CAUSA: [categoría] — [explicación en 1 línea]
FIX:   1. [paso más probable] 2. [alternativa] 3. [si aplica]
```

**Cómo usarlo en el día a día:**
```
[Pegar el log del workflow fallido en Copilot Chat]

Analiza este log de GitHub Actions.
Dime: 1) error exacto, 2) step donde falló, 3) causa raíz, 4) cómo solucionarlo.
```

> Copilot cargará el skill automáticamente al detectar que el prompt es relevante.

### 🔸 Agente: `pipeline-debugger`

**Tipo:** Custom Agent — perfil de IA seleccionable por el usuario

**Cuándo usarlo:**
- Cuando un pipeline falla y necesitas diagnóstico rápido
- Se puede asignar directamente a un issue de tipo "pipeline failure"
- Seleccionable desde el dropdown de agentes en VS Code, GitHub.com o CLI

**Implementación `.github/agents/pipeline-debugger.agent.md`:**
```markdown
---
name: pipeline-debugger
description: Especialista en diagnosticar y resolver fallos en pipelines de GitHub Actions.
  Analiza logs, identifica la causa raíz y propone fixes accionables.
---

Eres un especialista en depuración de pipelines CI/CD en GitHub Actions.

## Proceso de diagnóstico
1. Recopilar información: workflow, branch, commit, job y step donde falló
2. Clasificar el error: permisos, dependencias, configuración, red o código
3. Proponer 2-3 pasos concretos de solución ordenados por probabilidad
4. Sugerir cómo prevenir que el mismo error ocurra en el futuro

## Formato de respuesta
**Workflow:** [nombre]
**Error:** [mensaje exacto]
**Causa raíz:** [categoría] — [explicación]
**Solución:** 1. [paso] 2. [alternativa] 3. [si aplica]
**Prevención:** [recomendación]
```

> 📚 **Referencia oficial:** [Creating custom agents](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/cloud-agent/create-custom-agents)

---

## 📦 Módulo 2 — Generación y Revisión de Código con Copilot + SonarCloud

**Duración:** 90 min | **Foco:** Flujo completo: escribir → revisar → corregir con IA

### Agenda

| Tiempo | Actividad |
|---|---|
| 0–15 min | Teoría: Comandos slash de Copilot Chat |
| 15–45 min | Demo: Resolver issues reales de SonarCloud con Copilot |
| 45–65 min | Demo: Code review automatizado en un PR |
| 65–80 min | Práctica guiada |
| 80–90 min | Preguntas y Q&A |

### Contenido Teórico

#### Comandos Slash de Copilot Chat

| Comando | Qué hace | Cuándo usarlo |
|---|---|---|
| `/explain` | Explica el código seleccionado | Onboarding, código legacy |
| `/fix` | Sugiere corrección para un error | Bugs, warnings de SonarCloud |
| `/tests` | Genera tests unitarios | TDD, mejorar cobertura |
| `/doc` | Genera documentación | Documentar funciones y módulos |

> 📚 **Referencia oficial:** [GitHub Copilot in VS Code Cheat Sheet](https://code.visualstudio.com/docs/copilot/reference/copilot-vscode-features)

### Demo en Vivo

**Scenario:** Tenemos 3 issues en SonarCloud. Usamos Copilot para entenderlos y resolverlos.

**Prompt para entender un issue de SonarCloud:**
```
Este es un hallazgo de SonarCloud en nuestro código:
[PEGAR ISSUE DE SONARCLOUD AQUÍ]

Explícame:
1. Por qué es un problema de seguridad o calidad
2. Qué impacto tiene si no se corrige
3. Cómo solucionarlo manteniendo la funcionalidad original
4. Dame el código corregido listo para aplicar
```

**Prompt para generar tests:**
```
Genera tests unitarios para esta función usando Jest.
[SELECCIONAR LA FUNCIÓN CON CTRL+L ANTES DE ABRIR CHAT]

Incluye:
- Test del happy path
- Tests de casos límite (null, undefined, valores extremos)
- Tests de error handling
- Mocks para dependencias externas
```

### Workflow de SonarCloud en GitHub Actions

```yaml
name: SonarCloud Analysis

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  sonarcloud:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0  # Necesario para análisis de historial completo

      - name: SonarCloud Scan
        uses: SonarSource/sonarqube-scan-action@v5
        env:
          SONAR_TOKEN: ${{ secrets.SONAR_TOKEN }}
```

> 📚 **Referencia oficial:** [SonarCloud GitHub Actions](https://docs.sonarsource.com/sonarqube-cloud/advanced-setup/ci-based-analysis/github-actions-for-sonarcloud/)

### 🔹 Skill: `sonarcloud-fix-helper`

**¿Qué hace?** Analiza hallazgos de SonarCloud y genera fixes con tests sugeridos. Copilot lo carga automáticamente cuando detecta que estás trabajando con issues de calidad o seguridad.

**Implementación en `.github/skills/sonarcloud-fix-helper/SKILL.md`:**
```markdown
---
name: sonarcloud-fix-helper
description: Analiza y resuelve hallazgos de SonarCloud (bugs, vulnerabilidades, code smells,
  security hotspots). Usar cuando se proporcione un issue de calidad o seguridad
  reportado por SonarCloud.
---

Cuando se te proporcione un hallazgo de SonarCloud, responde con:
1. Problema: explica en 2-3 líneas en español, incluyendo la regla violada
2. Severidad real: evalúa en contexto (no solo la etiqueta de SonarCloud)
3. Código corregido: listo para aplicar, con comentario de qué cambió y por qué
4. Test sugerido: nombre del test, escenario que cubre, assertion esperada

Formato tabla: | Problema | Severidad real | Código corregido | Test sugerido |
```

### 🔸 Agente: `pr-reviewer`

**Tipo:** Custom Agent — perfil de IA seleccionable por el usuario

**Cuándo usarlo:**
- Al revisar un PR, seleccionar este agente desde el dropdown para obtener un pre-review de seguridad y calidad
- Es read-only: analiza pero no modifica código (`tools: ["read", "search"]`)

**Implementación `.github/agents/pr-reviewer.agent.md`:**
```markdown
---
name: pr-reviewer
description: Especialista en code review para PRs. Analiza diffs, detecta secrets
  hardcodeados, valida que los tests estén actualizados, y evalúa el nivel de riesgo.
tools: ["read", "search"]
---

Eres un especialista en code review. Para cada PR analiza:
1. SEGURIDAD: secrets, API keys, tokens hardcodeados en el diff
2. TESTS: cambios en producción tienen tests correspondientes
3. CALIDAD: código duplicado, funciones largas, complejidad alta
4. IaC: si modifica .tf o .bicep, verifica tags y naming

Formato: ## AI Pre-Review
### Nivel de riesgo: [BAJO / MEDIO / ALTO]
### Hallazgos de seguridad / Tests / Observaciones / Recomendación
```

> 📚 **Referencia oficial:** [Creating custom agents](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/cloud-agent/create-custom-agents)

---

## 📦 Módulo 3 — Monitoreo e Incidentes en Azure

**Duración:** 90 min | **Foco:** Diagnosticar incidentes y generar runbooks con IA

### Agenda

| Tiempo | Actividad |
|---|---|
| 0–20 min | Teoría: Azure Monitor, Log Analytics y KQL básico |
| 20–50 min | Demo: Generar queries KQL desde lenguaje natural |
| 50–70 min | Demo: Diagnóstico de alerta con Copilot Chat |
| 70–80 min | Skill `kql-generator` + Agente `incident-responder` |
| 80–90 min | Preguntas y discusión |

### Contenido Teórico

Azure Monitor centraliza logs, métricas y alertas de toda tu infraestructura. KQL (Kusto Query Language) permite consultarlos. Con IA, cualquier DevOps puede crear queries sin conocer KQL de memoria.

### Demo en Vivo

**Prompt para generar una query KQL:**
```
Genera una query KQL para Azure Log Analytics que:
- Busque errores HTTP 5xx en los últimos 30 minutos
- Filtre solo por el resource group "produccion-rg"
- Muestre: timestamp, error code, message, resource name
- Ordene por timestamp descendente
- Limite a 100 resultados

Incluye un comentario explicando cada parte del query.
```

**Prompt para diagnóstico de incidente:**
```
Tenemos esta alerta de Azure Monitor:
[PEGAR ALERTA COMPLETA AQUÍ]

Dime:
1. ¿Qué está fallando exactamente?
2. ¿Cuál es la causa raíz más probable?
3. ¿Qué impacto tiene en los usuarios?
4. ¿Cuáles son los primeros 3 pasos de diagnóstico?
5. ¿Hay alguna query KQL útil para investigar más?
```

### 🔹 Skill: `kql-generator`

**¿Qué hace?** Genera queries KQL optimizadas para Azure Log Analytics. Copilot lo carga automáticamente cuando detecta que necesitas crear o analizar queries de monitoreo.

**Implementación en `.github/skills/kql-generator/SKILL.md`:**
```markdown
---
name: kql-generator
description: Genera queries KQL para Azure Log Analytics y Azure Monitor. Usar cuando
  se necesite crear, analizar o depurar queries de monitoreo, diagnóstico o seguridad en Azure.
---

Reglas obligatorias al generar KQL:
1. Filtro de tiempo: siempre incluir (por defecto | where TimeGenerated > ago(24h))
2. Proyección selectiva: usar | project con solo campos relevantes
3. Límite de seguridad: terminar con | take 1000 por defecto
4. Comentarios: agregar // explicando cada sección importante
5. Deduplicación: si involucra seguridad, agregar | distinct

Formato: primero el query completo, luego explicación breve de cada sección.
```

### 🔸 Agente: `incident-responder`

**Tipo:** Custom Agent — perfil de IA seleccionable por el usuario

**Cuándo usarlo:**
- Cuando recibes una alerta de Azure Monitor y necesitas un runbook de respuesta
- Se puede asignar a issues de tipo "incident" para que genere el runbook automáticamente
- Genera queries KQL de diagnóstico, comandos Azure CLI y pasos de escalamiento

**Implementación `.github/agents/incident-responder.agent.md`:**
```markdown
---
name: incident-responder
description: Especialista en respuesta a incidentes de infraestructura Azure. Genera
  runbooks de diagnóstico, sugiere queries KQL para investigación, y estructura la
  respuesta al incidente con pasos claros.
---

Eres un especialista en respuesta a incidentes para infraestructura Azure.

## Proceso de respuesta
1. Triage: evalúa severidad (P1-P4), identifica recurso afectado e impacto
2. Diagnóstico: genera comandos Azure CLI y queries KQL para investigar
3. Runbook: estructura pasos verificables con criterios de éxito claros

## Formato de respuesta
# Incidente: [nombre]
**Severidad:** [P1/P2/P3/P4]
**Recurso afectado:** [nombre y tipo]
## Pasos de diagnóstico
[comandos y queries listos para copiar]
## Escalamiento
- L1: Equipo de guardia | L2: Lead infra | L3: Arquitecto
## Criterio de resolución
[cómo verificar que está resuelto]
```

> 📚 **Referencia oficial:** [Azure Monitor Documentation](https://learn.microsoft.com/en-us/azure/azure-monitor/) | [KQL Quick Reference](https://learn.microsoft.com/en-us/azure/data-explorer/kql-quick-reference)

---

## 📦 Módulo 4 — IaC con Terraform + Bicep + Copilot

**Duración:** 90 min | **Foco:** Generar, revisar y asegurar infraestructura Azure con IA

### Agenda

| Tiempo | Actividad |
|---|---|
| 0–20 min | Teoría: Terraform vs Bicep — cuándo usar cada uno en Azure |
| 20–50 min | Demo: Generar módulo Terraform para AKS desde lenguaje natural |
| 50–70 min | Demo: Revisar y mejorar templates Bicep con Copilot |
| 70–80 min | Skill `iac-reviewer` + Agente `iac-security-reviewer` |
| 80–90 min | Preguntas y discusión |

### Contenido Teórico

#### Terraform vs Bicep — ¿Cuándo usar cada uno?

| | **Terraform** | **Bicep** |
|---|---|---|
| **Ideal para** | Multi-cloud, módulos reutilizables | Azure-only, integración nativa con ARM |
| **Lenguaje** | HCL (HashiCorp Configuration Language) | DSL de Microsoft para Azure Resource Manager |
| **State** | Archivo `terraform.tfstate` (requiere backend remoto) | No tiene state, usa ARM directamente |
| **CI/CD** | `terraform plan` + `terraform apply` | `az deployment group create` |

> 📚 **Referencia oficial Terraform:** [AzureRM Provider](https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs)
> 📚 **Referencia oficial Bicep:** [Bicep Documentation](https://learn.microsoft.com/en-us/azure/azure-resource-manager/bicep/)

### Demo en Vivo

**Prompt para generar módulo Terraform:**
```
Crea un módulo Terraform para desplegar un Azure Kubernetes Service (AKS) con:
- Node pool: Standard_D4s_v3, mínimo 2 nodos, máximo 5 (autoscaling habilitado)
- Networking: Azure CNI, VNet y subnet existentes como variables de input
- Identity: Managed Identity (no service principal)
- Addons: Azure Monitor y Azure Policy habilitados
- Tags obligatorios: environment, team, cost-center como variables requeridas
- Validaciones: location solo permite "eastus" y "westeurope"
- Outputs: kubeconfig, cluster_id, node_resource_group

Incluye mejores prácticas de seguridad de Azure y comenta cada bloque explicando su propósito.
```

**Prompt para Bicep:**
```
Crea un template Bicep para desplegar un Azure Container Apps Environment con:
- Log Analytics workspace integrado
- VNet integration
- Parámetros con @description() y @allowed() donde corresponda
- Naming siguiendo Azure conventions
- Tags como objeto de parámetro
```

### 🔹 Skill: `iac-reviewer`

**¿Qué hace?** Revisa código Terraform o Bicep para Azure siguiendo un checklist de seguridad, costo, naming y mejores prácticas. Copilot lo carga automáticamente cuando trabajas con archivos de infraestructura.

**Implementación en `.github/skills/iac-reviewer/SKILL.md`:**
```markdown
---
name: iac-reviewer
description: Revisa código Terraform o Bicep para Azure identificando problemas de
  seguridad, costo, naming y mejores prácticas. Usar cuando se revise, genere o
  modifique infraestructura como código (.tf, .bicep, ARM templates).
---

Cuando revises código Terraform o Bicep para Azure, analiza en este orden:
1. SEGURIDAD: storage accounts públicos, NSGs permisivas, secrets hardcodeados,
   managed identity vs service principal, cifrado en reposo
2. COSTO: recursos sobredimensionados, falta de autoscaling, sin política de retención
3. NAMING: incumplimiento de Azure naming conventions y prefijos de tipo de recurso
4. MEJORES PRÁCTICAS: tags obligatorios, versiones de provider pinneadas, backend remoto

Formato: | Problema | Severidad (Alta/Media/Baja) | Línea aprox. | Fix sugerido |
```

### 🔸 Agente: `iac-security-reviewer`

**Tipo:** Custom Agent — perfil de IA seleccionable por el usuario

**Cuándo usarlo:**
- Al revisar PRs con cambios en archivos `.tf` o `.bicep`
- Es read-only: audita pero no modifica código (`tools: ["read", "search"]`)
- Complementa al workflow `iac-security-gate.yml` que ejecuta Checkov automáticamente

**Implementación `.github/agents/iac-security-reviewer.agent.md`:**
```markdown
---
name: iac-security-reviewer
description: Especialista en seguridad de infraestructura como código. Revisa archivos
  Terraform y Bicep para Azure identificando vulnerabilidades, configuraciones
  inseguras y desviaciones de mejores prácticas.
tools: ["read", "search"]
---

Eres un especialista en seguridad de IaC para Azure. Audita archivos Terraform y Bicep:

## Checklist de seguridad
- Managed Identity en lugar de service principals con secretos
- NSGs restrictivas (no 0.0.0.0/0 en inbound)
- Storage accounts sin acceso público
- Cifrado en reposo habilitado
- Tags obligatorios: environment, team, cost-center
- Provider versions pinneadas
- Backend remoto configurado

## Formato de respuesta
### Resultado: [PASS / PASS CON OBSERVACIONES / FAIL]
### Hallazgos críticos (bloquean merge)
| # | Problema | Archivo:Línea | Fix requerido |
### Advertencias (no bloquean)
| # | Problema | Archivo:Línea | Recomendación |
```

**Workflow complementario `.github/workflows/iac-security-gate.yml`:**

El workflow de GitHub Actions se mantiene para ejecutar Checkov automáticamente en cada PR con cambios IaC:

```yaml
name: IaC Security Gate

on:
  pull_request:
    paths:
      - '**/*.tf'
      - '**/*.bicep'

jobs:
  security-scan:
    runs-on: ubuntu-latest
    permissions:
      pull-requests: write
      contents: read

    steps:
      - uses: actions/checkout@v4

      - name: Run Checkov IaC Security Scanner
        uses: bridgecrewio/checkov-action@master
        with:
          directory: .
          framework: terraform,bicep,arm
          output_format: json
          soft_fail: true

      - name: Terraform Format Check
        if: always()
        run: terraform fmt -check -recursive . 2>/dev/null || true
```

> 📚 **Referencia oficial:** [Terraform Azure Provider](https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs) | [Microsoft Learn - Terraform on Azure](https://learn.microsoft.com/en-us/azure/developer/terraform/)

---

## 📦 Módulo 5 — DevSecOps con GitHub Advanced Security + Copilot

**Duración:** 90 min | **Foco:** Entender, priorizar y resolver vulnerabilidades con IA

### Agenda

| Tiempo | Actividad |
|---|---|
| 0–20 min | Teoría: GitHub Advanced Security — Code Scanning, Secret Scanning, Dependabot |
| 20–50 min | Demo: Resolver alerts de Dependabot y Code Scanning con Copilot |
| 50–70 min | Demo: Hardening de GitHub Actions workflows |
| 70–80 min | Repaso de agentes `pr-reviewer` + `iac-security-reviewer` en contexto de seguridad |
| 80–90 min | Preguntas y cierre del curso |

### Contenido Teórico

#### Las 3 capas de GitHub Advanced Security

| Herramienta | Qué detecta | Cómo usarla con IA |
|---|---|---|
| **Code Scanning (CodeQL)** | Vulnerabilidades en el código fuente | Copilot explica el CVE y genera el fix |
| **Secret Scanning** | API keys, tokens y passwords expuestos | Copilot guía el proceso de rotación |
| **Dependabot** | Vulnerabilidades en dependencias (npm, pip, etc.) | Copilot evalúa si el CVE aplica a tu uso |

> 📚 **Referencia oficial:** [GitHub Advanced Security](https://docs.github.com/en/get-started/learning-about-github/about-github-advanced-security)

### Demo en Vivo

**Prompt para evaluar un CVE de Dependabot:**
```
Dependabot detectó esta vulnerabilidad en nuestra dependencia:
[PEGAR ALERTA DE DEPENDABOT]

Necesito saber:
1. ¿Esta vulnerabilidad aplica a cómo usamos esta librería en nuestro proyecto?
2. ¿Qué tan urgente es parchearla? (contexto: app interna, sin datos de usuarios externos)
3. ¿Cuál es el upgrade path? ¿Hay breaking changes en la nueva versión?
4. ¿Hay algún workaround temporal mientras probamos el upgrade?
```

**Prompt para hardening de GitHub Actions:**
```
Revisa este workflow de GitHub Actions desde una perspectiva de seguridad:
[PEGAR WORKFLOW AQUÍ]

Verifica:
1. ¿Los permisos del GITHUB_TOKEN son mínimos necesarios?
2. ¿Las actions de terceros están pinneadas a un commit SHA?
3. ¿Hay riesgo de script injection en los inputs?
4. ¿Los secrets se usan correctamente?

Genera la versión hardened del workflow con todos los fixes aplicados.
```

### Ejemplo de Workflow Seguro (Buenas Prácticas)

```yaml
name: Secure CI Pipeline

on:
  push:
    branches: [main]

# Permisos mínimos a nivel de workflow
permissions:
  contents: read

jobs:
  security-checks:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      security-events: write   # Solo para subir resultados de code scanning

    steps:
      # Actions pinneadas a SHA exacto (no a tags mutables como v4)
      - uses: actions/checkout@11bd71901bbe5b1630ceea73d27597364c9af683 # v4.2.2

      - name: Initialize CodeQL
        uses: github/codeql-action/init@ff0a06e83cb2de871e5a09832bc6a81e7276941f # v3
        with:
          languages: javascript, typescript

      - name: Run CodeQL Analysis
        uses: github/codeql-action/analyze@ff0a06e83cb2de871e5a09832bc6a81e7276941f # v3

      - name: SonarCloud Scan
        uses: SonarSource/sonarqube-scan-action@v5
        env:
          SONAR_TOKEN: ${{ secrets.SONAR_TOKEN }}
          # GITHUB_TOKEN es provisto automáticamente por GitHub
```

> 📚 **Referencia oficial:** [Security hardening for GitHub Actions](https://docs.github.com/en/actions/security-for-github-actions/security-guides/security-hardening-for-github-actions)

---

## 🔧 Resumen de Skills y Agentes del Curso

### Agent Skills (`.github/skills/`)

Cada skill vive en su propio directorio con un `SKILL.md`. Copilot los carga automáticamente cuando son relevantes.

| Skill | Directorio | Cuándo se activa |
|---|---|---|
| `actions-debugger` | `.github/skills/actions-debugger/` | Al depurar logs de pipelines fallidos |
| `sonarcloud-fix-helper` | `.github/skills/sonarcloud-fix-helper/` | Al analizar hallazgos de SonarCloud |
| `kql-generator` | `.github/skills/kql-generator/` | Al generar queries KQL para Azure |
| `iac-reviewer` | `.github/skills/iac-reviewer/` | Al revisar código Terraform o Bicep |

> 📚 **Referencia oficial:** [About agent skills](https://docs.github.com/en/copilot/concepts/agents/about-agent-skills) | [Creating agent skills](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/cloud-agent/create-skills)

### Custom Agents (`.github/agents/`)

Perfiles de IA especializados seleccionables por el usuario desde VS Code, GitHub.com o CLI.

| Agente | Archivo | Propósito |
|---|---|---|
| `pr-reviewer` | `.github/agents/pr-reviewer.agent.md` | Code review de PRs (read-only) |
| `pipeline-debugger` | `.github/agents/pipeline-debugger.agent.md` | Diagnóstico de pipelines fallidos |
| `incident-responder` | `.github/agents/incident-responder.agent.md` | Runbooks de respuesta a incidentes Azure |
| `iac-security-reviewer` | `.github/agents/iac-security-reviewer.agent.md` | Auditoría de seguridad de IaC (read-only) |

> 📚 **Referencia oficial:** [About custom agents](https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-custom-agents) | [Creating custom agents](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/cloud-agent/create-custom-agents)

### Contexto universal: `AGENTS.md`

El archivo `AGENTS.md` en la raíz del repositorio contiene el contexto operacional del proyecto (stack, convenciones, comandos de build). Es leído automáticamente por todos los AI tools: GitHub Copilot, Cursor, Windsurf, Codex CLI, etc.

> 📚 **Referencia:** [AGENTS.md Standard](https://agentsmd.online/) — estándar abierto de la Linux Foundation

---

## 🗂️ Estructura del Repositorio de Práctica

```
devops-ai-curso/
├── AGENTS.md                              ← Contexto universal cross-tool
├── .github/
│   ├── skills/                            ← Agent Skills (conocimiento on-demand)
│   │   ├── iac-reviewer/
│   │   │   └── SKILL.md                   ← Módulo 4
│   │   ├── sonarcloud-fix-helper/
│   │   │   └── SKILL.md                   ← Módulo 2
│   │   ├── kql-generator/
│   │   │   └── SKILL.md                   ← Módulo 3
│   │   └── actions-debugger/
│   │       └── SKILL.md                   ← Módulo 1
│   ├── agents/                            ← Custom Agents (personas seleccionables)
│   │   ├── pr-reviewer.agent.md           ← Módulo 2 y 5
│   │   ├── pipeline-debugger.agent.md     ← Módulo 1
│   │   ├── incident-responder.agent.md    ← Módulo 3
│   │   └── iac-security-reviewer.agent.md ← Módulo 4 y 5
│   └── workflows/                         ← Automatización CI/CD
│       ├── ci-pipeline.yml                ← Módulo 1: workflow base de CI
│       ├── sonarcloud-scan.yml            ← Módulo 2: integración SonarCloud
│       └── iac-security-gate.yml          ← Módulo 4: Checkov scan automático
├── terraform/
│   ├── main.tf                            ← Módulo 4: código con issues intencionales
│   ├── variables.tf
│   └── outputs.tf
├── bicep/
│   └── main.bicep                         ← Módulo 4: template Bicep de práctica
├── app/
│   ├── index.js                           ← Módulo 2: código con issues de SonarCloud
│   └── security-issues.js                 ← Módulo 5: código con vulnerabilidades intencionales
├── sonar-project.properties
└── README.md
```

---

## 📐 Estructura de Cada Sesión en Vivo

```
0–20 min    Teoría + Contexto
            ¿Por qué importa esto en DevOps hoy?

20–50 min   Demo en Vivo (instructor)
            Copilot Chat abierto, todo en pantalla compartida
            Errores y ajustes en tiempo real = aprendizaje real

50–70 min   Práctica Guiada (participantes)
            Ejercicio del repositorio de práctica
            El instructor circula y ayuda

70–80 min   Agent Skill + Custom Agent del módulo
            Implementación en vivo en el repo de práctica

80–90 min   Preguntas + Recap
            "¿Qué me llevo hoy para aplicar mañana?"
```

---

## 📅 Calendario Sugerido

| Sesión | Módulo | Semana |
|---|---|---|
| Sesión 1 | CI/CD con GitHub Actions | Semana 1 — Día 1 |
| Sesión 2 | Code Review con Copilot + SonarCloud | Semana 1 — Día 3 |
| Sesión 3 | Monitoreo e Incidentes en Azure | Semana 2 — Día 1 |
| Sesión 4 | IaC con Terraform + Bicep | Semana 2 — Día 3 |
| Sesión 5 | DevSecOps | Semana 3 — Día 1 |

> 💡 Dejar al menos 2 días entre sesiones para que los participantes practiquen por su cuenta.

---

## 📚 Referencias Oficiales

### GitHub Copilot
- [Documentación principal](https://docs.github.com/en/copilot)
- [GitHub Copilot en VS Code — Overview](https://code.visualstudio.com/docs/copilot/overview)
- [Cheat Sheet de comandos](https://code.visualstudio.com/docs/copilot/reference/copilot-vscode-features)
- [Copilot Customization Cheat Sheet](https://docs.github.com/en/copilot/reference/customization-cheat-sheet)
- [Quickstart de GitHub Copilot](https://docs.github.com/copilot/quickstart)

### Agent Skills y Custom Agents
- [About agent skills](https://docs.github.com/en/copilot/concepts/agents/about-agent-skills)
- [Creating agent skills](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/cloud-agent/create-skills)
- [About custom agents](https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-custom-agents)
- [Creating custom agents](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/cloud-agent/create-custom-agents)
- [Custom agents configuration](https://docs.github.com/en/copilot/reference/custom-agents-configuration)

### AGENTS.md (Portabilidad cross-tool)
- [AGENTS.md Standard — Linux Foundation](https://agentsmd.online/)
- [AGENTS.md Specification](https://github.com/agentsmd/agents.md)

### GitHub Actions
- [Documentación oficial](https://docs.github.com/en/actions)
- [Workflow Syntax Reference](https://docs.github.com/actions/using-workflows/workflow-syntax-for-github-actions)
- [Events that trigger workflows](https://docs.github.com/en/actions/writing-workflows/choosing-when-your-workflow-runs/events-that-trigger-workflows)
- [Security hardening for GitHub Actions](https://docs.github.com/en/actions/security-for-github-actions/security-guides/security-hardening-for-github-actions)

### SonarCloud
- [Getting started con GitHub](https://docs.sonarsource.com/sonarqube-cloud/getting-started/github/)
- [GitHub Actions Integration](https://docs.sonarsource.com/sonarqube-cloud/advanced-setup/ci-based-analysis/github-actions-for-sonarcloud/)
- [Configuring GitHub project binding](https://docs.sonarsource.com/sonarqube-cloud/managing-your-projects/administering-your-projects/devops-platform-integration/github/)

### Terraform + Azure
- [AzureRM Provider — Terraform Registry](https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs)
- [Terraform Azure Get Started](https://developer.hashicorp.com/terraform/tutorials/azure-get-started)
- [Terraform on Azure — Microsoft Learn](https://learn.microsoft.com/en-us/azure/developer/terraform/)

### Bicep
- [Bicep Documentation](https://learn.microsoft.com/en-us/azure/azure-resource-manager/bicep/)
- [Bicep Quickstart con VS Code](https://learn.microsoft.com/en-us/azure/azure-resource-manager/bicep/quickstart-create-bicep-use-visual-studio-code)

### Azure Monitor + KQL
- [Azure Monitor Documentation](https://learn.microsoft.com/en-us/azure/azure-monitor/)
- [KQL Quick Reference](https://learn.microsoft.com/en-us/azure/data-explorer/kql-quick-reference)
- [Log Analytics Tutorial](https://learn.microsoft.com/en-us/azure/azure-monitor/logs/log-analytics-tutorial)

### GitHub Advanced Security
- [About GitHub Advanced Security](https://docs.github.com/en/get-started/learning-about-github/about-github-advanced-security)
- [Code scanning with CodeQL](https://docs.github.com/en/code-security/code-scanning/introduction-to-code-scanning/about-code-scanning-with-codeql)
- [Dependabot documentation](https://docs.github.com/en/code-security/dependabot)

---

*Minicurso: IA para DevOps en la Práctica — v2.0 (Agent Skills + Custom Agents)*