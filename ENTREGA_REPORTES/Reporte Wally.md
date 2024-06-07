# Proyecto ¿Dónde está Wally? / INTELIGENCIA ARTIFICIAL 

## Introducción

Este proyecto tiene como objetivo utilizar la biblioteca OpenCV para detectar a Wally en imágenes. Incluye los pasos para preparar el dataset, redimensionar y renombrar imágenes, crear variaciones rotadas de las imágenes de Wally y finalmente, detectar a Wally en una imagen usando el clasificador Haar Cascade.

## Preparación del Dataset

### Redimensionar Imágenes

El primer paso es redimensionar todas las imágenes en el dataset para que tengan un tamaño uniforme. A continuación, se presenta el código para redimensionar imágenes a 40x40 píxeles. Primero empezaremos por redimentionar la carpeta de imagenes negativas de wally

```python
import numpy as np
import cv2 as cv
import os

folder_path = 'C:\\Users\\FAS\\Desktop\\alcaraz\\InteligenciaArtificial_20120105\\DATASET_wally\\wally\\p'  # imágenes negativas

def resize_images(folder_path, size=(40, 40)):
    # Verificar si la carpeta existe
    if not os.path.exists(folder_path):
        print(f"La carpeta {folder_path} no existe.")
        return

    for filename in os.listdir(folder_path):
        if filename.endswith(('.png', '.jpg', '.jpeg', '.bmp', '.gif')):
            try:
                img_path = os.path.join(folder_path, filename)
                img = cv.imread(img_path)
                if img is not None:
                    # Redimensionar la imagen
                    img_resized = cv.resize(img, size, interpolation=cv.INTER_AREA)
                    # Sobrescribir la imagen original con la imagen redimensionada
                    cv.imwrite(img_path, img_resized)
                    print(f"Imagen {filename} redimensionada a {size}.")
                else:
                    print(f"No se pudo leer la imagen {filename}.")
            except Exception as e:
                print(f"No se pudo redimensionar la imagen {filename}: {e}")
```
# Llamar a la función para redimensionar imágenes
resize_images(folder_path)

## Renombrar Imágenes

### Para facilitar la organización y procesamiento de las imágenes, es útil renombrarlas de manera consistente. El siguiente código renombra todas las imágenes en una carpeta especificada.
```python
import os
import glob

def renombrar_imagenes(ruta):
    # Verificar si la ruta existe
    if not os.path.exists(ruta):
        print(f"La ruta {ruta} no existe.")
        return

    # Buscar todas las imágenes en la ruta (considerando las extensiones más comunes)
    imagenes = glob.glob(os.path.join(ruta, "*.png")) + \
               glob.glob(os.path.join(ruta, "*.jpg")) + \
               glob.glob(os.path.join(ruta, "*.jpeg")) + \
               glob.glob(os.path.join(ruta, "*.bmp")) + \
               glob.glob(os.path.join(ruta, "*.gif"))

    if not imagenes:
        print(f"No se encontraron imágenes en la ruta {ruta}.")
        return

    # Renombrar cada imagen
    for i, imagen in enumerate(imagenes):
        # Obtener la extensión del archivo
        extension = os.path.splitext(imagen)[1]
        # Crear el nuevo nombre
        nuevo_nombre = f"wally_{i}{extension}"
        # Obtener la ruta completa del nuevo nombre
        nueva_ruta = os.path.join(ruta, nuevo_nombre)
        # Renombrar el archivo
        os.rename(imagen, nueva_ruta)
        print(f"Renombrado: {imagen} -> {nueva_ruta}")

    print("Renombrado completado.")
```
### Forma de usar
ruta_imagenes = "C:\\Users\\FAS\\Desktop\\alcaraz\\InteligenciaArtificial_20120105\\DATASET_wally\\wally\\p"
renombrar_imagenes(ruta_imagenes)

# Rotar Imágenes
### Para aumentar el dataset y mejorar el entrenamiento del clasificador, se pueden crear variaciones rotadas de las imágenes de Wally. El siguiente código rota las imágenes en incrementos de 15 grados y las guarda.

import cv2 as cv
import numpy as np
import os

