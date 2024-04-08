import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
from firebase_admin import storage

cred = credentials.Certificate("D:\OCR\pyTesseract\server\serviceAccountKey.json")
firebase_admin.initialize_app(cred)


db = firestore.client()

# initialize storage

bucket = storage.bucket("gs://ocr-test-3abc0.appspot.com")


def add_data_to_firestore():
    print("DB : ", db)
    data = {"name": "Los Angeles", "state": "CA", "country": "USA"}
    # Add a new doc in collection 'cities' with ID 'LA'
    db.collection("cities").document("LA").set(data)

    return {"message": "Data added successfully"}


# add image to fire base storage
def add_image_to_storage():

    print("Call Method ---------------------------")

    blob = bucket.blob("test01.jpg")

    # Upload the image file
    blob.upload_from_filename("../test_images/image01.jpg")

    # Get the public URL of the uploaded image
    blob.make_public()
    return {"message": "Image added successfully"}
