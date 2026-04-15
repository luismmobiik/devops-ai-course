---
name: kql-generator
description: Genera queries KQL para Azure Log Analytics y Azure Monitor. Usar cuando se necesite crear, analizar o depurar queries de monitoreo, diagnóstico o seguridad en Azure.
---

Cuando generes queries KQL para Azure Log Analytics, sigue estas reglas:

## Reglas obligatorias

1. **Filtro de tiempo**: incluye siempre un filtro de tiempo explícito. Si no se especifica, usa `| where TimeGenerated > ago(24h)`
2. **Proyección selectiva**: proyecta solo los campos relevantes con `| project`. Nunca hagas el equivalente a `SELECT *`
3. **Límite de seguridad**: termina siempre con `| take 1000` como límite por defecto para evitar consultas costosas
4. **Comentarios**: agrega comentarios con `//` explicando cada sección importante del query
5. **Deduplicación en seguridad**: si la query involucra análisis de seguridad, agrega `| distinct` para eliminar duplicados

## Tablas comunes de referencia

- `AzureActivity` — operaciones de Azure Resource Manager
- `AzureDiagnostics` — logs de diagnóstico de recursos Azure
- `AzureMetrics` — métricas de recursos Azure
- `Heartbeat` — estado de agentes y VMs monitoreadas
- `Perf` — contadores de rendimiento
- `SecurityEvent` — eventos de seguridad de Windows
- `Syslog` — logs de sistema Linux
- `ContainerLog` — logs de contenedores en AKS

## Formato de respuesta

1. Primero el query completo, listo para copiar y pegar en Log Analytics
2. Después una explicación breve de qué hace cada sección
3. Si aplica, sugerencias de cómo convertir el query en una alerta de Azure Monitor