### Especificar el directorio de salida
output_dir = 'C:\\Users\\FAS\\Desktop\\alcaraz\\InteligenciaArtificial_20120105\\DATASET_wally\\wally'

### Crear el directorio si no existe
if not os.path.exists(output_dir):
    os.makedirs(output_dir)

### Cargar la imagen original
img_path = 'C:\\Users\\FAS\\Desktop\\alcaraz\\InteligenciaArtificial_20120105\\DATASET_wally\\waldo.png'
img = cv.imread(img_path)

if img is None:
    print(f"Error: no se pudo cargar la imagen desde {img_path}")
else:
    print(f"Imagen cargada correctamente desde {img_path}")

### Función para rotar la imagen
```python
def rotate_image(image, angle):
    (h, w) = image.shape[:2]
    center = (w // 2, h // 2)

    # Obtener la matriz de rotación
    M = cv.getRotationMatrix2D(center, angle, 1.0)
    rotated = cv.warpAffine(image, M, (w, h))

    return rotated
```
### Lista de ángulos para rotar la imagen
angles = range(0, 360, 15)  # Rotar cada 15 grados

### Nombre base para los archivos guardados
base_name = 'wally_283_'

### Procesar y guardar las imágenes rotadas
```python
for angle in angles:
    rotated_img = rotate_image(img, angle)
    resized_img = cv.resize(rotated_img, (40, 40), interpolation=cv.INTER_AREA)
    output_path = os.path.join(output_dir, f'{base_name}{angle}.png')
    cv.imwrite(output_path, resized_img)
    print(f'Saved: {output_path}')
    ```

### Mostrar confirmación de finalización
print("Todas las imágenes se han guardado correctamente.")

### Entrenamiento del Clasificador Haar Cascade
El proceso de entrenamiento de un clasificador Haar Cascade no está cubierto en este informe debido a su complejidad y a los recursos requeridos pero se utilizo el software de Cascade Traiger GUI, aproximadamente duro alrededor de 5 horas entrenando las imagenes 
### 4,264 imagenes negativas y 1,105 imagenes positivas

Finalmente con esto se genero el archivo cascade.xml

## Detección de Wally en Imágenes
### El siguiente código utiliza el clasificador Haar Cascade entrenado para detectar a Wally en una imagen.
```python
import numpy as np
import cv2 as cv
```
### Ruta del clasificador entrenado y la imagen de Wally
```python
classifier_path = 'C:\\Users\\FAS\\Desktop\\XML\\cascade.xml'
img_path = 'C:\\Users\\FAS\\Desktop\\alcaraz\\InteligenciaArtificial_20120105\\Pruebas_wally\\waldodos.png'
```
### Cargar el clasificador entrenado
```python
rostro = cv.CascadeClassifier(classifier_path)

if rostro.empty():
    print(f"Error: no se pudo cargar el clasificador desde {classifier_path}")
else:
    print(f"Clasificador cargado correctamente desde {classifier_path}")
```
### Cargar la imagen de Wally
```python
img = cv.imread(img_path)

if img is None:
    print(f"Error: no se pudo cargar la imagen desde {img_path}")
else:
    print(f"Imagen cargada correctamente desde {img_path}")

    # Convertir la imagen a escala de grises
    gray = cv.cvtColor(img, cv.COLOR_BGR2GRAY)

    # Detectar rostros en la imagen
    rostros = rostro.detectMultiScale(gray, 1.02, minNeighbors=15, minSize=(60, 60))

    # Dibujar los contornos alrededor de los rostros detectados
    for (x, y, w, h) in rostros:
        center = (x + w // 2, y + h // 2)
        radius = w // 2
        cv.circle(img, center, radius, (0, 255, 0), 3)

    # Mostrar la imagen con los rostros detectados y los círculos
    cv.imshow('Detección de Wally', img)
    cv.waitKey(0)
    cv.destroyAllWindows()
```
## Imagenes de ejemplo donde se detecta a wally

![Deteccion de wally imagen uno](/Imagenes/wallyuno.png)

![Deteccion de wally imagen dos](/Imagenes/wallydos.png)

*Dalia Esmeralda Garcia Diaz*