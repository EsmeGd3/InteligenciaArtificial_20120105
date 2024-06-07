# Proyecto Detección de Desastres CNN / INTELIGENCIA ARTIFICIAL 

El proceso de implementación de una red neuronal convolucional (CNN) para la detección de desastres. La red está diseñada para clasificar imágenes en diferentes categorías de desastres, como asalto, incendio, inundación, robo y tornado. El informe abarca la preparación de los datos, la construcción y entrenamiento del modelo, la evaluación del modelo y las predicciones realizadas en nuevas imágenes.

## Preparación de Datos
El primer paso en el proceso es la preparación de los datos. Las imágenes se leen desde un directorio específico y se almacenan en una lista para su posterior procesamiento.


import numpy as np
import os
import re
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report
import keras
import tensorflow as tf
from keras.utils import to_categorical
from keras.models import Sequential, Model
from keras.layers import Input, Dense, Dropout, Flatten, BatchNormalization, SeparableConv2D, MaxPooling2D, Activation, LeakyReLU, Conv2D

dirname = os.path.join(os.getcwd(), 'C:\\Users\\FAS\\Desktop\\alcaraz\\InteligenciaArtificial_20120105\\ProyectoCNN\\categorias')
imgpath = dirname + os.sep 

images = []
directories = []
dircount = []
prevRoot = ''
cant = 0

print("Leyendo imágenes de ", imgpath)

for root, dirnames, filenames in os.walk(imgpath):
    for filename in filenames:
        if re.search("\.(jpg|jpeg|png|bmp|tiff)$", filename):
            cant = cant + 1
            filepath = os.path.join(root, filename)
            image = plt.imread(filepath)
            if len(image.shape) == 3:
                images.append(image)
            print("Leyendo imagen...", cant, end="\r")
            if prevRoot != root:
                print(root, cant)
                prevRoot = root
                directories.append(root)
                dircount.append(cant)
                cant = 0
dircount.append(cant)
dircount = dircount[1:]
dircount[0] = dircount[0] + 1
print('Directorios leídos:', len(directories))
print("Imágenes en cada directorio", dircount)
print('Suma total de imágenes en subdirs:', sum(dircount))

## Creación de Etiquetas

### Se crean etiquetas para las imágenes en función de sus directorios y se almacenan en una lista.

labels = []
indice = 0
for cantidad in dircount:
    for i in range(cantidad):
        labels.append(indice)
    indice = indice + 1
print("Cantidad de etiquetas creadas: ", len(labels))

Incidentes = []
indice = 0
for directorio in directories:
    name = directorio.split(os.sep)
    print(indice, name[len(name) - 1])
    Incidentes.append(name[len(name) - 1])
    indice = indice + 1

## Preparación de Conjuntos de Datos
### Las imágenes y las etiquetas se dividen en conjuntos de entrenamiento y prueba.

y = np.array(labels)
X = np.array(images, dtype=np.uint8)

train_X, test_X, train_Y, test_Y = train_test_split(X, y, test_size=0.2)
print('Training data shape : ', train_X.shape, train_Y.shape)
print('Testing data shape : ', test_X.shape, test_Y.shape)

train_X = train_X.astype('float32')
test_X = test_X.astype('float32')
train_X = train_X / 255.
test_X = test_X / 255.

## Construcción del Modelo
### Se construye un modelo CNN con Keras.

train_Y_one_hot = to_categorical(train_Y)
test_Y_one_hot = to_categorical(test_Y)

INIT_LR = 1e-3
epochs = 20
batch_size = 64

sport_model = Sequential()
sport_model.add(Conv2D(32, kernel_size=(3, 3), activation='linear', padding='same', input_shape=(28, 28, 3)))
sport_model.add(LeakyReLU(alpha=0.1))
sport_model.add(MaxPooling2D((2, 2), padding='same'))
sport_model.add(Dropout(0.5))
sport_model.add(Flatten())
sport_model.add(Dense(32, activation='linear'))
sport_model.add(LeakyReLU(alpha=0.1))
sport_model.add(Dropout(0.5))
sport_model.add(Dense(len(Incidentes), activation='softmax'))

sport_model.compile(loss=keras.losses.categorical_crossentropy, optimizer=tf.keras.optimizers.SGD(learning_rate=INIT_LR, decay=INIT_LR / 100), metrics=['accuracy'])
sport_model.summary()

# Entrenamiento del Modelo
## El modelo se entrena con los datos de entrenamiento.

