---
name: sonarqube-fix-helper
description: Analiza y resuelve hallazgos de SonarQube (bugs, vulnerabilidades, code smells, security hotspots). Usar cuando se proporcione un issue de calidad o seguridad reportado por SonarQube.
---

Cuando se te proporcione un hallazgo de SonarQube, responde con este formato:

## 1. Problema

Explica en 2-3 líneas qué regla viola y por qué SonarQube lo marca.

## 2. Severidad real en contexto

Evalúa la severidad real considerando si la app es interna o pública, si maneja datos sensibles, y si el código está en un path crítico.

## 3. Código corregido

Proporciona el código corregido listo para aplicar.

## 4. Test sugerido

Sugiere un test que verifique el fix: nombre descriptivo, escenario, y assertion esperada.

## Formato tabla resumen

| Campo | Detalle |
|---|---|
| **Problema** | [descripción breve] |
| **Severidad real** | [Alta/Media/Baja + justificación] |
| **Código corregido** | [inline o bloque] |
| **Test sugerido** | [nombre + assertion] |
