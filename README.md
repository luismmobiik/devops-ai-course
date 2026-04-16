# DevOps AI Course

Repositorio de practica para el minicurso **"IA para DevOps en la Practica"**.
Contiene codigo intencionalmente imperfecto para que los participantes practiquen la deteccion y correccion de problemas usando asistentes de IA.

## Stack

GitHub · GitHub Actions · Terraform · Bicep · Azure · SonarQube · GitHub Copilot

## Estructura del repositorio

```
├── .github/
│   ├── skills/              # Agent Skills (conocimiento on-demand)
│   ├── agents/              # Custom Agents (perfiles de IA seleccionables)
│   └── workflows/           # GitHub Actions (CI/CD automation)
├── devops-frontend/         # App Angular con issues intencionales
├── terraform/               # Modulos Terraform para Azure
├── bicep/                   # Templates Bicep para Azure
├── sonar-project.properties # Configuracion de SonarQube
└── AGENTS.md                # Contexto universal cross-tool
```

## Setup rapido

```bash
# App Angular
cd devops-frontend && npm install && npm test

# Terraform (modulos futuros)
cd terraform && terraform init && terraform validate

# Bicep (modulos futuros)
az bicep build --file bicep/main.bicep
```

## Modulos del curso

| Modulo | Tema | Skill | Agent |
|--------|------|-------|-------|
| 1 | CI/CD con GitHub Actions | `actions-debugger` | `pipeline-debugger` |
| 2 | Code Review + SonarQube | `sonarqube-fix-helper` | `pr-reviewer` |
| 3 | Monitoreo e Incidentes Azure | `kql-generator` | `incident-responder` |
| 4 | IaC con Terraform + Bicep | `iac-reviewer` | `iac-security-reviewer` |
| 5 | DevSecOps | — | `pr-reviewer` + `iac-security-reviewer` |

## SonarQube

El analisis de calidad se ejecuta contra una instancia self-hosted en `https://sonar.codevialab.com`.
El workflow `sonarqube-scan.yml` se dispara automaticamente en push a `main`/`develop` y en PRs.

### Secrets requeridos en GitHub

- `SONAR_TOKEN` — Token de proyecto generado en SonarQube
- `SONAR_HOST_URL` — `https://sonar.codevialab.com`
