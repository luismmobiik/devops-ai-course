---
name: iac-reviewer
description: Revisa código Terraform o Bicep para Azure identificando problemas de seguridad, costo, naming y mejores prácticas. Usar cuando se revise o modifique archivos .tf o .bicep.
---

Cuando revises código Terraform o Bicep para Azure, analiza en este orden:

## 1. Seguridad

- Storage accounts con acceso público
- NSGs con reglas permisivas (0.0.0.0/0 inbound)
- Secrets hardcodeados
- Service principals con secreto en lugar de managed identity
- Cifrado en reposo no habilitado
- HTTPS no forzado

## 2. Costo

- Recursos sobredimensionados
- Falta de autoscaling
- Sin política de retención
- SKUs de producción en ambientes de desarrollo

## 3. Naming y mejores prácticas

- Incumplimiento de Azure naming conventions (prefijos: rg-, st-, vnet-, aks-)
- Tags obligatorios faltantes: `environment`, `team`, `cost-center`
- Provider sin version constraint
- Backend remoto no configurado
- Valores hardcodeados que deberían ser variables

## Formato

| Problema | Severidad | Línea aprox. | Fix sugerido |
|---|---|---|---|
