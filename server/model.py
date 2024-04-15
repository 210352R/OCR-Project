import os  # To import test image files
import cv2  # To work with opencv images
from PIL import Image  # Image submodule to work with pillow images
import pytesseract as pt  # pytesseract module


# def show_image(img_path, size=(800, 800)):
#     image = cv2.imread(img_path)
#     image = cv2.resize(image, size)

#     cv2.imshow("IMAGE", image)
#     cv2.waitKey(0)
#     cv2.destroyAllWindows()


async def Scan_image(img_path):
    image = Image.open(r"./uploads/" + img_path)
    text = pt.image_to_string(image, config="--oem 3 --psm 6")

    print(text)
    # show_image(img_path)

    return text