sport_train = sport_model.fit(train_X, train_Y_one_hot, batch_size=batch_size, epochs=epochs, verbose=1, validation_data=(valid_X, valid_label))

sport_model.save("C:\\Users\\FAS\\Desktop\\alcaraz\\InteligenciaArtificial_20120105\\red.h5")

## Evaluación del Modelo
### Se evalúa el rendimiento del modelo con los datos de prueba.

test_eval = sport_model.evaluate(test_X, test_Y_one_hot, verbose=1)
print('Test loss:', test_eval[0])
print('Test accuracy:', test_eval[1])

accuracy = sport_train.history['accuracy']
val_accuracy = sport_train.history['val_accuracy']
loss = sport_train.history['loss']
val_loss = sport_train.history['val_loss']
epochs = range(len(accuracy))

plt.plot(epochs, accuracy, 'bo', label='Training accuracy')
plt.plot(epochs, val_accuracy, 'b', label='Validation accuracy')
plt.title('Training and validation accuracy')
plt.legend()
plt.figure()
plt.plot(epochs, loss, 'bo', label='Training loss')
plt.plot(epochs, val_loss, 'b', label='Validation loss')
plt.title('Training and validation loss')
plt.legend()
plt.show()

## Predicciones
### Se realizan predicciones con el modelo entrenado en nuevas imágenes.

predicted_classes2 = sport_model.predict(test_X)
predicted_classes = [predicted_sport.tolist().index(max(predicted_sport)) for predicted_sport in predicted_classes2]
predicted_classes = np.array(predicted_classes)

correct = np.where(predicted_classes == test_Y)[0]
print("Found %d correct labels" % len(correct))

for i, correct in enumerate(correct[0:9]):
    plt.subplot(3, 3, i + 1)
    plt.imshow(test_X[correct].reshape(28, 28, 3), cmap='gray', interpolation='none')
    plt.title("{}, {}".format(Incidentes[predicted_classes[correct]], Incidentes[test_Y[correct]]))
    plt.tight_layout()

incorrect = np.where(predicted_classes != test_Y)[0]
print("Found %d incorrect labels" % len(incorrect))

for i, incorrect in enumerate(incorrect[0:9]):
    plt.subplot(3, 3, i + 1)
    plt.imshow(test_X[incorrect].reshape(28, 28, 3), cmap='gray', interpolation='none')
    plt.title("{}, {}".format(Incidentes[predicted_classes[incorrect]], Incidentes[test_Y[incorrect]]))
    plt.tight_layout()

target_names = ["Class {}".format(i) for i in range(len(Incidentes))]
print(classification_report(test_Y, predicted_classes, target_names=target_names))

## Predicción en Nuevas Imágenes
### Se carga el modelo guardado y se hacen predicciones en nuevas imágenes.

import cv2 as cv
from skimage.transform import resize
from keras.models import load_model

sport_model = load_model('C:\\Users\\FAS\\Desktop\\alcaraz\\InteligenciaArtificial_20120105\\red.h5')

images = []
filenames = ['C:\\Users\\FAS\\Desktop\\alcaraz\\InteligenciaArtificial_20120105\\robocnn.png']

for filepath in filenames:
    image = plt.imread(filepath, 0)
    image_resized = resize(image, (28, 28), anti_aliasing=True, clip=False, preserve_range=True)
    images.append(image_resized)

X = np.array(images, dtype=np.uint8)
test_X = X.astype('float32')
test_X = test_X / 255.

predicted_classes = sport_model.predict(test_X)

Incidentes = ['asalto', 'incendio', 'inundacion', 'robo', 'tornado']

for i, img_tagged in enumerate(predicted_classes):
    predicted_index = np.argmax(img_tagged)
    incident_name = Incidentes[predicted_index]
    
    original_image = cv.imread(filenames[i])
    
    if original_image is None:
        print(f"Error al cargar la imagen: {filenames[i]}")
        continue

    cv.putText(original_image, f"Predicción: {incident_name}", (10, 30), cv.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2, cv.LINE_AA)
    cv.imshow('Imagen', original_image)
    
    k = cv.waitKey(0)
    if k == 27:
        break

cv.destroyAllWindows()

##  Imagenes de el funcionamiento de este proyecto 

![Deteccion Inundacion](/Imagenes/inunda.png)

![Deteccion Robo](/Imagenes/robo.png)

![Deteccion Incendio](/Imagenes/incendio.png)

![Deteccion Tornado](/Imagenes/enojo.png)

![Deteccion Tornado](/Imagenes/torna.png)


*Dalia Esmeralda Garcia Diaz*

