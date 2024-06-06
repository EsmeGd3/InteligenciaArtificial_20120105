{
 "cells": [
  {
   "cell_type": "code",
   "execution_count": 70,
   "id": "923c5375",
   "metadata": {},
   "outputs": [],
   "source": [
    "import cv2 as cv\n",
    "import numpy as np "
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 71,
   "id": "c687e984",
   "metadata": {},
   "outputs": [],
   "source": [
    "def escala(imx, escala):\n",
    "    width =int(imx.shape[1] * escala / 100)\n",
    "    height =int(imx.shape[0] * escala / 100)\n",
    "    size = (width, height)\n",
    "    im = cv.resize(imx, size, interpolation = cv.INTER_AREA)\n",
    "    return im"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 72,
   "id": "d1f1f9c5",
   "metadata": {},
   "outputs": [],
   "source": [
    "img = cv.imread('C:\\\\Users\\\\Mermelada\\\\Imagenes\\\\gato.jpg',1)\n",
    "r,g,b=cv.split(img)\n",
    "img2 = escala(img, 200)\n",
    "cv.imshow('r', r) \n",
    "cv.imshow('g', g) \n",
    "cv.imshow('b', b) \n",
    "cv.waitKey(0)\n",
    "cv.destroyAllWindows()\n"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": null,
   "id": "a00a89f7",
   "metadata": {},
   "outputs": [],
   "source": [
    "img = cv.imread('C:\\\\Users\\\\Mermelada\\\\Imagenes\\\\gato.jpg',1)\n",
    "w,h = img.shape[:2]\n",
    "r,g,b = cv.split(img)\n",
    "img2 = np.zeros((w, h), dtype='uint8')\n",
    "r = cv.merge([r, img2, img2])\n",
    "g = cv.merge([img2, g,  img2])\n",
    "b = cv.merge([img2, img2, b])\n",
    "cv.imshow('r', r)\n",
    "cv.imshow('g', g)\n",
    "cv.imshow('b', b)\n",
    "img2 = escala(img, 200)\n",
    "cv.imshow('Original', img)\n",
    "cv.waitKey(0)\n",
    "cv.destroyAllWindows()"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": null,
   "id": "24dd93fe",
   "metadata": {},
   "outputs": [],
   "source": [
    "pwd"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": null,
   "id": "ef352454",
   "metadata": {},
   "outputs": [],
   "source": []
  },
  {
   "cell_type": "code",
   "execution_count": null,
   "id": "f903c6a5",
   "metadata": {},
   "outputs": [],
   "source": []
  }
 ],
 "metadata": {
  "kernelspec": {
   "display_name": "Python 3 (ipykernel)",
   "language": "python",
   "name": "python3"
  },
  "language_info": {
   "codemirror_mode": {
    "name": "ipython",
    "version": 3
   },
   "file_extension": ".py",
   "mimetype": "text/x-python",
   "name": "python",
   "nbconvert_exporter": "python",
   "pygments_lexer": "ipython3",
   "version": "3.11.5"
  }
 },
 "nbformat": 4,
 "nbformat_minor": 5
}
