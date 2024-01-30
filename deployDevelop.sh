#!/bin/bash

# # Navega al directorio de tu proyecto
# cd C:\Users\César Lugo\Documents\AppScript\API\

# subir los cambios
clasp push

# Crea una nueva versión de desarrollo en Apps Script
clasp version develop

# Obtén el ID de la última versión creada
VERSION_ID=$(clasp versions | tail -1 | awk '{print $1}')

# Ver las versiones
clasp versions

# Despliega la versión especificada a la implementación activa
# Reemplaza 'idImplementación' con el ID de tu implementación
clasp deploy -i AKfycbybmiCUMDGGjaY_zrMT9ZXXmY-rhcjYcOYhZ8dhRmbGEINn1TaUBx0OeVjuOlUlpHPR -V $VERSION_ID

echo "Despliegue completado para la versión $VERSION_ID"


