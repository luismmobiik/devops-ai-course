# DevOps AI Curso — Agent Instructions

## Project Overview

Repositorio de práctica para el minicurso "IA para DevOps en la Práctica". Contiene código intencionalmente imperfecto para que los participantes practiquen la detección y corrección de problemas usando asistentes de IA.

**Stack:** GitHub · GitHub Actions · Terraform · Bicep · Azure · SonarQube

## Repository Structure

```
├── .github/
│   ├── skills/              # Agent Skills (conocimiento especializado on-demand)
│   ├── agents/              # Custom Agents (perfiles de IA seleccionables)
│   └── workflows/           # GitHub Actions (CI/CD automation)
├── devops-frontend/         # App Angular (con issues de SonarQube intencionales)
├── terraform/               # Módulos Terraform para Azure (con issues intencionales)
├── bicep/                   # Templates Bicep para Azure
└── sonar-project.properties
```

## Conventions

- Responde siempre en español
- Usa Azure como cloud provider exclusivo
- Sigue las Azure naming conventions para recursos de infraestructura
- Tags obligatorios en todo recurso Azure: `environment`, `team`, `cost-center`
- Commits en inglés, siguiendo Conventional Commits (`feat:`, `fix:`, `chore:`, `docs:`)
- PRs requieren al menos un reviewer humano antes del merge

## Build & Test

```bash
# App Angular
cd devops-frontend && npm install && npm test

# Terraform
cd terraform && terraform init && terraform validate && terraform fmt -check

# Bicep
az bicep build --file bicep/main.bicep
```

## Azure Infrastructure

- Provider: `azurerm` (pinned version)
- Authentication: Managed Identity (never service principals with secrets)
- State: Remote backend en Azure Storage Account
- Allowed locations: `eastus`, `westeurope`

## Security Requirements

- No secrets hardcodeados en código ni en workflows
- GitHub Actions: permisos mínimos en `GITHUB_TOKEN`, actions de terceros pinneadas a SHA
- Storage accounts: sin acceso público por defecto
- NSGs: reglas restrictivas, no permitir `0.0.0.0/0` en inbound
- Cifrado en reposo habilitado en todos los recursos que lo soporten
