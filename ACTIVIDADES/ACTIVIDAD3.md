import cv2 as cv
import numpy as np 

def escala(imx, escala):
    width =int(imx.shape[1] * escala / 100)
    height =int(imx.shape[0] * escala / 100)
    size = (width, height)
    im = cv.resize(imx, size, interpolation = cv.INTER_AREA)
    return im

 img = cv.imread('C:\\Users\\Mermelada\\Imagenes\\gato.jpg',1)
img2 = np.ones((w, h), dtype='uint8')*150
r,g,b=cv.split(img)
cv.imshow('r', r) 
cv.imshow('g', g) 
cv.imshow('b', b) 
cv.waitKey(0)
cv.destroyAllWindows()


img = cv.imread('C:\\Users\\Mermelada\\Imagenes\\f1.jpg',0)
w, h =img.shape[:2]
img2 = np.ones((w, h), dtype='uint8')*150
for i in range(w):
    for j in range(h):
        img2[int(i*0.5)+100, int(j*0.5)+100] = img[i,j]
cv.imshow('img', img)
cv.imshow('img2', img2)
cv.waitKey(0)
cv.destroyAllWindows()
pwd
'C:\\Users\\Mermelada'