{
 "cells": [
  {
   "cell_type": "code",
   "execution_count": 7,
   "id": "2f26cfed",
   "metadata": {},
   "outputs": [
    {
     "ename": "IndentationError",
     "evalue": "unexpected indent (2883953618.py, line 39)",
     "output_type": "error",
     "traceback": [
      "\u001b[1;36m  Cell \u001b[1;32mIn[7], line 39\u001b[1;36m\u001b[0m\n\u001b[1;33m    k =cv.waitKey(20) & 0xFF\u001b[0m\n\u001b[1;37m    ^\u001b[0m\n\u001b[1;31mIndentationError\u001b[0m\u001b[1;31m:\u001b[0m unexpected indent\n"
     ]
    }
   ],
   "source": [
    "import cv2 as cv \n",
    "cap = cv.VideoCapture(0)\n",
    "while(True):\n",
    "    ret, img = cap.read()\n",
    "    \n",
    "    if ret == True:\n",
    "        img2 = cv.cvtColor(img, cv.COLOR_BGR2HSV)#cambia el formato de color a hsv\n",
    "      \n",
    "        \n",
    "#mascara negro\n",
    "ubb = (0,60,60)\n",
    "uba =(10, 255,255)\n",
    "#mascara blanco\n",
    "ubb1 = (0,170,20)\n",
    "uba1 =(30, 255,255)\n",
    "#marcara morado\n",
    "ubb2 = (338,94,75)\n",
    "uba2 =(340, 255,255)\n",
    "#mascara rosa pendiente\n",
    "ubb3 = (170,60,60)\n",
    "uba3 =(180, 255,255)\n",
    "\n",
    "mask = cv.inRange(img2, ubb, uba)\n",
    "mask2 = cv.inRange(img2, ubb1, uba1)\n",
    "mask3 = cv.inRange(img2, ubb2, uba2)\n",
    "mask4 = cv.inRange(img2, ubb3, uba3)\n",
    "        \n",
    "mask5 = mask1 + mask2 + mask3 + mask4\n",
    "\n",
    "res = cv.bitwise_and(img,img, mask=mask5)\n",
    "\n",
    "cv.imshow('res', res)\n",
    "cv.imshow('mask', mask)\n",
    "cv.imshow('mask2', mask2)\n",
    "cv.imshow('masK3', mask3)\n",
    "cv.imshow('mask4', mask4)\n",
    "cv.imshow('mask', mask)\n",
    "       \n",
    "        k =cv.waitKey(20) & 0xFF\n",
    "        if k == 27 :\n",
    "            break\n",
    "   \n",
    "cap.release()\n",
    "cv.destroyAllWindows()\n"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": null,
   "id": "f89c9a1f",
   "metadata": {},
   "outputs": [],
   "source": []
  },
  {
   "cell_type": "code",
   "execution_count": null,
   "id": "3718602e",
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
