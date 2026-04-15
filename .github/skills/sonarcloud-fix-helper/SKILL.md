---
name: sonarcloud-fix-helper
description: Analiza y resuelve hallazgos de SonarCloud (bugs, vulnerabilidades, code smells, security hotspots). Usar cuando se proporcione un issue de calidad o seguridad reportado por SonarCloud.
---

Cuando se te proporcione un hallazgo de SonarCloud, responde con este formato estructurado:

## 1. Problema

Explica el problema en 2-3 líneas en español. Incluye por qué SonarCloud lo marca y qué regla viola.

## 2. Severidad real en contexto

No repitas la etiqueta de SonarCloud. Evalúa la severidad real considerando:
- ¿Es una app interna o pública?
- ¿Maneja datos sensibles?
- ¿Está en un path crítico de ejecución?

## 3. Código corregido

Proporciona el código corregido listo para aplicar. Incluye un comentario breve explicando qué cambió y por qué.

## 4. Test sugerido

Sugiere cómo escribir el test que verifica que el fix funciona:
- Nombre descriptivo del test
- Escenario que cubre
- Assertion esperada

## Formato tabla resumen

| Campo | Detalle |
|---|---|
| **Problema** | [descripción breve] |
| **Severidad real** | [Alta/Media/Baja + justificación] |
| **Código corregido** | [inline o bloque] |
| **Test sugerido** | [nombre + assertion] |
