import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
from firebase_admin import storage
from google.api_core.exceptions import DeadlineExceeded
import time


cred = credentials.Certificate(r"D:\OCR\pyTesseract\server\serviceAccountKey.json")
firebase_admin.initialize_app(cred)


db = firestore.client()

# initialize storage

bucket = storage.bucket("ocr-test-3abc0.appspot.com")


def add_data_to_firestore():
    print("DB : ", db)
    data = {"name": "Los Angeles", "state": "CA", "country": "USA"}

    # Add data to firestore
    db.collection("cities").add(data)

    print("Added Sucesss ---------------------------------------------- ")

    return {"message": "Data added successfully"}


# add image to fire base storage
async def add_image_to_storage(filename, filePath):

    print("Call Method ---------------------------")

    blob = bucket.blob(filename)
    print("Blob : ", blob)

    # Upload the image file
    blob.upload_from_filename(r"./" + filePath)

    # Get the public URL of the uploaded image
    blob.make_public()

    print("URL : ", blob.public_url)

    print("Added Sucesss ---------------------------------------------- ")
    return blob.public_url


# Create method for download image from storage
async def download_image_from_storage(filename):
    blob = bucket.blob(filename)

    # Download the image
    blob.download_to_filename(r"./downloads/" + filename)

    print("Downloaded Sucesss ---------------------------------------------- ")
    return {"message": "Image downloaded successfully"}


def add_data_to_firestore_with_retry():
    retries = 3
    for attempt in range(retries):
        try:
            data = {"name": "Los Ans", "state": "C", "country": "USoA"}
            db.collection("cities").add(data)
            print("Added Successfully")
            return {"message": "Data added successfully"}
        except DeadlineExceeded as e:
            print(f"Attempt {attempt + 1} failed with DeadlineExceeded error: {e}")
            if attempt < retries - 1:
                # Wait for a short duration before retrying
                time.sleep(1)
            else:
                # Max retries reached, raise the error
                raise e


# add_data_to_firestore_with_retry()

# add_data_to_firestore()

# add_image_to_storage()

# download_image_from_storage()
