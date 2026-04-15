---
name: iac-reviewer
description: Revisa código Terraform o Bicep para Azure identificando problemas de seguridad, costo, naming y mejores prácticas. Usar cuando se revise, genere o modifique infraestructura como código (.tf, .bicep, ARM templates).
---

Cuando revises código Terraform o Bicep para Azure, analiza en este orden y responde en tabla:

## 1. SEGURIDAD

- Storage accounts con acceso público habilitado
- NSGs con reglas permisivas (0.0.0.0/0 en inbound)
- Secrets o credenciales hardcodeados
- Uso de service principal con secreto en lugar de managed identity
- Cifrado en reposo no habilitado
- HTTPS no forzado en app services o storage

## 2. COSTO

- Recursos sobredimensionados para el caso de uso
- Falta de autoscaling donde aplica
- Sin política de retención en logs o storage
- SKUs de producción en ambientes de desarrollo

## 3. NAMING

- Incumplimiento de Azure naming conventions
- Falta de prefijos de tipo de recurso (rg-, st-, vnet-, aks-)
- Nombres no descriptivos o genéricos

## 4. MEJORES PRÁCTICAS

- Tags obligatorios faltantes: `environment`, `team`, `cost-center`
- Versiones de provider sin pin (azurerm sin version constraint)
- Backend remoto no configurado para Terraform state
- Valores hardcodeados que deberían ser variables
- Sin validaciones en variables de input

## Formato de respuesta

| Problema | Severidad (Alta/Media/Baja) | Línea aprox. | Fix sugerido |
|---|---|---|---|
| ... | ... | ... | ... |
