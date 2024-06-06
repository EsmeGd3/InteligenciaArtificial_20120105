{
 "cells": [
  {
   "cell_type": "code",
   "execution_count": null,
   "id": "175096c1",
   "metadata": {},
   "outputs": [],
   "source": [
    "import cv2 as cv \n",
    "img = cv.imread('C:\\\\Users\\\\Mermelada\\\\Imagenes\\\\gato.jpg',1)\n",
    "img2 = cv.cvtColor(img, cv.COLOR_BGR2HSV)\n",
    "#mascara negro\n",
    "ubb = (0,60,60)\n",
    "uba =(10, 255,255)\n",
    "#mascara blanco\n",
    "ubb1 = (0,170,20)\n",
    "uba1 =(30, 255,255)\n",
    "#marcara morado\n",
    "ubb2 = (338,94,75)\n",
    "uba2 =(340, 255,255)\n",
    "#mascara rosa\n",
    "ubb3 = (170,60,60)\n",
    "uba3 =(180, 255,255)\n",
    "\n",
    "mask1 = cv.inRange(img2, ubb, uba)\n",
    "mask2 = cv.inRange(img2, ubb1, uba1)\n",
    "mask3 = cv.inRange(img2, ubb2, uba2)\n",
    "mask4 = cv.inRange(img2, ubb3, uba3)\n",
    "\n",
    "mask5 = mask1 + mask2 +mask3 +mask4\n",
    "img3 = cv.bitwise_and(img,img, mask=mask5)\n",
    "cv.imshow('img2', img2)\n",
    "cv.imshow('img', img)\n",
    "cv.imshow('img3', img3)\n",
    "cv.imshow('mask3', mask3)\n",
    "cv.imshow('mask2', mask2)\n",
    "cv.imshow('mask1', mask1)\n",
    "cv.imshow('mask4', mask4)\n",
    "cv.imshow('mask5', mask5)\n",
    "cv.waitKey(0)\n",
    "cv.destroyAllWindows()"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": null,
   "id": "75dae416",
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
