import cv2 as cv 
cap = cv.VideoCapture(0)
while(True):
    ret, img = cap.read()
    r,g,b = cv.split(img)
    img2 = cv.cvtColor(img, cv.COLOR_BGR2HSV)


    if ret == True:
        cv.imshow('video2', img2)
        cv.imshow('video', img)
        cv.imshow('r', r)
        cv.imshow('g', g)
        cv.imshow('b', b)
       
        k =cv.waitKey(20) & 0xFF
        if k == 27 :
            break
    else:
        break
cap.release()
cv.destroyAllWindows()