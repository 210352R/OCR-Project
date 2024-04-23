from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.responses import JSONResponse
from secrets import token_hex
import firebaseStorage as fs
from model import Scan_image
from model import check_image_quality
from model import scan_image_with_processing
from verify import getOcrText


import pickle

app = FastAPI()


@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.get("/add_data")
async def add_data():
    result = fs.add_image_to_storage()
    return result


@app.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    # Process the file here
    # print(file.filename)

    file_ext = file.filename.split(".").pop()

    if file_ext not in ["jpg", "jpeg", "png"]:
        return JSONResponse(status_code=400, content={"error": "Invalid file type"})

    file_name = "scan_img_" + token_hex(10)

    file_path = f"uploads/{file_name}.{file_ext}"

    with open(file_path, "wb") as f:
        content = await file.read()
        f.write(content)

    load_name = file_name + "." + file_ext

    # URL = await fs.add_image_to_storage(load_name, file_path)

    # result = await fs.download_image_from_storage(load_name)

    checkImage = check_image_quality(load_name)

    if checkImage == False:
        raise HTTPException(status_code=400, detail="Image Quaality is too Low ")
        # return JSONResponse(
        #     status_code=400, content={"error": "Image Quaality is too Low "}
        # )

    # text = await Scan_image(load_name)
    ocr_result = await getOcrText(load_name)

    return {
        "Sucess": True,
        "filename": f"{file.filename} is uploaded successfully",
        # "URL": URL,
        "text": ocr_result[0],
        "date": ocr_result[1],
    }


# # Load the serialized FastText model from the pickle file
# with open(r"./fasttext_model.pkl", "rb") as file:
#     model_deserialized = pickle.load(file)


# # Define a FastAPI endpoint to use the deserialized model
# @app.post("/get_vector")
# def get_vector_api(text: str):
#     # Get vector representation of the input text using the deserialized model
#     vector = model_deserialized.wv[text]
#     return {"vector": vector.tolist()}
