import cv2 as cv
import numpy as np 

def escala(imx, escala):
    width =int(imx.shape[1] * escala / 100)
    height =int(imx.shape[0] * escala / 100)
    size = (width, height)
    im = cv.resize(imx, size, interpolation = cv.INTER_AREA)
    return im

img = cv.imread('C:\\Users\\Mermelada\\Imagenes\\gato.jpg',1)
r,g,b=cv.split(img)
img2 = escala(img, 200)
cv.imshow('r', r) 
cv.imshow('g', g) 
cv.imshow('b', b) 
cv.waitKey(0)
cv.destroyAllWindows()

img = cv.imread('C:\\Users\\Mermelada\\Imagenes\\gato.jpg',1)
w,h = img.shape[:2]
r,g,b = cv.split(img)
img2 = np.zeros((w, h), dtype='uint8')
r = cv.merge([r, img2, img2])
g = cv.merge([img2, g,  img2])
b = cv.merge([img2, img2, b])
cv.imshow('r', r)
cv.imshow('g', g)
cv.imshow('b', b)
img2 = escala(img, 200)
cv.imshow('Original', img)
cv.waitKey(0)
cv.destroyAllWindows()
pwd
'C:\\Users\\Mermelada'