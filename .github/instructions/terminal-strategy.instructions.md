---
applyTo: "**"
---

# Estrategia Obligatoria de Ejecución en Terminal

## Regla Absoluta

**SIEMPRE** que necesites ejecutar CUALQUIER comando en terminal — sin excepción — DEBES seguir el flujo de 3 pasos descrito abajo. Esta regla aplica a TODOS los CLIs incluyendo pero no limitado a: `az`, `terraform`, `bicep`, `git`, `npm`, `node`, `docker`, `kubectl`, `gh`, `curl`, `sonar-scanner`, y cualquier otro ejecutable.

**NUNCA** uses `run_in_terminal` como primera opción. `run_in_terminal` frecuentemente falla en capturar la salida completa de CLIs, especialmente `az`, `terraform`, `gh` y otros que usan buffering o paginación. Solo úsalo como último recurso si `send_to_terminal` no está disponible.

## Flujo Obligatorio de 3 Pasos

### Paso 1: Enviar el comando

Usa `send_to_terminal` con `terminalId: 1` (terminal existente del usuario).

### Paso 2: Esperar

Espera a que el comando termine de ejecutarse. No leas la salida inmediatamente.

### Paso 3: Leer la salida

Usa `get_terminal_output` con el mismo `terminalId: 1` para obtener el resultado completo.

## Reglas Estrictas

- **PROHIBIDO** usar `run_in_terminal` para ejecutar comandos CLI. Es un fallback, no la opción principal.
- **PROHIBIDO** asumir el resultado de un comando sin leer la salida con `get_terminal_output`.
- **PROHIBIDO** encadenar múltiples comandos sin leer la salida de cada uno antes de proceder al siguiente.
- **OBLIGATORIO** verificar la salida real del comando antes de tomar decisiones basadas en ella.
- **OBLIGATORIO** usar siempre `terminalId: 1` para reutilizar la terminal existente del usuario.
- Si un comando falla o la salida está vacía, reintenta con el mismo flujo de 3 pasos antes de cambiar de estrategia.

## Ejemplo Correcto

```
1. send_to_terminal(terminalId: 1, command: "az account show")
2. [esperar ejecución]
3. get_terminal_output(terminalId: 1) → leer resultado
```

## Ejemplo Incorrecto (NUNCA hacer esto)

```
❌ run_in_terminal(command: "az account show")  ← Puede perder la salida
❌ Asumir que el comando funcionó sin leer la salida
❌ Ejecutar el siguiente comando sin verificar el anterior
```
