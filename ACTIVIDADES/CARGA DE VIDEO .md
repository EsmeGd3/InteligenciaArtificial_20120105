{
 "cells": [
  {
   "cell_type": "code",
   "execution_count": 1,
   "id": "885ea4c4",
   "metadata": {},
   "outputs": [],
   "source": [
    "import cv2 as cv \n",
    "cap = cv.VideoCapture(0)\n",
    "while(True):\n",
    "    ret, img = cap.read()\n",
    "    r,g,b = cv.split(img)\n",
    "    img2 = cv.cvtColor(img, cv.COLOR_BGR2HSV)\n",
    "\n",
    "\n",
    "    if ret == True:\n",
    "        cv.imshow('video2', img2)\n",
    "        cv.imshow('video', img)\n",
    "        cv.imshow('r', r)\n",
    "        cv.imshow('g', g)\n",
    "        cv.imshow('b', b)\n",
    "       \n",
    "        k =cv.waitKey(20) & 0xFF\n",
    "        if k == 27 :\n",
    "            break\n",
    "    else:\n",
    "        break\n",
    "cap.release()\n",
    "cv.destroyAllWindows()\n"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": null,
   "id": "ea474979",
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
