---
name: kql-generator
description: Genera queries KQL para Azure Log Analytics y Azure Monitor. Usar cuando se necesite crear o depurar queries de monitoreo, diagnóstico o seguridad en Azure.
---

Cuando generes queries KQL para Azure Log Analytics:

## Reglas obligatorias

1. Filtro de tiempo explícito (default: `| where TimeGenerated > ago(24h)`)
2. Proyectar solo campos relevantes con `| project` (nunca SELECT *)
3. Limitar resultados con `| take 1000` por defecto
4. Comentarios con `//` en secciones importantes
5. En queries de seguridad, agregar `| distinct` para deduplicar

## Tablas comunes

- `AzureActivity` — operaciones de ARM
- `AzureDiagnostics` — logs de diagnóstico
- `AzureMetrics` — métricas de recursos
- `Heartbeat` — estado de agentes/VMs
- `Perf` — contadores de rendimiento
- `SecurityEvent` — eventos de seguridad Windows
- `Syslog` — logs de sistema Linux
- `ContainerLog` — logs de contenedores AKS

## Formato

1. Query completo listo para copiar en Log Analytics
2. Explicación breve de cada sección
3. Si aplica, cómo convertirlo en alerta de Azure Monitor
