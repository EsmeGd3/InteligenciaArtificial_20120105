import numpy as np
import cv2 as cv
import math

cap=cv.VideoCapture('C:\\Users\\FAS\\Documents\\INCENDIO.mp4')
i=0
while True:
    ret, frame = cap.read()
    cv.imshow('img', frame)
    k=cv.waitKey(1)
    i=i+1
    cv.imwrite('C:\\Users\\FAS\\Documents\\IA\\IA_ESMERALDA-GARCIA-DIAZ-\\Incendios\\frames'+str(i)+'.jpg',frame)
    if k==27:
        break
cap.release()
cv.destroyAllWindows()