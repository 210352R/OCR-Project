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


# Check Image Quality --------------------------------
def check_image_quality(image_path):
    # Load the image
    img = cv2.imread(r"./uploads/" + image_path)

    # Check resolution
    height, width = img.shape[:2]
    # print height, width
    print("Image resolution: {} x {}".format(height, width))

    min_resolution = (1000, 1000)  # Set a minimum resolution threshold
    if height < min_resolution[0] or width < min_resolution[1]:
        print("Image resolution is too low for OCR")
        return False
    else:
        return True


# Scan Iamge And Get Text --------------------------------
async def Scan_image(img_path):
    image = Image.open(r"./uploads/" + img_path)
    text = pt.image_to_string(image, config="--oem 3 --psm 6")

    print(text)
    # show_image(img_path)

    return text


async def scan_image_with_processing(img_path):
    img = cv2.imread(r"./uploads/" + img_path)
    if img is not None:
        # Center the image
        img = cv2.copyMakeBorder(img, 50, 50, 50, 50, cv2.BORDER_CONSTANT, value=[255])

        # Up-sample (optional)
        img = cv2.resize(img, (0, 0), fx=2, fy=2)

        # Convert to gray-scale
        gry = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

        # Apply thresholding to create a binary image
        _, binary_img = cv2.threshold(
            gry, 0, 255, cv2.THRESH_BINARY_INV + cv2.THRESH_OTSU
        )

        # OCR
        txt = pt.image_to_string(gry, config="--psm 6")

        print(txt)

        return txt
    else:
        print("Failed to load the image.")
        return "Failed to load the image."
