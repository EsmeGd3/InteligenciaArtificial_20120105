# REPORTE PROYECTO EMOCIONES / INTELIGENCIA ARTIFICIAL 

## Código de Captura y Almacenamiento de Imágenes Faciales

Utilizando la librería OpenCV para capturar imágenes faciales desde una cámara en tiempo real, detectarlas, redimensionarlas y almacenarlas en un directorio específico.

### 1. Importación de Librerías y Configuración del Clasificador de Rostros

import numpy as np
import cv2 as cv
import math

rostro = cv.CascadeClassifier('C:\\Users\\FAS\\Desktop\\alcaraz\\InteligenciaArtificial_20120105\\XML\\haarcascade_frontalface_alt.xml')

### Se importan numpy para operaciones numéricas, cv2 para operaciones de visión por computadora y math para operaciones matemáticas. Despues se carga un clasificador en cascada para la detección de rostros, utilizando el archivo XML haarcascade_frontalface_alt.xml.

### 2. Configuración de la Captura de Video

cap = cv.VideoCapture(0)
i = 0

### Se inicializa la captura de video desde la cámara (índice 0) y se define un contador i para nombrar las imágenes guardadas de forma única.

### 3. Captura y Procesamiento de Fotogramas

while True:
    ret, frame = cap.read()
    gray = cv.cvtColor(frame, cv.COLOR_BGR2GRAY)
    rostros = rostro.detectMultiScale(gray, 1.3, 5)
    for(x, y, w, h) in rostros:
        frame2 = frame[y:y+h, x:x+w]
        frame2 = cv.resize(frame2, (100, 100), interpolation = cv.INTER_AREA)
        cv.imshow('rostros encontrados', frame2)
        cv.imwrite('C:\\Users\\FAS\\Desktop\\alcaraz\\InteligenciaArtificial_20120105\\ProyectoEmociones\\neutral\\neutral'+str(i)+'neutral.png', frame2)

### En cada iteración del bucle, se captura un fotograma de la cámara. El fotograma se convierte a escala de grises para facilitar la detección de rostros y en seguida se detectan rostros en la imagen usando el clasificador en cascada, con parámetros de escala y vecinos.

### 4. Procesamiento y Almacenamiento de Rostros Detectados

Para cada rostro detectado, se recorta el área del rostro y se redimensiona a 100x100 píxeles. Se muestra cada rostro detectado y redimensionado en una ventana y se guarda cada rostro detectado en el directorio especificado con un nombre único basado en el contador i.

### 5. Control de Bucle y Liberación de Recursos

 i = i + 1
    k = cv.waitKey(1)
    if k == 27:
        break
cap.release()
cv.destroyAllWindows()
### Se incrementa el contador i después de procesar cada fotograma. El bucle se interrumpe y se libera la captura de video y se cierran todas las ventanas de OpenCV.

## Código de Reconocimiento Facial y de Emociones


Este reporte detalla las funcionalidades principales, el cual utiliza la librería OpenCV para realizar reconocimiento facial y de emociones en tiempo real. El código carga un modelo de reconocimiento de emociones, captura video en vivo, detecta rostros y predice las emociones asociadas a estos rostros.

## Funcionalidades Principales

### 1. Configuración y Carga del Modelo

import cv2 as cv
import os

faceRecognizer = cv.face.LBPHFaceRecognizer_create()
faceRecognizer.read('C:\\Users\\FAS\\Desktop\\alcaraz\\InteligenciaArtificial_20120105\\XML\\esmemociones.xml')

### En esta parte se importan las librerías como el cv2 para operaciones de visión por computadora y os para interactuar con el sistema de archivos.
### Despues se crea un objeto faceRecognizer usando el algoritmo LBPH (Local Binary Patterns Histograms) y se carga un modelo previamente entrenado desde un archivo XML.

### 2. Preparación del Dataset y Captura de Video

dataSet = 'C:\\Users\\FAS\\Desktop\\alcaraz\\InteligenciaArtificial_20120105\\ProyectoEmociones'
faces  = os.listdir(dataSet)
cap = cv.VideoCapture(0)
rostro = cv.CascadeClassifier('C:\\Users\\FAS\\Desktop\\alcaraz\\InteligenciaArtificial_20120105\\XML\\haarcascade_frontalface_alt.xml')

### Se define la ruta al dataset que contiene las imágenes de las caras y se listan los archivos dentro de este directorio. Despues se inicializa la captura de video desde la cámara (índice 0).
### Se carga un clasificador en cascada para la detección de rostros, utilizando el archivo XML haarcascade_frontalface_alt.xml.

[MI DATASET DE EMOCIONES](/Imagenes/dataemo.png)

### 3. Procesamiento de Video y Detección de Rostros

while True:
    ret, frame = cap.read()
    if ret == False: break
    gray = cv.cvtColor(frame, cv.COLOR_BGR2GRAY)
    cpGray = gray.copy()
    rostros = rostro.detectMultiScale(gray, 1.3, 3)
    for(x, y, w, h) in rostros:
        frame2 = cpGray[y:y+h, x:x+w]
        frame2 = cv.resize(frame2,  (100,100), interpolation=cv.INTER_CUBIC)

### En esta parte se hace la captura de Fotogramas, en cada iteración del bucle, se captura un fotograma de la cámara. Se hace la conversión a escala de Grises: El fotograma se convierte a escala de grises para facilitar el procesamiento.
### En la detección de Rostros se detectan rostros en la imagen usando el clasificador en cascada, con parámetros de escala y vecinos.

### 4. Reconocimiento de Emociones

result = faceRecognizer.predict(frame2)
cv.putText(frame, '{}'.format(result), (x, y-20), 1, 3.3, (255, 255, 0), 1, cv.LINE_AA)
if result[1] < 100:
    cv.putText(frame, '{}'.format(faces[result[0]]), (x, y-25), 2, 1.1, (0, 255, 0), 1, cv.LINE_AA)
    cv.rectangle(frame, (x, y), (x+w, y+h), (0, 255, 0), 2)
else:
    cv.putText(frame, 'Desconocido', (x, y-20), 2, 0.8, (0, 0, 255), 1, cv.LINE_AA)
    cv.rectangle(frame, (x, y), (x+w, y+h), (0, 0, 255), 2)

### La parte de prediccion, el sub-bloque de la imagen (rostro detectado) se redimensiona y se utiliza para predecir la emoción utilizando el modelo LBPH. Si la confianza de la predicción es alta (valor menor a 100), se muestra el nombre correspondiente a la emoción detectada, en dado caso si la confianza es baja, se etiqueta como "Desconocido".
### Despues se dibujan rectángulos y etiquetas sobre los rostros detectados en el fotograma.

### 5. Visualización en Tiempo Real y Terminación

cv.imshow('frame', frame)
k = cv.waitKey(1)
if k == 27:
    break
cap.release()
cv.destroyAllWindows()

### Por ultimo mostramos los Fotogramas procesadolos en una ventana.
### El bucle se interrumpe si se presiona la tecla ESC y se libera la captura de video y se cierran todas las ventanas de OpenCV.

## Imagenes de algunos ejemplos del dataset de como se muestra funcionando este proyecto 

![Emocion Felicidad](/Imagenes/felix.png)

![Emocion Neutral](/Imagenes/neutral.png)

![Emocion Enojo](/Imagenes/enojo.png)